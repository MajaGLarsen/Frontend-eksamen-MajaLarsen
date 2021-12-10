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
    <title>About Us</title>
</head>
<body  id="contactPageBody">
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
            <li><a href="<?php echo "about.php?playername=$playernameGlobal"?>" id="currentpage">About</a></li>
            <li><a href="<?php echo "contact.php?playername=$playernameGlobal"?>">Contact</a></li>
            <li><a href="<?php echo "myProfile.php?playername=$playernameGlobal"?>"><img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="myProfile"></a></li>
            <li><a href="<?php echo "logOut.php?playername=$playernameGlobal"?>"><img src="img/logOutButton.png" alt="logOut"></a></li>
        </ul>
    </div>


    <!-- About page - pictures and text -->
    <div class="aboutPage">
        <div class="aboutMasthead"></div>
        <div class="aboutSection">
        <h1>Live out your farm dream in MyFarm</h1>
            <h2>Your farm!</h2>
            <p>Live out your farm dream on your new farm. Harvest your different types of crops, feed and take care of your chickens and sleep inside of your house. But be aware of the tractor!</p>
            <img src="img/gameFrontPage.png" alt="Picture of farming game">
        </div>
        <div class="aboutSection">
            <h2>Visit your home and chicken coop</h2>
            <p>Remember to take good care of your chickens in your chicken coop and yourself inside your home</p>
            <img src="img/aboutGameInsideAndCoop.png" alt="Pictures of inside coop and home">
        </div>
        <?php 
            //Get the data from database to show all time highscores
            $sql = $conn->prepare( "select * from highscores");
            $sql->execute();
            $result = $sql->get_result();
            //If there is any data, show data
            if($result->num_rows > 0)
            {
                echo "<div class='allTimeHighscores'>";
                    echo "<h2>All time highscores</h2>";
                    while($row = $result->fetch_assoc()) {
                        echo "<div class='allTimeHighscoreRow'>";
                            echo "<p>" . $row["id"] . "</p>";
                            echo "<p>" . $row["playername"] . "</p>";
                            echo "<p>" . $row["score"] . "</p>";
                            echo "<p>" . $row["scoreDate"] . "</p>";
                        echo "</div>";
                    }
                echo "</div>";
            }
        ?>
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

        <!--------------------------
                Javascript
        --------------------------->
    <script src="game.js"></script>
    <script src="navbar.js"></script>
</body>
</html>