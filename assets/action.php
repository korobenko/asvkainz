<?php

$name  = trim(htmlspecialchars(addslashes($_POST['name'])));
$phone = trim(htmlspecialchars(addslashes($_POST['phone'])));
$email  = trim(htmlspecialchars(addslashes($_POST['email'])));
$message = trim(htmlspecialchars(addslashes($_POST['message'])));

$to = "office@asvkainz.com";
$subject = "Ask from Asvkainz";
$text = " Name: " . $name . "\r\n Phone: " . $phone . "\r\n E-mail: " . $email  . "\r\n Message: " . $message;


$from = "Contact-form";
$headers = "From:" . $from . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

if(@mail($to,$subject,$text,$headers))
{
	echo "OK";
	exit;
} else {
	echo "Send error, please, try again!";
	exit;
}
