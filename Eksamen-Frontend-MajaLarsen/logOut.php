<?php
    // Initialize the session.
    // If you are using session_name("something"), don't forget it now!
    session_start();

    // Unset all of the session variables.
    $_SESSION = array();

    // Finally, destroy the session.
    session_destroy();

    // Redirect to logIn page.
    echo "<script> window.location.href = 'index.php'; </script>";
    //header("location: http://mlsdesign.dk/FrontendMajaLarsen/index.php");
?>