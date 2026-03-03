<?php
/**
 * Tuy Website API - Site Settings
 * 
 * GET          - Get all settings (public)
 * PUT          - Update settings (auth required)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getSettings();
        break;
    case 'PUT':
        requireAuth();
        updateSettings();
        break;
    default:
        jsonResponse(405, ['error' => 'Method not allowed']);
}

function getSettings(): void {
    $db = getDB();
    $result = $db->query("SELECT setting_key, setting_value FROM site_settings");
    
    $settings = [];
    while ($row = $result->fetch_assoc()) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    
    jsonResponse(200, ['data' => $settings]);
}

function updateSettings(): void {
    $body = getJsonBody();
    
    if (empty($body)) {
        jsonResponse(400, ['error' => 'No settings to update']);
    }
    
    $db = getDB();
    $allowedKeys = ['facebook_page_id', 'facebook_access_token', 'facebook_post_limit', 'facebook_cache_duration'];
    
    $stmt = $db->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
    
    $updated = 0;
    foreach ($body as $key => $value) {
        if (in_array($key, $allowedKeys)) {
            $val = (string)$value;
            $stmt->bind_param('ss', $key, $val);
            $stmt->execute();
            $updated++;
        }
    }
    
    $stmt->close();
    
    if ($updated === 0) {
        jsonResponse(400, ['error' => 'No valid settings provided. Allowed: ' . implode(', ', $allowedKeys)]);
    }
    
    jsonResponse(200, ['success' => true, 'updated' => $updated]);
}
