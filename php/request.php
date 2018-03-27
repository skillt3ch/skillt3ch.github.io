<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = $_REQUEST['fname'];
	if(empty($name)) {
		echo "Name is empty.";
	}
	echo $name;
}

echo "<br/><br/>";

foreach($_REQUEST as $x=>$x_val) {
	echo "$x: $x_val<br/>";
}

?>