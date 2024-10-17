<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format. Please try again.";
        exit; // Stop further processing
    }

    // Email recipient
    $to = "justyn@africanmotion.co.za"; // Change to your email address

    // Email subject
    $email_subject = "New Contact Form Submission: $subject";

    // Email body
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Redirect with a success message (if applicable)
        header("Location: contact.html?success=1");
        exit();
    } else {
        // Redirect with an error message (if applicable)
        header("Location: contact.html?error=1");
        exit();
    }
} else {
    echo "Invalid request.";
}
?>
