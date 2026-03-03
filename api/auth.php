<?php
/**
 * Tuy Website API - Authentication
 * 
 * Endpoints:
 *   POST ?action=login   - Login with email + password
 *   POST ?action=logout  - Destroy session
 *   GET  ?action=check   - Check if session is valid
 */

require_once __DIR__ . '/config.php';
setCorsHeaders();
handlePreflight();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        handleCheck();
        break;
    default:
        jsonResponse(400, ['error' => 'Invalid action. Use: login, logout, check']);
}

function handleLogin(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(405, ['error' => 'Method not allowed']);
    }

    $body = getJsonBody();
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    if (empty($email) || empty($password)) {
        jsonResponse(400, ['error' => 'Email and password are required']);
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT id, email, password_hash, name FROM admin_users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        jsonResponse(401, ['error' => 'Invalid email or password']);
    }

    $user = $result->fetch_assoc();
    $stmt->close();

    if (!password_verify($password, $user['password_hash'])) {
        jsonResponse(401, ['error' => 'Invalid email or password']);
    }

    // Start session and store user info
    startSession();
    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_email'] = $user['email'];
    $_SESSION['admin_name'] = $user['name'];

    jsonResponse(200, [
        'success' => true,
        'admin' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ],
    ]);
}

function handleLogout(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(405, ['error' => 'Method not allowed']);
    }

    startSession();
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );
    }

    session_destroy();
    jsonResponse(200, ['success' => true]);
}

function handleCheck(): void {
    startSession();

    if (!empty($_SESSION['admin_id'])) {
        jsonResponse(200, [
            'authenticated' => true,
            'admin' => [
                'id' => $_SESSION['admin_id'],
                'email' => $_SESSION['admin_email'],
                'name' => $_SESSION['admin_name'],
            ],
        ]);
    }

    jsonResponse(200, ['authenticated' => false]);
}
