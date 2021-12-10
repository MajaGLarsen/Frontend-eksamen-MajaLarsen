<html>
    <head></head>

    <body>
    <!-- Standard check if there is connection to database -->
    <?php 
        $user = 'root';
        $password = 'root'; //It needs to take in a password
        $database = ''; //It needs to take in a database
        $port = NULL;
        $mysqli = new mysqli('127.0.0.1:mlsdesign.dk.mysql', $user, $password, $port); //Connection to database, The numbers are for the localhost port

        //Does it return an error or not
        if($mysqli->connect_error)
        {
            //If error
            die('Connect error (' . $mysqli->connect_errno . ' ) ' . $mysqli->connect_error);
        }
        echo '<p>Connection ok ' . $mysqli->host_info . '</p>';
        echo '<p>Server ' . $mysqli->server_info . '</p>';

        // if the server isn't open, close the connection to apache server
        $mysqli->close();

    ?>


    </body>
</html>