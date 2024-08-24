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

$sql = "SELECT * FROM comments";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    $data = array();
    // Fetch associative array
    while($row = $result->fetch_assoc()) {
        // Check if the postId already exists in the data array
        $postId = $row["postId"];
        if (!isset($data[$postId])) {
            // If postId doesn't exist, create a new entry with postId and an empty array for comments
            $data[$postId] = array(
                "postId" => $postId,
                "comments" => array()
            );
        }
        // Add the user and date to the comments array for the corresponding postId
        $data[$postId]["comments"][] = array(
            "user" => $row["user"],
            "date" => $row["date"],
            "comment" => $row["comment"]
        );
    }

    // Output the values of the data array as JSON
    echo json_encode(array_values($data));
} else {
    // If no rows were returned, output an empty array
    echo json_encode(array());
}

// Close the connection
$conn->close();
?>