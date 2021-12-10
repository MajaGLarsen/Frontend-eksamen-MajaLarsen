<?php 
    /*-------------------------------
            Start session
            Connection to database
    -------------------------------*/
    session_start();
    // Connection to logged in data
    $conn = new mysqli("mlsdesign.dk.mysql", "mlsdesign_dkfarminggame", "farminggame123", "mlsdesign_dkfarminggame");

    //getting logged in data
    $playernameGlobal = $_GET["playername"];
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
    <link rel="stylesheet" href="FarmingGame/gamestyle.css">
    <title>Game</title>
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
            <li><a href="<?php echo "game.php?playername=$playernameGlobal"?>" id="currentpage">Game</a></li>
            <li><a href="<?php echo "about.php?playername=$playernameGlobal"?>">About</a></li>
            <li><a href="<?php echo "contact.php?playername=$playernameGlobal"?>">Contact</a></li>
            <li><a href="<?php echo "myProfile.php?playername=$playernameGlobal"?>"><img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="myProfile"></a></li>
            <li><a href="<?php echo "logOut.php?playername=$playernameGlobal"?>"><img src="img/logOutButton.png" alt="logOut"></a></li>
        </ul>
    </div>
    
    


<form action="game.php" method="post"> 
    <?php
    /*----------------------------
        PHP form, submit score
    -----------------------------*/
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {
            //Submit score - button - activates at form submit
            if($_REQUEST['knap'] == "Submit")
            {
                //checks if current score is high enough for your own scoretable
                //If score is high enough - send to scoretable in database
                $tableName = $playernameGlobal . "scoretable";

                $sql = $conn->prepare( "select * from $tableName");
                
                $sql->execute();
                $result = $sql->get_result();
                if($result->num_rows > 0) 
                {
                    $isScoreGoodPersonal = false;
                    while($row = $result->fetch_assoc())
                    {
                        $score = $row['score'];
                        $tableName = $playernameGlobal . "scoretable";
                        if($currentScore > $row['score']) 
                        {
                            if(!$isScoreGoodPersonal){
                                $isScoreGoodPersonal = true;
                                $currentScoreToDb = $currentScore;
                                $dateToDb = date("F j, Y");
                            }
                            //Updates database if score is high enough
                            $sql = $conn->prepare("update $tableName set score = ?, scoreDate = ? where id = ?");
                            $sql->bind_param("isi", $currentScoreToDb, $dateToDb, $row['id']);
                            $sql->execute(); 

                            $currentScoreToDb = $row['score'];
                            $dateToDb = $row['scoreDate'];  
                        }
                    }
                    if($isScoreGoodPersonal == false)
                    {
                        echo "Sorry! Your score didn't make it to the top 10 leaderboard";
                    }
                }
                //checks if current score is high enough for all time highscore scoretable
                //If score is high enough - send to scoretable in database
                $sql = $conn->prepare( "select * from highscores");
                $sql->execute();
                $result = $sql->get_result();
                if($result->num_rows > 0) 
                {
                    $isScoreGoodAllTime = false;
                    while($row = $result->fetch_assoc())
                    {
                        $score = $row['score'];
                        if($currentScore > $row['score']) 
                        {
                            if(!$isScoreGoodAllTime){
                                $isScoreGoodAllTime = true;
                                $currentScoreToDb = $currentScore;
                                $dateToDb = date("F j, Y");
                                $playerNameToDb = $playernameGlobal;
                            }
                            //Updates database if highscore is high enough
                            $sql = $conn->prepare("update highscores set playername = ?, score = ?, scoreDate = ? where id = ?");
                            $sql->bind_param("sisi", $playerNameToDb, $currentScoreToDb, $dateToDb, $row['id']);
                            $sql->execute(); 

                            $currentScoreToDb = $row['score'];
                            $dateToDb = $row['scoreDate'];  
                            $playerNameToDb = $row['playername'];
                        }
                    }
                    if(!$isScoreGoodAllTime)
                    {
                        echo "Sorry! Your score didn't make it to the top 10 leaderboard";
                    }
                }
            }
        }
        ?>

        <!-- -------------------------
                Game page Html
         ---------------------------->
        <div class="gamePage">
            <div class="game">
                <div class="gameNavbar">
                    <!-- Scored points - current score-->
                    <h3>Score: <span id="points"></span></h3>
                </div>
                <!-- Game -->
                <div class="farmingGame">
                    <div class="container">
                        <div class ="center">
                         <!-- Actual game - canvas -->
                            <canvas id="canvasCoop" width="720" height="720"></canvas>
                        </div>
                    </div>
                </div>        
            </div>
            <!---------------------------- 
                Logged in player info
             ---------------------------->
            <div class="gameProfile-andButtons-Container">
                <div class="game-profileInfo">
                    <!-- Touch buttons -->
                    <div class="gameControls" id="gameControls">
                        <div>
                            <button type="button" class="controlKey" id="wBtn">W</button>
                            <button type="button"class="controlKey" id="eBtn">E</button>
                        </div>
                        <div>
                            <button type="button" class="controlKey" id="aBtn">A</button>
                            <button type="button" class="controlKey" id="sBtn">S</button>
                            <button type="button" class="controlKey" id="dBtn">D</button>
                        </div>
                    </div>
                    <!-- Player avatar -->
                    <p><?php echo $isHighscoreAHighscore . "<br/>" . "<br/>"?></p>
                    <img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="">
                    <p><?php echo $playernameGlobal ?></p>
                </div>
                <!-- Guide buttons - submit, help, highscorelist, show touch buttons -->
                <div class="gameButtons">
                    <button type="button" class="showHideKeysBtn" id="showHideKeysBtn">Show controls</button>
                    <button type="button" class="showHelpBtn" id="showHelpBtn">Help</button>
                    <button type="button" class="highscoreBtn" id="allTimeHighscorePopUpBtn">Hichscores</button>
                    <input type="submit" class="submitScoreBtn" name="knap" value="Submit" <?php echo $buttonCreate ?>>
                </div>
            </div>

            <!------------------------------- 
                All time highscore pop up
             ------------------------------->
            <?php 
            /*connection to database - If there's any data in highscore table, show data */
                $sql = $conn->prepare( "select * from highscores");
                $sql->execute();
                $result = $sql->get_result();
            
                if($result->num_rows > 0)
                {
                    echo "<div class='allTimeHighscoresPopUp' id='allTimeHighscorePopUp'>";
                        echo "<h2>All time highscores</h2>";
                        while($row = $result->fetch_assoc()) {
                            echo "<div class='allTimeHighscoreRowPopUp'>";
                                echo "<p class='allTimeRank'>" . $row["id"] . "</p>";
                                echo "<p class='allTimePlayername'>" . $row["playername"] . "</p>";
                                echo "<p class='allTimeScore'>" . $row["score"] . "</p>";
                                echo "<p class='allTimeDate'>" . $row["scoreDate"] . "</p>";
                            echo "</div>";
                        }
                        echo "<button type='button' id='closeHighscoreBtn' >Close</button>";
                    echo "</div>";
                }
            ?>

            <!------------------------------- 
                        Help pop up
             ------------------------------->   
            <div class="helpPopUp" id="helpPopUp">
                <h2>Help</h2>
                <p><b>Controls: </b><span>&#8592;</span> left, <span>&#8593;</span> up, <span>&#8594;</span> right, <span>&#8595;</span> down, e to interact</p>
                <p>Or use w, a, s, d from control keys</p>
                <p>Harvest all your crops at your harvest bags; tomato, carrots, and wheat</p>
                <p>Visit your home and your chicken coops, remember to feed your chickens</p>
                <p>Be aware of the <i>tractor</i>!</p>
                <button type="button" id="closeHelpBtn">Close Help</button>
            </div>
        </div>
    </form>

    <!------------------------------- 
                Footer
    -------------------------------->   
    <footer>
        <div class="footerFence">
        </div>
        <div class="footerDiv">
            <img src="img/logoMyFarm.png" alt="MyFarm logo">
            <p>&copy; Maja Larsen</p>
        </div>
    </footer>
    
    <!------------------------------- 
                Javascript
    --------------------------------> 
    <script src="gamePage.js"></script>
    <script type="text/javascript" src="FarmingGame/gameCoop.js" ></script>
    <script type="text/javascript" src="FarmingGame/noscroll.js" ></script>
    <script src="navbar.js"></script>
    
</body>
</html>