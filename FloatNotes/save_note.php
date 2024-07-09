<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$content = $conn->real_escape_string($data['content']);
$positionTop = (int)$data['positionTop'];
$positionLeft = (int)$data['positionLeft'];

$sql = "INSERT INTO notes (content, position_top, position_left) VALUES ('$content', $positionTop, $positionLeft)";
if ($conn->query($sql) === TRUE) {
    $id = $conn->insert_id;
    echo json_encode(['success' => true, 'id' => $id]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}

$conn->close();