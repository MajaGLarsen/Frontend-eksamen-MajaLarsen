<?php 
    /*-------------------------------
            Start session
            Connection to database
    -------------------------------*/
    session_start(); 
    
    $conn = new mysqli("mlsdesign.dk.mysql", "mlsdesign_dkfarminggame", "farminggame123", "mlsdesign_dkfarminggame");


    $playernameGlobal = $_GET["playername"];

    $playerAvatar = $_REQUEST['avatardata'];
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
    <title>My Profile</title>
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
            <li><a href="<?php echo "about.php?playername=$playernameGlobal"?>">About</a></li>
            <li><a href="<?php echo "contact.php?playername=$playernameGlobal"?>">Contact</a></li>
            <li><a href="<?php echo "myProfile.php?playername=$playernameGlobal"?>" id="currentpage"><img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="myProfile"></a></li>
            <li><a href="<?php echo "logOut.php?playername=$playernameGlobal"?>"><img src="img/logOutButton.png" alt="logOut"></a></li>
        </ul>
    </div>


    <!-------------------------------
            My profile form
    -------------------------------->    
    <form action="<?php echo "myProfile.php?playername=$playernameGlobal"?>" method="post" class="myProfileForm">
        <!-- No display of pop up elements - update profile and confirm delete pop ups -->
        <?php
            $displayUpdateProfile = "none"; 
            $confirmDelete = "none";

            //function to validate if the user already exists in database, from playername
            function findes($name, $c)
            {
                $sql = $c->prepare("select * from players where playername = ?");
                $sql->bind_param("s", $name);
                $sql->execute();
                $result = $sql->get_result();
                if($result->num_rows > 0)
                {
                    return true;
                }
                else 
                {
                    return false;
                }
            }
        ?>

        <?php
            /*------------------------------------
                Request to database on submit
            -----------------------------------*/
            if($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                //Runs if form is submitted and click on "update profile" button
                //Read functionality from CRUD
                if($_REQUEST['knap'] == "Update Profile")
                {
                    $sql = $conn->prepare( "select * from players where playername = ?");
                    $sql->bind_param("s", $playernameGlobal); 
                    $sql->execute();
                    $result = $sql->get_result();
                    if($result->num_rows > 0) //If there's data, read the variables
                    {
                        $row = $result->fetch_assoc();
                        $firstname = $row['firstname'];
                        $lastname = $row['lastname'];
                        $email = $row['email'];
                        $password = $row['password'];
                        $password2 = $row['password2'];
                        $avatar = $row['avatar'];
                        $displayUpdateProfile = "flex";
                    }
                    else //If the player has reached the site, but not logged in correctly
                    {
                        $fejltekst = "Player nummer $playernameGlobal findes ikke";
                        $tekstfarve = "#ff0000";
                    } 
                }
                //update from CRUD
                if($_REQUEST['knap'] == "Update") 
                {
                    $firstname = $_REQUEST['firstname'];
                    $lastname = $_REQUEST['lastname'];
                    $email = $_REQUEST['email'];
                    $password = $_REQUEST['password'];
                    $password2 = $_REQUEST['password2'];
                    $avatar = $_REQUEST['avatardata'];
                    $playerAvatar = $avatar;
                    if(findes($playernameGlobal, $conn)) //Updates the new information in the database
                    {
                        $sql = $conn->prepare("update players set firstname = ?, lastname = ?, email = ?, password = ?, password2 = ?, avatar = ? where playername = ?");
                        $sql->bind_param("sssssss", $firstname, $lastname, $email, $password, $password2, $avatar, $playernameGlobal);
                        $sql->execute();
                        $displayUpdateProfile = "none";        
                    }
                    else //If the player has reached the site, but not logged in correctly
                    {
                        $fejltekst = "Player name $playername findes ikke";
                        $tekstfarve = "#ff0000";
                    }
                }
                
                //Runs delete - opens the validation on delete - click execute or cancel
                if($_REQUEST['knap'] == "Delete Profile")
                {
                    $_SESSION["playerTilDelete"] = $playerid;
                    $buttonExecute = "";
                    $buttonCancel = "";
                    $confirmDelete = "flex";
                }
                //Execute - confirm delete
                if($_REQUEST['knap'] == "Execute")
                {
                    //delete player
                    $sql = $conn->prepare("delete from players where playername = ?");
                    $sql->bind_param("s", $playernameGlobal);
                    $sql->execute();
                    //drop player scoretable from database if player is deleted
                    $tableName = $playernameGlobal . "scoretable";
                    $sql = $conn->prepare("DROP TABLE `".$tableName."`");
                    $sql->execute();
                    // Leads the user back to index.php to login or create new user
                    echo "<script> window.location.href = 'index.php'; </script>";
                    //header("Location: http://mlsdesign.dk/FrontendMajaLarsen/index.php");
                }
                //cancel - Clears the input fields for user and closes the pop up
                if($_REQUEST['knap'] == "cancel")
                {
                    $playerid = "";
                    $firstname = "";
                    $lastname = "";
                    $email = "";
                    $password = "";
                    $password2 = "";
                    $playername = "";
                    $avatar = "";
                    $fejltekst = "Delete cancelled";
                    $tekstfarve = "#000000";
                    $confirmDelete = "none";
                }
            }        
        ?>
        <input type="hidden" id="avatardata" name="avatardata", value="duck.png">

        <?php 
            //Get the players highest score to show. Rank (id) 1
            $tableName = $playernameGlobal . "scoretable";
            $sql = $conn->prepare("select * from $tableName where playername = ?");
            $sql->bind_param("s", $playernameGlobal);
            $sql->execute();
            $result = $sql->get_result();
            
        
            if($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $playerHighScore = $row['score'];
            }

        ?>
        
    <!--------------------------
            My Profile page
    --------------------------->
    <div class="myProfilePage">
        <div class="myProfile">
            <div class="myProfileLeft">
                <!-- Avatars -->
                <img src="<?php echo 'avatars/' . $playerAvatar; ?>" alt="Your Avatar">
            </div>
            <!-- Profile information -->
            <div class="myProfileRight">
                <h3>Your profile</h3>
                <p><i>Your highscore:</i> <?php echo $playerHighScore?> </p>
                <p><i>Your email:</i> <?php echo $email ?></p>
                <p><i>Your player name:</i> <?php echo $playernameGlobal ?> </p>
                <input type="submit" value="Update Profile" name="knap" id="updateProfileBtn" class="grayButton"<?php echo $buttonRead ?>><!-- Isset i php tjekker om følgende har en værdi -->
                <input type="submit" value="Delete Profile" name="knap" class="redButton" id="deleteProfileBtn"<?php echo $buttonDelete ?>>
                <p style="color: <?php echo $tekstfarve ?>"><?php echo $fejltekst ?> </p> 
            </div>
        </div>
        <?php 
            // Show personal scoretable
            $tableName = $playernameGlobal . "scoretable";
            $sql = $conn->prepare("select * from $tableName");
            $sql->execute();
            $result = $sql->get_result();
            // If there's data, show the users personal highscore
            if($result->num_rows > 0)
            {
                echo "<div class='yourHighscore'>";
                echo "<h2>Your highscores</h2>";
                    echo "<div class='yourEveryHighscore'>";
                        echo "<p class='yourEveryHighscoreRank'><b>Rank</b></p>";
                        echo "<p class='yourEveryHighscoreScore'><b>Highscore</b></p>";
                        echo "<p class='yourEveryHighscoreDate'><b>Date</b></p>";
                    echo "</div>";
                while($row = $result->fetch_assoc())
                {
                    echo "<div class='yourEveryHighscore'>";
                        echo "<p class='yourEveryHighscoreRank'>" . $row["id"] . "</p>";
                        echo "<p class='yourEveryHighscoreScore'>" . $row["score"] . "</p>";
                        echo "<p class='yourEveryHighscoreDate'>" . $row["scoreDate"] . "</p>";
                    echo "</div>";
                }
                echo "</div>";
            }
        ?>
        
        

        <!---------------------------
            Update profile pop up 
        ---------------------------->
        <div class="updateProfile" id="updateProfile" style="display: <?php echo $displayUpdateProfile ?>">
            <h2>Update profile information</h2>
            <div class="updateProfile-inputFields">
                <div>
                    <input type="text" name="firstname" placeholder="First name" value="<?php echo isset($firstname) ? $firstname : '' ?>">
                    <input type="text" name="lastname" placeholder="Last name" value="<?php echo isset($lastname) ? $lastname : '' ?>">
                    <input type="text" name="email" placeholder="Email" value="<?php echo isset($email) ? $email : '' ?>">
                    <input type="password" name="password" placeholder="New password" value="<?php echo isset($password) ? $password : '' ?>">
                    <input type="password" name="password2" placeholder="Repeat new password" value="<?php echo isset($password) ? $password : '' ?>">
                </div>
                <div>
                    <!-- shows all the avatars -->
                    <div class="avatars">
                        <h3>Choose Avatar</h3>
                        <div class="imgContainers">
                            <img src="avatars/cat.png" alt="Cat" name="cat.png" id="catAvatar">
                            <img src="avatars/sheep.png" alt="Sheep" name="sheep.png" id="sheepAvatar">
                            <img src="avatars/pig.png" alt="Pig" name="pig.png" id="pigAvatar">
                            <img src="avatars/cow.png" alt="Cow" name="cow.png" id="cowAvatar">
                        </div>
                        <div class="imgContainers">
                            <img src="avatars/duck.png" alt="Duck" name="duck.png" id="duckAvatar" >
                            <img src="avatars/rabbit.png" alt="Rabbit" name="rabbit.png" id="rabbitAvatar">
                            <img src="avatars/chicken.png" alt="Chicken" name="chicken.png" id="chickenAvatar">
                            <img src="avatars/horse.png" alt="Horse" name="horse.png" id="horseAvatar">
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- Update button -->
            <p style="color: <?php echo $tekstfarve ?>"><?php echo $fejltekst ?> </p>
            <input type="submit" value="Update" name="knap"<?php echo $buttonUpdate ?>>
        </div>


        <!-- Delete profile pop up.. Choose to cancel or execute. -->
        <div class="deleteProfile" style="display:<?php echo $confirmDelete; ?>">
            <h2>Delete Profile</h2>
                <div class="confirmDeleteProfile">
                    <input type="submit" value="Cancel" name="knap" class="grayButton"<?php echo $buttonCancel ?>>
                    <input type="submit" value="Execute" name="knap" class="redButton"<?php echo $buttonExecute ?> >
                </div>
        </div>
        
        <?php 
        //Jeg lukker forbindelsen til databasen, af sikkerhedsmæssige årsager
            $conn->close();
        ?>
    </form>


    
    <!---------------------------
                Footer 
    ---------------------------->
    <footer>
        <div class="footerFence">
        </div>
        <div class="footerDiv">
            <img src="img/logoMyFarm.png" alt="MyFarm logo">
            <p>&copy; Maja Larsen</p>
        </div>
    </footer>

    <!---------------------------
            Javascript 
    ---------------------------->    
    <script src="myProfile.js"></script>
    <script src="navbar.js"></script>
</body> 
</html>