<?php
/**
 * Tuy Website API - Map Pins
 * 
 * GET              - List all pins (public). Optional ?category=halls|barangays|offices
 * POST             - Add pin (auth required)
 * PUT ?id=X        - Update pin (auth required)
 * DELETE ?id=X     - Delete pin (auth required)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        listPins();
        break;
    case 'POST':
        requireAuth();
        addPin();
        break;
    case 'PUT':
        requireAuth();
        updatePin();
        break;
    case 'DELETE':
        requireAuth();
        deletePin();
        break;
    default:
        jsonResponse(405, ['error' => 'Method not allowed']);
}

function listPins(): void {
    $db = getDB();
    
    $category = $_GET['category'] ?? '';
    $validCategories = ['halls', 'barangays', 'offices'];
    
    if ($category && in_array($category, $validCategories)) {
        $stmt = $db->prepare("SELECT * FROM map_pins WHERE category = ? ORDER BY sort_order ASC, title ASC");
        $stmt->bind_param('s', $category);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $result = $db->query("SELECT * FROM map_pins ORDER BY category ASC, sort_order ASC, title ASC");
    }
    
    $pins = [];
    while ($row = $result->fetch_assoc()) {
        // Cast numeric fields
        $row['id'] = (int)$row['id'];
        $row['lat'] = (float)$row['lat'];
        $row['lng'] = (float)$row['lng'];
        $row['sort_order'] = (int)$row['sort_order'];
        $pins[] = $row;
    }
    
    jsonResponse(200, ['data' => $pins]);
}

function addPin(): void {
    $body = getJsonBody();
    
    $category = trim($body['category'] ?? '');
    $title = trim($body['title'] ?? '');
    $lat = $body['lat'] ?? null;
    $lng = $body['lng'] ?? null;
    $address = isset($body['address']) ? trim($body['address']) : null;
    $description = isset($body['description']) ? trim($body['description']) : null;
    $sortOrder = (int)($body['sort_order'] ?? 0);
    
    // Validate required fields
    $errors = [];
    if (empty($title)) $errors[] = 'Title is required';
    if (!in_array($category, ['halls', 'barangays', 'offices'])) $errors[] = 'Category must be halls, barangays, or offices';
    if ($lat === null || !is_numeric($lat)) $errors[] = 'Valid latitude is required';
    if ($lng === null || !is_numeric($lng)) $errors[] = 'Valid longitude is required';
    
    if (!empty($errors)) {
        jsonResponse(400, ['error' => implode('. ', $errors)]);
    }
    
    $lat = (float)$lat;
    $lng = (float)$lng;
    
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO map_pins (category, title, lat, lng, address, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('ssddssi', $category, $title, $lat, $lng, $address, $description, $sortOrder);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to add pin']);
    }
    
    $id = $stmt->insert_id;
    $stmt->close();
    
    jsonResponse(201, ['success' => true, 'id' => $id]);
}

function updatePin(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid pin ID is required']);
    }
    
    $body = getJsonBody();
    $db = getDB();
    
    $fields = [];
    $types = '';
    $values = [];
    
    if (isset($body['title'])) {
        $fields[] = 'title = ?';
        $types .= 's';
        $values[] = trim($body['title']);
    }
    if (isset($body['category'])) {
        $cat = trim($body['category']);
        if (!in_array($cat, ['halls', 'barangays', 'offices'])) {
            jsonResponse(400, ['error' => 'Category must be halls, barangays, or offices']);
        }
        $fields[] = 'category = ?';
        $types .= 's';
        $values[] = $cat;
    }
    if (isset($body['lat'])) {
        $fields[] = 'lat = ?';
        $types .= 'd';
        $values[] = (float)$body['lat'];
    }
    if (isset($body['lng'])) {
        $fields[] = 'lng = ?';
        $types .= 'd';
        $values[] = (float)$body['lng'];
    }
    if (array_key_exists('address', $body)) {
        $fields[] = 'address = ?';
        $types .= 's';
        $values[] = $body['address'] !== null ? trim($body['address']) : null;
    }
    if (array_key_exists('description', $body)) {
        $fields[] = 'description = ?';
        $types .= 's';
        $values[] = $body['description'] !== null ? trim($body['description']) : null;
    }
    if (isset($body['sort_order'])) {
        $fields[] = 'sort_order = ?';
        $types .= 'i';
        $values[] = (int)$body['sort_order'];
    }
    
    if (empty($fields)) {
        jsonResponse(400, ['error' => 'No fields to update']);
    }
    
    $sql = "UPDATE map_pins SET " . implode(', ', $fields) . " WHERE id = ?";
    $types .= 'i';
    $values[] = $id;
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to update pin']);
    }
    
    if ($stmt->affected_rows === 0) {
        // Check if pin exists
        $check = $db->prepare("SELECT id FROM map_pins WHERE id = ?");
        $check->bind_param('i', $id);
        $check->execute();
        if ($check->get_result()->num_rows === 0) {
            jsonResponse(404, ['error' => 'Pin not found']);
        }
        $check->close();
    }
    
    $stmt->close();
    jsonResponse(200, ['success' => true]);
}

function deletePin(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid pin ID is required']);
    }
    
    $db = getDB();
    
    // Check pin exists
    $stmt = $db->prepare("SELECT id FROM map_pins WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        jsonResponse(404, ['error' => 'Pin not found']);
    }
    $stmt->close();
    
    $stmt = $db->prepare("DELETE FROM map_pins WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();
    
    jsonResponse(200, ['success' => true]);
}
