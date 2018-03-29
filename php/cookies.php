<?php
$cookie_name = "user";
$cookie_value = "John Doe";

// setcookie syntax: setcookie(name, value, expire, path, domain, secure, httponly);

setcookie($cookie_name, $cookie_value, time() + 86400 * 30, "/"); // 86400 seconds = 1 day: therefore keep cookie for 30 days
?>

<html>
	<body>
		<?php
		if(!isset($_COOKIE[$cookie_name])) {
			echo "Cookie named '" . $cookie_name . "' is not set!";
		} else {
			echo "Cookie '" . $cookie_name . "' is set!<br>";
			echo "Value is: " . $_COOKIE[$cookie_name];
		}
		?>
	</body>
</html>