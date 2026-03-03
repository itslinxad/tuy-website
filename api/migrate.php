<?php
/**
 * Tuy Website API - Migration Script
 * 
 * Standalone migration for existing installs that already ran setup.php.
 * Creates the map_pins table and seeds it with 33 markers if it doesn't exist.
 * 
 * Usage: Visit /api/migrate.php in the browser.
 */

$results = [];
$hasError = false;

// Check config.php exists and has credentials
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    $results[] = ['error', 'config.php not found. Please run setup.php first.'];
    $hasError = true;
} else {
    require_once $configPath;
    
    if (!defined('DB_HOST') || DB_HOST === '') {
        $results[] = ['error', 'Database credentials not configured. Please run setup.php first.'];
        $hasError = true;
    }
}

if (!$hasError) {
    // Connect to database
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        $results[] = ['error', 'Database connection failed: ' . $conn->connect_error];
        $hasError = true;
    } else {
        $conn->set_charset('utf8mb4');
        
        // Check if map_pins table already exists
        $tableCheck = $conn->query("SHOW TABLES LIKE 'map_pins'");
        if ($tableCheck && $tableCheck->num_rows > 0) {
            $countCheck = $conn->query("SELECT COUNT(*) as cnt FROM map_pins");
            $row = $countCheck->fetch_assoc();
            $results[] = ['info', "map_pins table already exists with {$row['cnt']} rows. Skipping creation."];
        } else {
            // Create map_pins table
            $createSql = "CREATE TABLE IF NOT EXISTS `map_pins` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `category` ENUM('halls','barangays','offices') NOT NULL,
                `title` VARCHAR(255) NOT NULL,
                `lat` DECIMAL(10,7) NOT NULL,
                `lng` DECIMAL(10,7) NOT NULL,
                `address` VARCHAR(500) DEFAULT NULL,
                `description` TEXT DEFAULT NULL,
                `sort_order` INT DEFAULT 0,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
            
            if (!$conn->query($createSql)) {
                $results[] = ['error', 'Failed to create map_pins table: ' . $conn->error];
                $hasError = true;
            } else {
                $results[] = ['success', 'Created map_pins table.'];
                
                // Seed with 33 markers
                $pins = [
                    ['halls', 'Tuy Municipal Hall', 14.0191338, 120.7302307, 'Municipal Hall, Tuy, Batangas 4214', 'Main government center and administrative office of the Municipality of Tuy'],
                    ['halls', 'Tuy Municipal Gymnasium', 13.9975000, 120.7265000, 'Tuy, Batangas', 'Multi-purpose sports and events facility'],
                    ['halls', 'Tuy Municipal Plaza', 13.9990000, 120.7255000, 'Town Center, Tuy, Batangas', 'Public gathering place and community events venue'],
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
                $seeded = 0;
                foreach ($pins as $i => $p) {
                    $order = $i + 1;
                    $stmt->bind_param('ssddssi', $p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $order);
                    if ($stmt->execute()) {
                        $seeded++;
                    }
                }
                $stmt->close();
                $results[] = ['success', "Seeded $seeded map pins."];
            }
        }
        
        $conn->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tuy Website - Migration</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; color: #1f2937; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .container { background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); max-width: 560px; width: 100%; padding: 40px; }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo h1 { color: #01377d; font-size: 24px; margin-bottom: 4px; }
        .logo p { color: #6b7280; font-size: 14px; }
        .result { padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .result-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .result-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        .result-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
        .icon { font-size: 18px; }
        .back-link { display: block; text-align: center; margin-top: 20px; color: #01377d; text-decoration: none; font-size: 14px; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <h1>Municipality of Tuy</h1>
            <p>Database Migration</p>
        </div>
        
        <?php foreach ($results as $r): ?>
            <div class="result result-<?php echo $r[0]; ?>">
                <span class="icon">
                    <?php 
                    if ($r[0] === 'success') echo '&#10004;';
                    elseif ($r[0] === 'error') echo '&#10008;';
                    else echo '&#8505;';
                    ?>
                </span>
                <span><?php echo htmlspecialchars($r[1]); ?></span>
            </div>
        <?php endforeach; ?>
        
        <?php if (empty($results)): ?>
            <div class="result result-info">
                <span class="icon">&#8505;</span>
                <span>No migrations to run.</span>
            </div>
        <?php endif; ?>
        
        <a href="/admin" class="back-link">&larr; Back to Admin</a>
    </div>
</body>
</html>
