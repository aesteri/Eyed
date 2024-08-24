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
    '\"body\": \"', body, '\", ',
    '\"picture\": ',
    IF(img1 IS NULL AND img2 IS NULL AND img3 IS NULL AND img4 IS NULL AND img5 IS NULL,
        '[]', 
        CONCAT('[', 
            CONCAT_WS(',', 
                IF(img1 IS NOT NULL, CONCAT('\"', img1, '\"'), NULL),
                IF(img2 IS NOT NULL, CONCAT('\"', img2, '\"'), NULL),
                IF(img3 IS NOT NULL, CONCAT('\"', img3, '\"'), NULL),
                IF(img4 IS NOT NULL, CONCAT('\"', img4, '\"'), NULL),
                IF(img5 IS NOT NULL, CONCAT('\"', img5, '\"'), NULL)
            ),
            ']'
        )
    ),
    ', ',
    '\"date\": \"', date, '\", ', '\"link\": \"', link, '\"}') AS json_data
FROM projects";


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
