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
$title = $conn->real_escape_string($_POST['title']);
$body = $conn->real_escape_string($_POST['body']);
$image1 = isset($_POST['image1']) && $_POST['image1'] !== 'null' ? "'" . $conn->real_escape_string($_POST['image1']) . "'" : 'NULL';
$image2 = isset($_POST['image2']) && $_POST['image2'] !== 'null' ? "'" . $conn->real_escape_string($_POST['image2']) . "'" : 'NULL';
$image3 = isset($_POST['image3']) && $_POST['image3'] !== 'null' ? "'" . $conn->real_escape_string($_POST['image3']) . "'" : 'NULL';
$image4 = isset($_POST['image4']) && $_POST['image4'] !== 'null' ? "'" . $conn->real_escape_string($_POST['image4']) . "'" : 'NULL';
$image5 = isset($_POST['image5']) && $_POST['image5'] !== 'null' ? "'" . $conn->real_escape_string($_POST['image5']) . "'" : 'NULL';
$date = $conn->real_escape_string($_POST['date']);
$link = $conn->real_escape_string($_POST['link']);

// Prepare SQL statement
$sql = "INSERT INTO projects (title, body, img1, img2, img3, img4, img5, date, link)
        VALUES ('$title', '$body', $image1, $image2, $image3, $image4, $image5, '$date', '$link')";

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
