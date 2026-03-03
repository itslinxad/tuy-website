<?php
/**
 * Tuy Website API - Setup / Installer
 * 
 * Browser-based installer that:
 * 1. Creates all database tables
 * 2. Seeds existing data (forms, ordinances, events, settings)
 * 3. Creates the first admin account
 * 4. Writes database credentials to config.php
 * 
 * Security: Refuses to run if admin_users table already has rows.
 */

// ============================================
// Handle form submission
// ============================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    
    $dbHost = trim($_POST['db_host'] ?? '');
    $dbName = trim($_POST['db_name'] ?? '');
    $dbUser = trim($_POST['db_user'] ?? '');
    $dbPass = $_POST['db_pass'] ?? '';
    $adminName = trim($_POST['admin_name'] ?? '');
    $adminEmail = trim($_POST['admin_email'] ?? '');
    $adminPassword = $_POST['admin_password'] ?? '';
    
    // Validate inputs
    $errors = [];
    if (empty($dbHost)) $errors[] = 'Database host is required';
    if (empty($dbName)) $errors[] = 'Database name is required';
    if (empty($dbUser)) $errors[] = 'Database username is required';
    if (empty($adminName)) $errors[] = 'Admin name is required';
    if (empty($adminEmail)) $errors[] = 'Admin email is required';
    if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format';
    if (strlen($adminPassword) < 8) $errors[] = 'Password must be at least 8 characters';
    
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    
    // Test database connection
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'errors' => ['Database connection failed: ' . $conn->connect_error]]);
        exit;
    }
    $conn->set_charset('utf8mb4');
    
    // Check if already set up
    $tableCheck = $conn->query("SHOW TABLES LIKE 'admin_users'");
    if ($tableCheck && $tableCheck->num_rows > 0) {
        $rowCheck = $conn->query("SELECT COUNT(*) as cnt FROM admin_users");
        $row = $rowCheck->fetch_assoc();
        if ((int)$row['cnt'] > 0) {
            echo json_encode(['success' => false, 'errors' => ['Setup has already been completed. Delete all tables manually in phpMyAdmin if you need to reinstall.']]);
            $conn->close();
            exit;
        }
    }
    
    // ============================================
    // Create tables
    // ============================================
    $tables = [
        "CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `email` VARCHAR(255) UNIQUE NOT NULL,
            `password_hash` VARCHAR(255) NOT NULL,
            `name` VARCHAR(100) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        
        "CREATE TABLE IF NOT EXISTS `gallery_images` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `filename` VARCHAR(255) NOT NULL,
            `original_name` VARCHAR(255) DEFAULT '',
            `category` VARCHAR(50) NOT NULL,
            `caption` VARCHAR(500) DEFAULT '',
            `sort_order` INT DEFAULT 0,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        
        "CREATE TABLE IF NOT EXISTS `downloadable_files` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `type` ENUM('form','ordinance') NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `filename` VARCHAR(255) NOT NULL,
            `original_name` VARCHAR(255) DEFAULT '',
            `category` VARCHAR(100) NOT NULL,
            `description` TEXT,
            `icon` VARCHAR(50) DEFAULT 'fa-file',
            `resolution_no` VARCHAR(50) DEFAULT NULL,
            `ordinance_no` VARCHAR(50) DEFAULT NULL,
            `year` INT DEFAULT NULL,
            `sort_order` INT DEFAULT 0,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        
        "CREATE TABLE IF NOT EXISTS `calendar_events` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `event_date` VARCHAR(5) NOT NULL,
            `icon` VARCHAR(50) DEFAULT 'fa-calendar',
            `color` VARCHAR(30) DEFAULT 'text-blue-500',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        
        "CREATE TABLE IF NOT EXISTS `site_settings` (
            `setting_key` VARCHAR(100) PRIMARY KEY,
            `setting_value` TEXT NOT NULL,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        
        "CREATE TABLE IF NOT EXISTS `map_pins` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `category` ENUM('halls','barangays','offices') NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `lat` DECIMAL(10,7) NOT NULL,
            `lng` DECIMAL(10,7) NOT NULL,
            `address` VARCHAR(500) DEFAULT NULL,
            `description` TEXT DEFAULT NULL,
            `sort_order` INT DEFAULT 0,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
    ];
    
    foreach ($tables as $sql) {
        if (!$conn->query($sql)) {
            echo json_encode(['success' => false, 'errors' => ['Failed to create table: ' . $conn->error]]);
            $conn->close();
            exit;
        }
    }
    
    // ============================================
    // Create admin user
    // ============================================
    $hash = password_hash($adminPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $adminEmail, $hash, $adminName);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'errors' => ['Failed to create admin user: ' . $stmt->error]]);
        $conn->close();
        exit;
    }
    $stmt->close();
    
    // ============================================
    // Seed forms data
    // ============================================
    $forms = [
        ['Unified Application Form for Building Permit', 'Tuy_Data/engineering/unified_application_form_for_building_permit/unified_application_form_for_building_permit.pdf', 'Engineering', 'Standard unified application form required for all building permit applications in the municipality.', 'fa-building'],
        ['Building Permit Application Procedures & Requirements', 'Tuy_Data/engineering/building_permit_application_procedures_and_requirments.pdf', 'Engineering', 'Complete list of procedures, requirements, and supporting documents needed for a building permit application.', 'fa-clipboard-list'],
        ['Architectural Permit', 'Tuy_Data/engineering/architectural_permit/architectural_permit.pdf', 'Engineering', 'Application form for architectural permit, required for building design and architectural plans.', 'fa-drafting-compass'],
        ['Civil / Structural Permit', 'Tuy_Data/engineering/civil_structural_permit/civil_structural_permit.pdf', 'Engineering', 'Application form for civil and structural permit, required for structural engineering plans.', 'fa-hard-hat'],
        ['Electrical Permit', 'Tuy_Data/engineering/electrical_permit/electrical_permit.pdf', 'Engineering', 'Permit application for electrical installations, wiring, and electrical system plans.', 'fa-bolt'],
        ['Plumbing Permit', 'Tuy_Data/engineering/plumbing_permit/plumbing_permit.pdf', 'Engineering', 'Permit application for plumbing work, water supply systems, and sanitary drainage.', 'fa-wrench'],
        ['Sanitary Permit', 'Tuy_Data/engineering/sanitary_permit/sanitary_permit.pdf', 'Engineering', 'Permit application for sanitary and sewerage systems, including waste disposal facilities.', 'fa-pump-soap'],
        ['Certificate of Completion', 'Tuy_Data/engineering/certificate_of_completion/certificate_of_completion.pdf', 'Engineering', 'Application form for certificate of completion, issued upon finishing a construction project.', 'fa-check-circle'],
        ['Certificate of Occupancy', 'Tuy_Data/engineering/unified_application_form_for_certicate_of_occupancy20250811_13112102.pdf', 'Engineering', 'Unified application form for certificate of occupancy, required before a building can be occupied.', 'fa-home'],
        ['Certificate of Final Electrical Inspection', 'Tuy_Data/engineering/certificate_of_final_electrical_inspection.pdf', 'Engineering', 'Application for final electrical inspection certificate, required for energization of a building.', 'fa-plug'],
        ['Requirements for Delayed Registration of Birth', 'Tuy_Data/LCR/requirements_for_delay_registration_of_Birth20250811_12264691.pdf', 'Civil Registry', 'List of requirements for delayed registration of birth at the Local Civil Registrar\'s Office.', 'fa-baby'],
        ['Mandatory Requirements for Delayed Registration', 'Tuy_Data/LCR/mandatory_requirments_for_delay_registration20250811_12341438.pdf', 'Civil Registry', 'Mandatory documentary requirements for all types of delayed civil registration.', 'fa-file-contract'],
        ['Requirements for Marriage License', 'Tuy_Data/LCR/requirments_for_marriage_license20250811_12370786.pdf', 'Civil Registry', 'Complete list of requirements for obtaining a marriage license from the Municipal Civil Registrar.', 'fa-ring'],
        ['Requirements for Correction of Clerical / Typographical Error', 'Tuy_Data/LCR/requirments_for_correction_of_clerical_or_typographical_error20250811_12394373.pdf', 'Civil Registry', 'Requirements for filing a petition to correct clerical or typographical errors in civil registry documents (RA 9048).', 'fa-pen'],
    ];
    
    $stmt = $conn->prepare("INSERT INTO downloadable_files (type, title, filename, original_name, category, description, icon, sort_order) VALUES ('form', ?, ?, ?, ?, ?, ?, ?)");
    foreach ($forms as $i => $f) {
        $origName = basename($f[1]);
        $order = $i + 1;
        $stmt->bind_param('ssssssi', $f[0], $f[1], $origName, $f[2], $f[3], $f[4], $order);
        $stmt->execute();
    }
    $stmt->close();
    
    // ============================================
    // Seed ordinances data
    // ============================================
    $ordinances = [
        ['2023-025', 'Blg. 005', 'Batas Trapiko (Traffic Law)', 2023, 'Public Safety', '2023-025 Ord. Blg. 005 Batas Trapiko.pdf', 'fa-car'],
        ['2024-068', 'No. 008', 'Fire Hydrant Ordinance', 2024, 'Public Safety', '2024-068 Ord. No. 008 Fire Hydrant Ordinance.pdf', 'fa-fire-extinguisher'],
        ['2024-093', 'Blg. 013', 'Ilegal na Sugal (Illegal Gambling)', 2024, 'Public Safety', '2024-093 Ord. Blg. 013 Ilegal na Sugal.pdf', 'fa-ban'],
        ['2024-134', 'Blg. 020', 'Helmet Ordinance (Motorcycle Helmet)', 2024, 'Public Safety', '2024-134 Ord. Blg. 020 - Helmet.pdf', 'fa-hard-hat'],
        ['2025-016', 'Blg. 039', 'Preemptive and Forced Evacuation', 2025, 'Public Safety', '2025-016 Ord. Blg. 039 Preemptive and Forced Evacuation.pdf', 'fa-people-arrows'],
        ['2023-074', 'Blg. 018', 'Prohibiting Child Marriage', 2023, 'Social Welfare', '2023-074 Ord. Blg. 018 Prohibiting Child Marriage.pdf', 'fa-child'],
        ['2023-075', 'Blg. 019', '4Ps Anti-Pawning Ordinance', 2023, 'Social Welfare', '2023-075 Ord. Blg. 019 4Ps Anti-Pawning Ordinance.pdf', 'fa-hand-holding-heart'],
        ['2023-130', 'No. 028', 'Adopting GAD Resolution, Anti-Human Trafficking', 2023, 'Social Welfare', '2023-130 Ord. No. 028 - Adopting GAD Resolution, Anti-Human Trafficking.pdf', 'fa-shield-alt'],
        ['2025-045', 'No. 042', 'Aftercare - 4Ps', 2025, 'Social Welfare', '2025-045 Ord. No. 042 Aftercare - 4Ps.pdf', 'fa-hands-helping'],
        ['2024-109', 'Blg. 017', 'Tuy Health and Sanitation Ordinance', 2024, 'Health & Sanitation', '2024-109 Ord. Blg. 017 - Tuy Health and Sanitation Ordinance.pdf', 'fa-clinic-medical'],
        ['2024-092', 'Blg. 012', 'Magkakarne - Hot Meat', 2024, 'Health & Sanitation', '2024-092 Ord. Blg. 012 Magkakarne - Hot Meat.pdf', 'fa-drumstick-bite'],
        ['2022-139', 'Blg. 032', 'Magtatabas o MSWs (Municipal Solid Waste Workers)', 2022, 'Environment', '2022-139 Ord. Blg. 032 - Magtatabas o MSWs (Fil).pdf', 'fa-recycle'],
        ['2023-035', 'Blg. 007', 'Pagtatabon o Pagtatambak sa Daluyan ng Tubig (Waterway Protection)', 2023, 'Environment', '2023-035 Ord. Blg. 007 - Pagtatabon o Pagtatambak sa Daluyan ng Tubig.pdf', 'fa-water'],
        ['2023-002', 'Blg. 001', 'Malakihang Manukan (Large-scale Poultry)', 2023, 'Agriculture & Livestock', '2023-002 Ord. Blg. 001 - Malakihang Manukan.pdf', 'fa-egg'],
        ['2024-083', 'Blg. 010', 'Babuyan (Piggery Regulation)', 2024, 'Agriculture & Livestock', '2024-083 Ord. Blg. 010 Babuyan.pdf', 'fa-piggy-bank'],
        ['2024-020', 'No. 001', 'Adopting EO No. 297 s. 2000 - PNP Uniform', 2024, 'Public Order', '2024-020 Ord. No. 001 Adopting EO No. 297 s. 2000 - PNP Uniform.pdf', 'fa-user-shield'],
        ['2024-137', 'Blg. 021', 'Liquor Ban', 2024, 'Public Order', '2024-137 Ord. Blg. 021 Liquor Ban.pdf', 'fa-wine-bottle'],
        ['2024-138', 'Blg. 022', 'Pagtitipon (Assembly / Gatherings Regulation)', 2024, 'Public Order', '2024-138 Ord. Blg. 022 Pagtitipon.pdf', 'fa-users'],
        ['2025-061', 'No. 045', 'Addendum to Revised Revenue Code of Tuy - Covered Court Fee', 2025, 'Revenue', '2025-061 Ord. No.  045 Addendum to Revised Revenue Code of Tuy - Covered Court Fee.pdf', 'fa-coins'],
    ];
    
    $stmt = $conn->prepare("INSERT INTO downloadable_files (type, title, filename, original_name, category, description, icon, resolution_no, ordinance_no, year, sort_order) VALUES ('ordinance', ?, ?, ?, ?, '', ?, ?, ?, ?, ?)");
    foreach ($ordinances as $i => $o) {
        $fullPath = 'Tuy_Data/Resolution and Ordinance/' . $o[5];
        $order = $i + 1;
        $stmt->bind_param('sssssssis', $o[2], $fullPath, $o[5], $o[4], $o[6], $o[0], $o[1], $o[3], $order);
        $stmt->execute();
    }
    $stmt->close();
    
    // ============================================
    // Seed calendar events
    // ============================================
    $events = [
        ['01-01', "New Year's Day", 'fa-champagne-glasses', 'text-yellow-500'],
        ['01-09', 'Feast of the Black Nazarene', 'fa-cross', 'text-purple-600'],
        ['02-14', "Valentine's Day", 'fa-heart', 'text-red-500'],
        ['02-25', 'EDSA People Power Anniversary', 'fa-flag', 'text-blue-500'],
        ['03-28', 'Kambingan Festival', 'fa-drum', 'text-orange-500'],
        ['04-05', 'Feast of St. Vincent Ferrer (Patron Saint)', 'fa-church', 'text-primary'],
        ['04-09', 'Araw ng Kagitingan', 'fa-flag', 'text-red-600'],
        ['05-01', 'Labor Day', 'fa-briefcase', 'text-blue-600'],
        ['05-13', 'Municipal Foundation Week Begins', 'fa-city', 'text-primary'],
        ['06-12', 'Independence Day', 'fa-flag', 'text-blue-500'],
        ['07-04', 'Filipino-American Friendship Day', 'fa-handshake', 'text-blue-400'],
        ['08-12', 'Tuy Foundation Day', 'fa-birthday-cake', 'text-primary'],
        ['08-21', 'Ninoy Aquino Day', 'fa-flag', 'text-yellow-500'],
        ['08-26', 'National Heroes Day', 'fa-medal', 'text-yellow-600'],
        ['09-21', 'Barangay Day', 'fa-people-group', 'text-green-600'],
        ['10-01', 'Elderly Filipino Week', 'fa-person-cane', 'text-teal-600'],
        ['10-31', 'Halloween / Undas Eve', 'fa-ghost', 'text-orange-500'],
        ['11-01', "All Saints' Day", 'fa-cross', 'text-purple-600'],
        ['11-02', "All Souls' Day", 'fa-cross', 'text-purple-500'],
        ['11-30', 'Bonifacio Day', 'fa-flag', 'text-red-600'],
        ['12-16', 'Simbang Gabi Begins', 'fa-church', 'text-green-600'],
        ['12-25', 'Christmas Day', 'fa-star', 'text-yellow-500'],
        ['12-30', 'Rizal Day', 'fa-flag', 'text-blue-600'],
        ['12-31', "New Year's Eve", 'fa-champagne-glasses', 'text-yellow-500'],
    ];
    
    $stmt = $conn->prepare("INSERT INTO calendar_events (event_date, title, icon, color) VALUES (?, ?, ?, ?)");
    foreach ($events as $e) {
        $stmt->bind_param('ssss', $e[0], $e[1], $e[2], $e[3]);
        $stmt->execute();
    }
    $stmt->close();
    
    // ============================================
    // Seed site settings
    // ============================================
    $settings = [
        ['facebook_page_id', '1169815403037944'],
        ['facebook_access_token', 'EAAMchFUQk8kBQYpnvbOsPYtZAShZAgB6bAw3deXXWRfdRkHdD0JHV6vJsHXOkVhiPxFq1lZBHXLCgN8Uspc8UvXQUbWYpzegbScklWFhR2UUDRgG7fcLOwggUa9ZAw17ZBFPVrKFZC2NTa3BA1Xs8JKCPfwy09CoSZByYITjODY8bZBShZBffS7ZAEIa7qZC4xiXuJ1ZAbdG'],
        ['facebook_post_limit', '30'],
        ['facebook_cache_duration', '900000'],
    ];
    
    $stmt = $conn->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)");
    foreach ($settings as $s) {
        $stmt->bind_param('ss', $s[0], $s[1]);
        $stmt->execute();
    }
    $stmt->close();
    
    // ============================================
    // Seed map pins (33 markers)
    // ============================================
    $pins = [
        // Halls (3)
        ['halls', 'Tuy Municipal Hall', 14.0191338, 120.7302307, 'Municipal Hall, Tuy, Batangas 4214', 'Main government center and administrative office of the Municipality of Tuy'],
        ['halls', 'Tuy Municipal Gymnasium', 13.9975000, 120.7265000, 'Tuy, Batangas', 'Multi-purpose sports and events facility'],
        ['halls', 'Tuy Municipal Plaza', 13.9990000, 120.7255000, 'Town Center, Tuy, Batangas', 'Public gathering place and community events venue'],
        // Barangays (22)
        ['barangays', 'Barangay Acle', 14.0125000, 120.7350000, null, 'One of the 22 barangays in Tuy municipality'],
        ['barangays', 'Barangay Bayudbud', 14.0050000, 120.7400000, null, 'Coastal barangay along Balayan Bay'],
        ['barangays', 'Barangay Bolbok', 13.9850000, 120.7150000, null, 'Agricultural barangay in Tuy'],
        ['barangays', 'Barangay Dalima', 13.9750000, 120.7200000, null, 'Rural barangay with farming community'],
        ['barangays', 'Barangay Dao', 13.9900000, 120.7100000, null, 'Mountainous barangay with scenic views'],
        ['barangays', 'Barangay Guinhawa', 14.0000000, 120.7300000, null, 'Residential and commercial barangay'],
        ['barangays', 'Barangay Lumbangan', 13.9650000, 120.7250000, null, 'Southern barangay of Tuy'],
        ['barangays', 'Barangay Luntal', 13.9800000, 120.7350000, null, 'Barangay with mixed residential and agricultural areas'],
        ['barangays', 'Barangay Magahis', 14.0100000, 120.7250000, null, 'Northern barangay near town center'],
        ['barangays', 'Barangay Malibu', 14.0150000, 120.7450000, null, 'Coastal barangay with beach access'],
        ['barangays', 'Barangay Mataywanac', 13.9700000, 120.7100000, null, 'Western barangay of Tuy'],
        ['barangays', 'Barangay Burgos', 13.9850000, 120.7450000, null, 'Eastern barangay with rural character'],
        ['barangays', 'Barangay Luna', 13.9920000, 120.7180000, null, 'Central barangay near municipal center'],
        ['barangays', 'Barangay Palincaro', 14.0080000, 120.7320000, null, 'Barangay with commercial establishments'],
        ['barangays', 'Barangay Rillo', 14.0200000, 120.7280000, null, 'Northern barangay of Tuy'],
        ['barangays', 'Barangay Putol', 13.9780000, 120.7280000, null, 'Agricultural barangay in southern Tuy'],
        ['barangays', 'Barangay Sabang', 14.0020000, 120.7480000, null, 'Coastal barangay along Balayan Bay'],
        ['barangays', 'Barangay Rizal', 13.9880000, 120.7220000, null, 'Barangay near town proper'],
        ['barangays', 'Barangay Talon', 13.9950000, 120.7150000, null, 'Western barangay with farming areas'],
        ['barangays', 'Barangay Toong', 13.9720000, 120.7320000, null, 'Southern barangay of Tuy'],
        ['barangays', 'Barangay Tuyon-Tuyon', 14.0030000, 120.7200000, null, 'Central barangay in Tuy municipality'],
        ['barangays', 'Barangay San Jose', 13.9550000, 120.7500000, null, 'Southern barangay of Tuy municipality'],
        // Offices (8)
        ['offices', 'Tuy Rural Health Unit', 13.9990000, 120.7260000, 'Tuy, Batangas', 'Primary healthcare facility providing medical services to residents'],
        ['offices', 'Tuy Police Station', 13.9978000, 120.7245000, 'Tuy, Batangas', 'Municipal police station ensuring peace and order'],
        ['offices', 'Tuy Fire Station', 13.9970000, 120.7270000, 'Tuy, Batangas', 'Fire protection and emergency response services'],
        ['offices', 'Tuy Post Office', 13.9988000, 120.7258000, 'Tuy, Batangas', 'Philippine Postal Corporation branch office'],
        ['offices', 'Tuy Public Market', 13.9995000, 120.7268000, 'Town Center, Tuy, Batangas', 'Municipal market serving the community'],
        ['offices', 'Tuy Central School', 14.0005000, 120.7240000, 'Tuy, Batangas', 'Public elementary school'],
        ['offices', 'Tuy National High School', 14.0015000, 120.7275000, 'Tuy, Batangas', 'Public secondary school'],
        ['offices', 'Tuy Parish Church', 13.9985000, 120.7252000, 'Town Center, Tuy, Batangas', 'Historic Catholic church - Saint Vincent Ferrer Parish Church'],
    ];
    
    $stmt = $conn->prepare("INSERT INTO map_pins (category, title, lat, lng, address, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($pins as $i => $p) {
        $order = $i + 1;
        $stmt->bind_param('ssddssi', $p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $order);
        $stmt->execute();
    }
    $stmt->close();
    
    // ============================================
    // Create upload directories
    // ============================================
    $uploadBase = __DIR__ . '/../uploads';
    $dirs = ['gallery', 'forms', 'ordinances'];
    foreach ($dirs as $d) {
        $path = "$uploadBase/$d";
        if (!is_dir($path)) {
            @mkdir($path, 0755, true);
        }
    }
    
    // Write .htaccess to uploads to prevent PHP execution
    $htaccess = "# Prevent PHP execution in uploads directory\nphp_flag engine off\n\n# Deny access to hidden files\n<FilesMatch \"^\\.\"> \n    Require all denied\n</FilesMatch>\n";
    @file_put_contents("$uploadBase/.htaccess", $htaccess);
    
    // ============================================
    // Write config.php with database credentials
    // ============================================
    $configContent = "<?php\n";
    $configContent .= "/**\n";
    $configContent .= " * Tuy Website API - Configuration\n";
    $configContent .= " * \n";
    $configContent .= " * Generated by setup.php on " . date('Y-m-d H:i:s') . "\n";
    $configContent .= " * Do not edit manually unless you know what you're doing.\n";
    $configContent .= " */\n\n";
    $configContent .= "// Database credentials\n";
    $configContent .= "define('DB_HOST', " . var_export($dbHost, true) . ");\n";
    $configContent .= "define('DB_NAME', " . var_export($dbName, true) . ");\n";
    $configContent .= "define('DB_USER', " . var_export($dbUser, true) . ");\n";
    $configContent .= "define('DB_PASS', " . var_export($dbPass, true) . ");\n\n";
    $configContent .= "// Session configuration\n";
    $configContent .= "define('SESSION_LIFETIME', 86400); // 24 hours\n\n";
    $configContent .= "// Upload configuration\n";
    $configContent .= "define('UPLOAD_DIR', __DIR__ . '/../uploads/');\n";
    $configContent .= "define('MAX_IMAGE_SIZE', 10 * 1024 * 1024);  // 10 MB\n";
    $configContent .= "define('MAX_FILE_SIZE', 25 * 1024 * 1024);   // 25 MB\n";
    $configContent .= "define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/webp']);\n";
    $configContent .= "define('ALLOWED_FILE_TYPES', ['application/pdf']);\n\n";
    $configContent .= file_get_contents(__DIR__ . '/config.php.helpers');
    
    // First, save helpers to a separate file so we can include them
    $helpersContent = <<<'HELPERS'

