<?php

$name  = trim(htmlspecialchars(addslashes($_POST['name'])));
$phone = trim(htmlspecialchars(addslashes($_POST['phone'])));
$email  = trim(htmlspecialchars(addslashes($_POST['email'])));
$message = trim(htmlspecialchars(addslashes($_POST['message'])));

$to = "office@asvkainz.com";
$subject = "Antwort von ASV Kainz";
$text = " Name: " . $name . "\r\n Telefon: " . $phone . "\r\n E-mail: " . $email  . "\r\n Nachricht: " . $message;


$from = "Kontaktformular";
$headers = "From:" . $from . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

if(@mail($to,$subject,$text,$headers))
{
	echo "OK";
	exit;
} else {
	echo "Fehler, versuchen Sie es später noch einmal!";
	exit;
}
