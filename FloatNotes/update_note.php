<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = (int)$data['id'];
$content = $conn->real_escape_string($data['content']);
$positionTop = (int)$data['positionTop'];
$positionLeft = (int)$data['positionLeft'];

$sql = "UPDATE notes SET content='$content', position_top=$positionTop, position_left=$positionLeft WHERE id=$id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $conn->error]);
}

$conn->close();