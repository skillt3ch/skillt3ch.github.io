<?php
$x = 10;
$name = "php";

function myTest(){
	$x = 5;
	echo "<p>inner x variable = $x</p>";
}

myTest();
echo "<p>outer x variable = $x</p>";

echo "<p>crypt() of " . $name . ": " . crypt($name) . "</p>";
echo "<p>md5 of " . $name . ": " . md5($name) . "</p>";

?>