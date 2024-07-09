<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floating Notes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <button id="addNoteBtn">Add Note</button>
    <div id="noteContainer">
        <?php
        // Include the database connection
        include 'db.php';

        // Fetch notes from the database
        $result = $conn->query("SELECT * FROM notes");
        while ($row = $result->fetch_assoc()) {
            $content = htmlspecialchars($row['content'], ENT_QUOTES, 'UTF-8');
            echo "<div class='note' data-id='{$row['id']}' style='top: {$row['position_top']}px; left: {$row['position_left']}px;'>
                    <textarea>$content</textarea>
                  </div>";
        }
        ?>
    </div>
    <script src="script.js"></script>
</body>
</html>
