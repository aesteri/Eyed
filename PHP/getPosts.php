<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
    '\"picture\": ',
    IF(image1 IS NULL AND image2 IS NULL AND image3 IS NULL AND image4 IS NULL AND image5 IS NULL,
        '[]', 
        CONCAT('[', 
            CONCAT_WS(',', 
                IF(image1 IS NOT NULL, CONCAT('\"', image1, '\"'), NULL),
                IF(image2 IS NOT NULL, CONCAT('\"', image2, '\"'), NULL),
                IF(image3 IS NOT NULL, CONCAT('\"', image3, '\"'), NULL),
                IF(image4 IS NOT NULL, CONCAT('\"', image4, '\"'), NULL),
                IF(image5 IS NOT NULL, CONCAT('\"', image5, '\"'), NULL)
            ),
            ']'
        )
    ),
    ', ',
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