// ============================================
// Helper Functions
// ============================================

/**
 * Get database connection
 */
function getDB(): mysqli {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            jsonResponse(500, ['error' => 'Database connection failed']);
            exit;
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}

/**
 * Set CORS and content-type headers
 */
function setCorsHeaders(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = [
        'https://www.tuybatangas.gov.ph',
        'https://tuybatangas.gov.ph',
        'http://localhost:5173',
        'http://localhost:4173',
    ];

    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');
}

/**
 * Handle preflight OPTIONS request
 */
function handlePreflight(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Send JSON response and exit
 */
function jsonResponse(int $status, array $data): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Start admin session
 */
function startSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => SESSION_LIFETIME,
            'path' => '/',
            'secure' => isset($_SERVER['HTTPS']),
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

/**
 * Check if current request is authenticated
 */
function requireAuth(): void {
    startSession();
    if (empty($_SESSION['admin_id'])) {
        jsonResponse(401, ['error' => 'Unauthorized']);
    }
}

/**
 * Get JSON body from request
 */
function getJsonBody(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Check if setup has been completed
 */
function isSetupComplete(): bool {
    return DB_HOST !== '' && DB_NAME !== '' && DB_USER !== '' && DB_PASS !== '';
}

HELPERS;
    
    // Write the full config.php with helpers inline
    $fullConfig = "<?php\n";
    $fullConfig .= "/**\n";
    $fullConfig .= " * Tuy Website API - Configuration\n";
    $fullConfig .= " * \n";
    $fullConfig .= " * Generated by setup.php on " . date('Y-m-d H:i:s') . "\n";
    $fullConfig .= " * Do not edit manually unless you know what you're doing.\n";
    $fullConfig .= " */\n\n";
    $fullConfig .= "// Database credentials\n";
    $fullConfig .= "define('DB_HOST', " . var_export($dbHost, true) . ");\n";
    $fullConfig .= "define('DB_NAME', " . var_export($dbName, true) . ");\n";
    $fullConfig .= "define('DB_USER', " . var_export($dbUser, true) . ");\n";
    $fullConfig .= "define('DB_PASS', " . var_export($dbPass, true) . ");\n\n";
    $fullConfig .= "// Session configuration\n";
    $fullConfig .= "define('SESSION_LIFETIME', 86400); // 24 hours\n\n";
    $fullConfig .= "// Upload configuration\n";
    $fullConfig .= "define('UPLOAD_DIR', __DIR__ . '/../uploads/');\n";
    $fullConfig .= "define('MAX_IMAGE_SIZE', 10 * 1024 * 1024);  // 10 MB\n";
    $fullConfig .= "define('MAX_FILE_SIZE', 25 * 1024 * 1024);   // 25 MB\n";
    $fullConfig .= "define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/webp']);\n";
    $fullConfig .= "define('ALLOWED_FILE_TYPES', ['application/pdf']);\n";
    $fullConfig .= $helpersContent;
    
    $configPath = __DIR__ . '/config.php';
    if (file_put_contents($configPath, $fullConfig) === false) {
        echo json_encode(['success' => false, 'errors' => ['Failed to write config.php. Check file permissions on the api/ directory.']]);
        $conn->close();
        exit;
    }
    
    $conn->close();
    echo json_encode(['success' => true, 'message' => 'Setup completed successfully! You can now log in at /admin']);
    exit;
}

// ============================================
// Check if already set up
// ============================================
$alreadySetUp = false;
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    // Try to include and check if DB credentials are filled
    $configContents = file_get_contents($configPath);
    if (strpos($configContents, "define('DB_HOST', '')") === false || 
        (strpos($configContents, "define('DB_HOST', '');") === false)) {
        // Config might have credentials, try connecting
        // We'll let the POST handler check more thoroughly
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tuy Website - Setup</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; color: #1f2937; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .container { background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); max-width: 560px; width: 100%; padding: 40px; }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo h1 { color: #01377d; font-size: 24px; margin-bottom: 4px; }
        .logo p { color: #6b7280; font-size: 14px; }
        .section { margin-bottom: 28px; }
        .section h2 { font-size: 16px; color: #01377d; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 4px; }
        .field input { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.15s; }
        .field input:focus { outline: none; border-color: #01377d; box-shadow: 0 0 0 3px rgba(1,55,125,0.1); }
        .field .hint { font-size: 12px; color: #9ca3af; margin-top: 4px; }
        .btn { width: 100%; padding: 12px; background: #01377d; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .btn:hover { background: #00306e; }
        .btn:disabled { background: #9ca3af; cursor: not-allowed; }
        .alert { padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 20px; }
        .alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        .alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; margin-right: 8px; vertical-align: middle; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <h1>Municipality of Tuy</h1>
            <p>Website Setup &amp; Installation</p>
        </div>

        <div id="alerts"></div>

        <form id="setupForm" onsubmit="handleSubmit(event)">
            <div class="section">
                <h2>Database Connection (MySQL)</h2>
                <div class="field">
                    <label for="db_host">Database Host</label>
                    <input type="text" id="db_host" name="db_host" value="localhost" required>
                    <div class="hint">Usually "localhost" for cPanel hosting</div>
                </div>
                <div class="field">
                    <label for="db_name">Database Name</label>
                    <input type="text" id="db_name" name="db_name" required>
                    <div class="hint">Create this database in phpMyAdmin first</div>
                </div>
                <div class="field">
                    <label for="db_user">Database Username</label>
                    <input type="text" id="db_user" name="db_user" required>
                </div>
                <div class="field">
                    <label for="db_pass">Database Password</label>
                    <input type="password" id="db_pass" name="db_pass">
                </div>
            </div>

            <div class="section">
                <h2>Admin Account</h2>
                <div class="field">
                    <label for="admin_name">Full Name</label>
                    <input type="text" id="admin_name" name="admin_name" required>
                </div>
                <div class="field">
                    <label for="admin_email">Email Address</label>
                    <input type="email" id="admin_email" name="admin_email" required>
                </div>
                <div class="field">
                    <label for="admin_password">Password</label>
                    <input type="password" id="admin_password" name="admin_password" minlength="8" required>
                    <div class="hint">Minimum 8 characters</div>
                </div>
            </div>

            <button type="submit" class="btn" id="submitBtn">Install &amp; Set Up</button>
        </form>
    </div>

    <script>
        async function handleSubmit(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const alerts = document.getElementById('alerts');
            
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span>Installing...';
            alerts.innerHTML = '';

            const formData = new FormData(e.target);
            
            try {
                const res = await fetch('setup.php', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                
                if (data.success) {
                    alerts.innerHTML = '<div class="alert alert-success">' + data.message + '</div>';
                    btn.textContent = 'Setup Complete';
                    setTimeout(() => { window.location.href = '/admin'; }, 2000);
                } else {
                    const errorHtml = data.errors.map(e => '<div class="alert alert-error">' + e + '</div>').join('');
                    alerts.innerHTML = errorHtml;
                    btn.disabled = false;
                    btn.textContent = 'Install & Set Up';
                }
            } catch (err) {
                alerts.innerHTML = '<div class="alert alert-error">Network error: ' + err.message + '</div>';
                btn.disabled = false;
                btn.textContent = 'Install & Set Up';
            }
        }
    </script>
</body>
</html>
