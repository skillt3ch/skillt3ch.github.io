<?php

$arr = array("red", "yellow", "pink", "green", "purple", "orange", "blue");

foreach($arr as $colour) {
	echo "$colour <br />";
}

echo "<br/>";

$age = array("Pete"=>"32", "Adam"=>"18", "Joe"=>"40", "Mark"=>"46");

// Sort array by value in ascending order
asort($age);

foreach($age as $x => $x_value) {
	echo "$x is $x_value years old<br/>";
}

echo "<br/>";

foreach($_SERVER as $x => $x_value) {
	echo "$x: $x_value<br/>";
}

?>