<!-- Start session -->
<?php 
    session_start();
    //Connection to database
    $conn = new mysqli("mlsdesign.dk.mysql", "mlsdesign_dkfarminggame", "farminggame123", "mlsdesign_dkfarminggame");
    $action = false;
?>  

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styling/css/main.css">
    <title>MyFarm Farming game</title>
</head>
<body id="frontpageBody">
    <!------------------------------
            Login form
    ------------------------------->
    <form class="loginForm" method="post">
        <?php 
            if($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                //Login, if login button is pressed
                //Request to database, to see if playername and password match and exists in database
                if($_REQUEST['knap'] == "login")
                {
                    $playername = $_REQUEST['playername'];
                    $passwordInput = $_REQUEST['passwordInput'];
                    if($playername != "")
                    {   //If there's input in the input field, check if password matches
                        $sql = $conn->prepare( "select * from players where playername = ?");
                        $sql->bind_param("s", $playername); 
                        $sql->execute();
                        $result = $sql->get_result();
                        if($result->num_rows > 0) 
                        {
                            $row = $result->fetch_assoc();
                            $password = $row['password'];
                            if($passwordInput == $password) 
                            {
                                $action = true; //sends the user to game.php - now logged in
                                $_SESSION['playername'] = $playername;
                                $fejltekst = "Logging you in!";
                                $tekstfarve = "#000000";
                                
                                echo "<script> window.location.href = 'game.php?playername=$playername'; </script>";
                                //header("Location: http://mlsdesign.dk/FrontendMajaLarsen/game.php");
                            }
                            else {
                                $fejltekst = "Incorrect playername or password";
                                $tekstfarve = "#000000";
                            }
                        }
                        else //if it doesn't match, tell user
                        {
                            $fejltekst = "Playernavn doesn't exist";
                            $tekstfarve = "#ff0000";
                        }
                    } 
                    else //If user clicks login without input
                    {
                        $fejltekst = "Please enter your account information";
                        $tekstfarve = "#ff0000";
                    }
                }
            }
        ?>

        <!------------------------------
                Actual login form
        ------------------------------->
        <img src="img/logoMyFarmBrown.png" alt="My Farm logo" class="frontPageLogo">
        <input type="text" name="playername" placeholder="Player name" value="<?php echo isset($playername) ? $playername : '' ?>">
        <input type="password" name="passwordInput" placeholder="Password" value="<?php echo isset($passwordInput) ? $passwordInput : '' ?>">
        <div class="loginErrorMessage"></div>

        <span style="color: <?php echo $tekstfarve ?>"><?php echo $fejltekst ?> </span>
        <input class="loginForm__buttonLogin" type="submit" name="knap" value="login" <?php echo $buttonLogin ?>>
        <p>Not registeret? Create <a href="newUser.php">new user</a></p>
    </form>

    <?php 
        //connection to database closed
        $conn->close();
    ?>


    
</body>
</html>