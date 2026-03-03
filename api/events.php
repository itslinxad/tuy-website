<?php
/**
 * Tuy Website API - Calendar Events
 * 
 * GET              - List all events (public)
 * POST             - Add event (auth required)
 * PUT ?id=X        - Update event (auth required)
 * DELETE ?id=X     - Delete event (auth required)
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        listEvents();
        break;
    case 'POST':
        requireAuth();
        addEvent();
        break;
    case 'PUT':
        requireAuth();
        updateEvent();
        break;
    case 'DELETE':
        requireAuth();
        deleteEvent();
        break;
    default:
        jsonResponse(405, ['error' => 'Method not allowed']);
}

function listEvents(): void {
    $db = getDB();
    $result = $db->query("SELECT * FROM calendar_events ORDER BY event_date ASC");
    
    $events = [];
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
    
    jsonResponse(200, ['data' => $events]);
}

function addEvent(): void {
    $body = getJsonBody();
    
    $title = trim($body['title'] ?? '');
    $eventDate = trim($body['event_date'] ?? '');
    $icon = $body['icon'] ?? 'fa-calendar';
    $color = $body['color'] ?? 'text-blue-500';
    
    if (empty($title) || empty($eventDate)) {
        jsonResponse(400, ['error' => 'Title and event_date are required']);
    }
    
    // Validate MM-DD format
    if (!preg_match('/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/', $eventDate)) {
        jsonResponse(400, ['error' => 'event_date must be in MM-DD format (e.g., 03-28)']);
    }
    
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO calendar_events (title, event_date, icon, color) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $title, $eventDate, $icon, $color);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to add event']);
    }
    
    $id = $stmt->insert_id;
    $stmt->close();
    
    jsonResponse(201, ['success' => true, 'id' => $id]);
}

function updateEvent(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid event ID is required']);
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
    if (isset($body['event_date'])) {
        $date = trim($body['event_date']);
        if (!preg_match('/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/', $date)) {
            jsonResponse(400, ['error' => 'event_date must be in MM-DD format']);
        }
        $fields[] = 'event_date = ?';
        $types .= 's';
        $values[] = $date;
    }
    if (isset($body['icon'])) {
        $fields[] = 'icon = ?';
        $types .= 's';
        $values[] = $body['icon'];
    }
    if (isset($body['color'])) {
        $fields[] = 'color = ?';
        $types .= 's';
        $values[] = $body['color'];
    }
    
    if (empty($fields)) {
        jsonResponse(400, ['error' => 'No fields to update']);
    }
    
    $sql = "UPDATE calendar_events SET " . implode(', ', $fields) . " WHERE id = ?";
    $types .= 'i';
    $values[] = $id;
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param($types, ...$values);
    
    if (!$stmt->execute()) {
        jsonResponse(500, ['error' => 'Failed to update event']);
    }
    
    $stmt->close();
    jsonResponse(200, ['success' => true]);
}

function deleteEvent(): void {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, ['error' => 'Valid event ID is required']);
    }
    
    $db = getDB();
    
    // Check event exists
    $stmt = $db->prepare("SELECT id FROM calendar_events WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        jsonResponse(404, ['error' => 'Event not found']);
    }
    $stmt->close();
    
    $stmt = $db->prepare("DELETE FROM calendar_events WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();
    
    jsonResponse(200, ['success' => true]);
}
