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
$sql = "SELECT 
CONCAT('{\"header\": \"', title, '\", ',
    '\"body\": [\"', REPLACE(body, 'AAAA', '\", \"'), '\"], ',
    '\"picture\": [\"', image1, '\", \"', image2, '\", \"', image3, '\", \"', image4, '\", \"', image5, '\"], ',
    '\"date\": \"', date, '\", ', '\"tag\": \"', tag, '\"}') AS json_data
FROM posts";


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Array to hold the JSON data
    $jsonArray = array();

    // Fetch data from each row and push to the array
    while ($row = $result->fetch_assoc()) {
        // Decode the JSON-like string to convert it to an array
        $jsonData = json_decode($row['json_data'], true);
        // Push the decoded JSON data to the array
        array_push($jsonArray, $jsonData);
    }

    // Encode the array to JSON format and echo it
    echo json_encode($jsonArray);
} else {
    echo "0 results";
}

$conn->close();
?>