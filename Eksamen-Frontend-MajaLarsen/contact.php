<?php 
    /*-------------------------------
            Start session
            Connection to database
    -------------------------------*/
    session_start(); 
    $playernameGlobal = $_GET["playername"];

    $conn = new mysqli("mlsdesign.dk.mysql", "mlsdesign_dkfarminggame", "farminggame123", "mlsdesign_dkfarminggame");

    //logged in data from playername
    $sql = $conn->prepare( "select * from players where playername = ?");
    $sql->bind_param("s", $playernameGlobal); 
    $sql->execute();
    $result = $sql->get_result();
    if($result->num_rows > 0) 
    {
        $row = $result->fetch_assoc();
        $email = $row['email'];
        $playerAvatar = $row['avatar'];
    }
?>

<!-- HTML START -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styling/css/main.css">
    <title>Contact Us</title>
</head>
<body id="contactPageBody">
    <!-- Navbar -->
    <div class="navbar">
        <div class="navLeft">
            <a href="game.php"><img src="img/logoMyFarm.png" alt="logo My farm" class="navLogo"></a>
        </div>
        <div class="burgerbars" id="burgerBars">
            <img id="burgerImg" src="img/burgerbars.png" alt="burgerBars">
        </div>
        <ul class="navRight" id="navRight">
            <li><a href="<?php echo "game.php?playername=$playernameGlobal"?>">Game</a></li>
            <li><a href="<?php echo "about.php?playername=$playernameGlobal"?>">About</a></li>
            <li><a href="<?php echo "contact.php?playername=$playernameGlobal"?>" id="currentpage">Contact</a></li>
            <li><a href="<?php echo "myProfile.php?playername=$playernameGlobal"?>"><img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="myProfile"></a></li>
            <li><a href="<?php echo "logOut.php?playername=$playernameGlobal"?>"><img src="img/logOutButton.png" alt="logOut"></a></li>
        </ul>
    </div>

    <!-- Contact Page with conctact form-->
    <div class="contactPage">
        <div class="contactContainer">
            <div class="contactForm">
                <h2>Contact us!</h2>
                <input type="text" placeholder="Input your email" value="<?php echo $email; ?>"> <!--Inddrag Read fra crud her, den skal automatisk læse brugerens email-->
                <input type="text" placeholder="Emne">
                <textarea name="subject" placeholder="Besked ... "></textarea>
                <input class="sendButton" type="submit" value="Send">
            </div>
            <div class="contactImg"></div>
        </div>
        
        <!--------------------------
                    Footer
        --------------------------->
        <footer>
            <div class="footerFence"></div>
            <div class="footerDiv">
                <img src="img/logoMyFarm.png" alt="MyFarm logo">
                <p>&copy; Maja Larsen</p>
            </div>
        </footer>
    </div>

    <!--------------------------
            Javascript
    --------------------------->
    <script src="game.js"></script>
    <script src="navbar.js"></script>
</body>
</html>