<?php
define("APPPATH", "./lib/src/");
include APPPATH . "DSNConfigurator.php";
include APPPATH . "PHPMailer.php";
include APPPATH . "Exception.php";
include APPPATH . "OAuthTokenProvider.php";
include APPPATH . "OAuth.php";
include APPPATH . "POP3.php";
include APPPATH . "SMTP.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\Test\PHPMailer\SetFromTest;

if(isset($_POST['action'])) {
    $receiver = $_POST['receiver'];
    $subject = $_POST['subject'];
    $message = $_POST['message']; //#2 
    $mail = new PHPMailer;
    $mail->isSMTP(); 
    //Enable SMTP debugging 
    // SMTP::DEBUG_OFF = off (for production use) 
    // SMTP::DEBUG_CLIENT = client messages 
    // SMTP::DEBUG_SERVER = client and server messages 
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587; 
      //Set the encryption mechanism to use - STARTTLS or SMTPS 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true; 
      //Username to use for SMTP authentication - use full email address for gmail 
    $mail->Username = 'ankhanh17200@gmail.com';
    $mail->Password = 'zlndooqgupspvstk'; 
      // sử dụng mật khẩu ứng dụng 
    $mail->FromName = "Send Mail"; 
      //#3 
    $mail->setFrom($receiver); 
    $mail->addAddress('ankhanh17200@gmail.com'); 
    $mail->Subject = $subject; 
    $mail->msgHTML($message); 
      //#4 
    if (!$mail->send()) 
    { $error = "Error: " . 
        $mail->ErrorInfo; 
        echo '<p>'.$error.'</p>'; 
    } else { 
        echo '<p>Send!</p>'; 
    }
}
?>