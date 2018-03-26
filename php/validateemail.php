<?php
$email = "jvk.alpha@gmail.com";
$validate = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($validate) {
	echo "Email (" . $email . ") is valid.\n\n";
} else {
	echo "Email (" . $email . ") is NOT valid!\n\n";
}
?>