<?php
/**
 * Tuy Website API - File Upload Handler
 * 
 * POST - Upload a file (image or PDF)
 *   Required: file (multipart), type (gallery|forms|ordinances)
 *   Returns: { filename, original_name, path }
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(405, ['error' => 'Method not allowed']);
}

requireAuth();

// Validate upload type
$type = $_POST['type'] ?? '';
$allowedTypes = ['gallery', 'forms', 'ordinances'];
if (!in_array($type, $allowedTypes)) {
    jsonResponse(400, ['error' => 'Invalid upload type. Use: gallery, forms, ordinances']);
}

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds server upload limit',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds form upload limit',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Server missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
    ];
    $code = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
    $msg = $errorMessages[$code] ?? 'Unknown upload error';
    jsonResponse(400, ['error' => $msg]);
}

$file = $_FILES['file'];
$mimeType = mime_content_type($file['tmp_name']);
$originalName = basename($file['name']);

// Validate file type and size based on upload type
if ($type === 'gallery') {
    if (!in_array($mimeType, ALLOWED_IMAGE_TYPES)) {
        jsonResponse(400, ['error' => 'Invalid image type. Allowed: JPG, PNG, WebP']);
    }
    if ($file['size'] > MAX_IMAGE_SIZE) {
        jsonResponse(400, ['error' => 'Image too large. Maximum: ' . (MAX_IMAGE_SIZE / 1024 / 1024) . ' MB']);
    }
} else {
    if (!in_array($mimeType, ALLOWED_FILE_TYPES)) {
        jsonResponse(400, ['error' => 'Invalid file type. Only PDF files are allowed']);
    }
    if ($file['size'] > MAX_FILE_SIZE) {
        jsonResponse(400, ['error' => 'File too large. Maximum: ' . (MAX_FILE_SIZE / 1024 / 1024) . ' MB']);
    }
}

// Generate unique filename preserving extension
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowedExts = ($type === 'gallery') ? ['jpg', 'jpeg', 'png', 'webp'] : ['pdf'];
if (!in_array($ext, $allowedExts)) {
    jsonResponse(400, ['error' => 'Invalid file extension']);
}

$uniqueName = uniqid('tuy_', true) . '.' . $ext;
$uploadDir = UPLOAD_DIR . $type . '/';

// Ensure directory exists
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        jsonResponse(500, ['error' => 'Failed to create upload directory']);
    }
}

$destination = $uploadDir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    jsonResponse(500, ['error' => 'Failed to save uploaded file']);
}

jsonResponse(200, [
    'success' => true,
    'filename' => $uniqueName,
    'original_name' => $originalName,
    'path' => "uploads/$type/$uniqueName",
]);
