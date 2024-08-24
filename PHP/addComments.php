<?php
$servername = "localhost";
$username = "christs0_christine";
$password = "Gu(OA}1HXWL(";
$dbname = "christs0_blog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Escape and sanitize input data
$postId = intval($_POST['postId']);
$user = $conn->real_escape_string($_POST['username']);
$date = $conn->real_escape_string($_POST['today']);
$comment = $conn->real_escape_string($_POST['commentinput']);

// Prepare SQL statement
$sql = "INSERT INTO comments (postId, user, date, comment)
        VALUES ('$postId', '$user', '$date', '$comment')";

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
