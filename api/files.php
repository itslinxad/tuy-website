<?php
/**
 * Tuy Website API - Downloadable Files (Forms + Ordinances)
 * 
 * GET ?type=form|ordinance  - List files (public)
 * POST                      - Add file record (auth required)
 * PUT ?id=X                 - Update file metadata (auth required)
 * DELETE ?id=X              - Delete file and record (auth required)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        listFiles();
        break;
    case 'POST':
        requireAuth();
        addFile();
        break;
    case 'PUT':
        requireAuth();
        updateFile();
        break;
    case 'DELETE':
        requireAuth();
        deleteFile();
        break;
    default:
        jsonResponse(405, ['error' => 'Method not allowed']);
}

function listFiles(): void {
    $db = getDB();
    $type = $_GET['type'] ?? '';
    
    if ($type && in_array($type, ['form', 'ordinance'])) {
        $stmt = $db->prepare("SELECT * FROM downloadable_files WHERE type = ? ORDER BY sort_order ASC, created_at DESC");
        $stmt->bind_param('s', $type);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $result = $db->query("SELECT * FROM downloadable_files ORDER BY type, sort_order ASC, created_at DESC");
    }
    
    $files = [];
    while ($row = $result->fetch_assoc()) {
        $files[] = $row;
    }
    
    jsonResponse(200, ['data' => $files]);
}

function addFile(): void {
    $body = getJsonBody();
    
    $type = $body['type'] ?? '';
    $title = trim($body['title'] ?? '');
    $filename = $body['filename'] ?? '';
    $originalName = $body['original_name'] ?? '';
    $category = $body['category'] ?? '';
    $description = $body['description'] ?? '';
    $icon = $body['icon'] ?? 'fa-file';
    $resolutionNo = $body['resolution_no'] ?? null;
    $ordinanceNo = $body['ordinance_no'] ?? null;
    $year = isset($body['year']) ? (int)$body['year'] : null;
    
    if (!in_array($type, ['form', 'ordinance'])) {
        jsonResponse(400, ['error' => 'Type must be "form" or "ordinance"']);
    }
    if (empty($title) || empty($filename) || empty($category)) {
        jsonResponse(400, ['error' => 'Title, filename, and category are required']);
    }
    
    $db = getDB();
    
    // Get next sort order for this type
    $stmt = $db->prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM downloadable_files WHERE type = ?");
    $stmt->bind_param('s', $type);
    $stmt->execute();
    $nextOrder = $stmt->get_result()->fetch_assoc()['next_order'];
    $stmt->close();
    
    $stmt = $db->prepare("INSERT INTO downloadable_files (type, title, filename, original_name, category, description, icon, resolution_no, ordinance_no, year, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('sssssssssii', $type, $title, $filename, $originalName, $category, $description, $icon, $resolutionNo, $ordinanceNo, $year, $nextOrder);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to add file: ' . $stmt->error]);
    }
    
    $id = $stmt->insert_id;
    $stmt->close();
    
    jsonResponse(201, ['success' => true, 'id' => $id]);
}

function updateFile(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid file ID is required']);
    }
    
    $body = getJsonBody();
    $db = getDB();
    
    $fields = [];
    $types = '';
    $values = [];
    
    $stringFields = ['title', 'category', 'description', 'icon', 'resolution_no', 'ordinance_no', 'filename', 'original_name'];
    foreach ($stringFields as $field) {
        if (isset($body[$field])) {
            $fields[] = "`$field` = ?";
            $types .= 's';
            $values[] = $body[$field];
        }
    }
    
    if (isset($body['year'])) {
        $fields[] = '`year` = ?';
        $types .= 'i';
        $values[] = (int)$body['year'];
    }
    if (isset($body['sort_order'])) {
        $fields[] = '`sort_order` = ?';
        $types .= 'i';
        $values[] = (int)$body['sort_order'];
    }
    
    if (empty($fields)) {
        jsonResponse(400, ['error' => 'No fields to update']);
    }
    
    $sql = "UPDATE downloadable_files SET " . implode(', ', $fields) . " WHERE id = ?";
    $types .= 'i';
    $values[] = $id;
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to update file']);
    }
    
    $stmt->close();
    jsonResponse(200, ['success' => true]);
}

function deleteFile(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid file ID is required']);
    }
    
    $db = getDB();
    
    // Get file info
    $stmt = $db->prepare("SELECT type, filename FROM downloadable_files WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        jsonResponse(404, ['error' => 'File not found']);
    }
    
    $row = $result->fetch_assoc();
    $stmt->close();
    
    // Delete physical file if it's in uploads directory
    $subdir = ($row['type'] === 'form') ? 'forms' : 'ordinances';
    $filePath = UPLOAD_DIR . $subdir . '/' . $row['filename'];
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    
    // Delete DB record
    $stmt = $db->prepare("DELETE FROM downloadable_files WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();
    
    jsonResponse(200, ['success' => true]);
}
