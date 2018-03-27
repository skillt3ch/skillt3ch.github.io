
<?php
$cars = array
(
	array("Volvo",22,18),
	array("BMW",15,13),
	array("Saab",5,2),
	array("Land Rover",17,15)
);

for ($row = 0; $row < count($cars); $row++) {
	echo "<p><strong>Row number $row</strong></p>";
	echo "<ul>";
	for ($col = 0; $col < count($cars[$row]); $col++) {
		echo "<li>" . $cars[$row][$col] . "</li>";
	}
	echo "</ul>";
}
?>