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
$postId = mysqli_real_escape_string($conn, $_POST['postId']);
$user = mysqli_real_escape_string($conn, $_POST['username']);
$date = mysqli_real_escape_string($conn, $_POST['today']);
$comment = mysqli_real_escape_string($conn, $_POST['commentinput']);

$sql = "INSERT INTO Users (postId, user, date, comment)
VALUES ('$postId', '$user', '$date', '$comment)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>