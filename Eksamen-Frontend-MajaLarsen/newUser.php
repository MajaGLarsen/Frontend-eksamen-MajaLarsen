    <!------------------------------
            Start session
            connection to database
    ------------------------------->
<?php 
    session_start(); 

    $conn = new mysqli("mlsdesign.dk.mysql", "mlsdesign_dkfarminggame", "farminggame123", "mlsdesign_dkfarminggame");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styling/css/main.css">
    <title>Document</title>
</head>
<body id="frontpageBody">  


    <form action="newUser.php" method="post">
        <!------------------------------
            Create new user form
        ------------------------------->
        <?php 
            //function to validate if the user already exists in database, from playername
            function exists($name, $c)
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
        <input type="hidden" id="avatardata" name="avatardata", value="50">
        <?php
            /*------------------------------------
                Request to database on submit
            -----------------------------------*/
            if($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                //Create (from crud) - runs when create button is clicked
                if($_REQUEST['knap'] == "create")
                {
                    $playerid = $_REQUEST['playerid'];
                    $firstname = $_REQUEST['firstname'];
                    $lastname = $_REQUEST['lastname'];
                    $email = $_REQUEST['email'];
                    $password = $_REQUEST['password'];
                    $password2 = $_REQUEST['password2'];
                    $playername = $_REQUEST['playername'];
                    $avatar = $_REQUEST['avatardata'];
                    //If player doesn't exist in database already, run code to create new user
                    if(!exists($playername, $conn)) //Create new user
                    {
                        if($password == $password2) { //passwords need to match
                            $sql = $conn->prepare("insert into players (firstname, lastname, email, password, password2, playername, avatar) values (?, ?, ?, ?, ?, ?, ?)");
                            $sql->bind_param("sssssss", $firstname, $lastname, $email, $password, $password2, $playername, $avatar);
                            $sql->execute();
                            //Create personal highscore table for playername, scoredata, score and id(rank)
                            $tableName = $playername . "scoretable";
                            $sql = $conn->prepare("CREATE TABLE `".$tableName."` (playername VARCHAR(50), scoreDate VARCHAR(50), score INT, id INT)"); //spørgsmålstegn, fordi den er specifik for hver bruger, så man kan ikke give dem et navn 
                            $sql->execute();
                            //Create 10 rows to store a maximum of 10 highscores
                            for($i = 1; $i < 11; $i++){
                                $emptyScoreDate = "none";
                                $emptyScore = 0;
                                $sql = $conn->prepare("insert into $tableName (playername, scoreDate, score, id) values (?, ?, ?, ?)"); //spørgsmålstegn, fordi den er specifik for hver bruger, så man kan ikke give dem et navn 
                                $sql->bind_param("ssii", $playername, $emptyScoreDate, $emptyScore, $i); 
                                $sql->execute();
                            }
                            //if users is created, send to index.php to login 
                            echo "<script> window.location.href = 'index.php'; </script>";
                            //header("Location: http://mlsdesign.dk/FrontendMajaLarsen/index.php");
                        } else {
                            $fejltekst = "Passwords don't match";
                            $tekstfarve = "#ff0000";
                        }
                    }
                    else //If the playername already exists
                    {
                        $fejltekst = "Player name $playername already exists";
                        $tekstfarve = "#ff0000";
                    }
                }
            }
        ?>

        <?php //closing connection to database
            $conn->close();
        ?>

        <!------------------------------
            Actual new user form
        ------------------------------->
        <div class="newUserForm">
            <h2>Create New User</h2>
            <div class="inputFields">
                <div>
                    <input type="text" name="firstname" placeholder="First name" value="<?php echo isset($firstname) ? $firstname : '' ?>">
                    <input type="text" name="lastname" placeholder="Last name" value="<?php echo isset($lastname) ? $lastname : '' ?>">
                    <input type="text" name="email" placeholder="Email" value="<?php echo isset($email) ? $email : '' ?>">
                    <input type="password" name="password" placeholder="Password" value="<?php echo isset($password) ? $password : '' ?>">
                    <input type="password" name="password2" placeholder="Repeat password" value="<?php echo isset($password) ? $password : '' ?>">
                    <p style="color: <?php echo $tekstfarve ?>"> <?php echo $fejltekst ?></p>
                </div>
                <div>
                    <input type="text" name="playername" placeholder="Player name" value="<?php echo isset($playername) ? $playername : '' ?>">
                    <div class="avatars">
                        <!-- Choose avatar -->
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
            <!-- Create new user button, and cancel to go back to index.php -->
            <div class="newUserButton">
                <button class="cancelNewUser"><a href="index.php">Cancel</a></button>
                <input type="submit" name="knap" value="create" class="createNewUserBtn"<?php echo $buttonCreate ?>>
            </div>
        </div>
    </form>

    <!------------------------------
           Javascript for avatars
    ------------------------------->
    <script src="newUser.js"></script>
</body>
</html>