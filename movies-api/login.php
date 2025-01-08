<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json');

// Read and decode JSON input
$input = file_get_contents('php://input'); 
$data = json_decode($input, true);

// Validate input
$user_username = $data['username'] ?? null;
$user_password = $data['password'] ?? null;

if (!$user_username || !$user_password) {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "movies_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

// Query database
$sql = "SELECT * FROM users WHERE korisnicko_ime='$user_username' AND sifra='$user_password'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Login successful.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
}

$conn->close();
?>



