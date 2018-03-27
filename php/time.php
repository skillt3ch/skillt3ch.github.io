<?php
echo "Current time: " . date("h:i:s a") . "<br/>";

$tomorrow = strtotime("tomorrow");

echo "Tomorrow: " . date("l, d M Y", $tomorrow) . "<br/>";

$nextsaturday = strtotime("next saturday");

echo "Next Saturday: " . date("l, d M Y", $nextsaturday) . "<br/>";

$sixweeks = strtotime("+6 weeks");

echo "In 6 weeks, the date will be: " . date("l, d M Y", $sixweeks) . "<br/>";

$startdate = strtotime("saturday");
$enddate = strtotime("+6 weeks", $startdate);

echo "<h2>Calculate dates of next 6 Saturdays from this Saturday</h2>";

echo "<ul>";
while ($startdate < $enddate) {
	echo "<li>" . date("l d M Y", $startdate) . "</li>" ;
	$startdate = strtotime("+1 week", $startdate);
}
echo "</ul>";

echo "<h2>Caclulate days from now until April 14th</h2>";

$enddate = strtotime("April 14");
$daysremaining = ceil(($enddate - time()) / 60 / 60 / 24);

echo "<p>Time until April 14th: <strong>" . $daysremaining . "</strong> days</p>";
?>