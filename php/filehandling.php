<?php

// READING FILES

// echo readfile("dict.txt");

$myfile = fopen("dict.txt", "r") or die("Unable to open file!");
echo fread($myfile, filesize("dict.txt"));
fclose($myfile);

echo "<br><br>";

// Output one line at a time until end of file

$myfile = fopen("dict.txt", "r") or die("Unable to open file!");
while(!feof($myfile)) {
	echo fgets($myfile) . "<br>";
}
fclose($myfile);

echo "<br><br>";

// Output one character at a time until end of file

$myfile = fopen("dict.txt", "r") or die("Unable to open file!");
while(!feof($myfile)) {
	echo fgetc($myfile);
}
fclose($myfile);

// WRITING FILES

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $txt);
$txt = "Jane Doe\n";
fwrite($myfile, $txt);
fclose($myfile);

?>