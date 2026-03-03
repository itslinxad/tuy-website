<?php
/**
 * Tuy Website API - Gallery Images
 * 
 * GET              - List all images (public, optional ?category=xxx)
 * POST             - Add image record (auth required, upload file first via upload.php)
 * PUT  ?id=X       - Update image metadata (auth required)
 * DELETE ?id=X     - Delete image and file (auth required)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        listImages();
        break;
    case 'POST':
        requireAuth();
        addImage();
        break;
    case 'PUT':
        requireAuth();
        updateImage();
        break;
    case 'DELETE':
        requireAuth();
        deleteImage();
        break;
    default:
        jsonResponse(405, ['error' => 'Method not allowed']);
}

function listImages(): void {
    $db = getDB();
    $category = $_GET['category'] ?? '';
    
    if ($category && $category !== 'All') {
        $stmt = $db->prepare("SELECT * FROM gallery_images WHERE category = ? ORDER BY sort_order ASC, created_at DESC");
        $stmt->bind_param('s', $category);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $result = $db->query("SELECT * FROM gallery_images ORDER BY sort_order ASC, created_at DESC");
    }
    
    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
    
    jsonResponse(200, ['data' => $images]);
}

function addImage(): void {
    $body = getJsonBody();
    
    $filename = $body['filename'] ?? '';
    $originalName = $body['original_name'] ?? '';
    $category = $body['category'] ?? '';
    $caption = $body['caption'] ?? '';
    
    if (empty($filename) || empty($category)) {
        jsonResponse(400, ['error' => 'Filename and category are required']);
    }
    
    $db = getDB();
    
    // Get next sort order
    $result = $db->query("SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM gallery_images");
    $nextOrder = $result->fetch_assoc()['next_order'];
    
    $stmt = $db->prepare("INSERT INTO gallery_images (filename, original_name, category, caption, sort_order) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('ssssi', $filename, $originalName, $category, $caption, $nextOrder);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to add image']);
    }
    
    $id = $stmt->insert_id;
    $stmt->close();
    
    jsonResponse(201, ['success' => true, 'id' => $id]);
}

function updateImage(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid image ID is required']);
    }
    
    $body = getJsonBody();
    $db = getDB();
    
    // Build dynamic update
    $fields = [];
    $types = '';
    $values = [];
    
    if (isset($body['category'])) {
        $fields[] = 'category = ?';
        $types .= 's';
        $values[] = $body['category'];
    }
    if (isset($body['caption'])) {
        $fields[] = 'caption = ?';
        $types .= 's';
        $values[] = $body['caption'];
    }
    if (isset($body['sort_order'])) {
        $fields[] = 'sort_order = ?';
        $types .= 'i';
        $values[] = (int)$body['sort_order'];
    }
    
    if (empty($fields)) {
        jsonResponse(400, ['error' => 'No fields to update']);
    }
    
    $sql = "UPDATE gallery_images SET " . implode(', ', $fields) . " WHERE id = ?";
    $types .= 'i';
    $values[] = $id;
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to update image']);
    }
    
    $stmt->close();
    jsonResponse(200, ['success' => true]);
}

function deleteImage(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid image ID is required']);
    }
    
    $db = getDB();
    
    // Get filename to delete physical file
    $stmt = $db->prepare("SELECT filename FROM gallery_images WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        jsonResponse(404, ['error' => 'Image not found']);
    }
    
    $row = $result->fetch_assoc();
    $stmt->close();
    
    // Delete physical file (only from uploads directory)
    $filePath = UPLOAD_DIR . 'gallery/' . $row['filename'];
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    
    // Delete DB record
    $stmt = $db->prepare("DELETE FROM gallery_images WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();
    
    jsonResponse(200, ['success' => true]);
}
