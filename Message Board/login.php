<html>
    <body >
        <h1>Login Page</h1><h2 >Login Page</h2>
        <form action ="" method ="post">
            UserName: <input type="text" name="Username"><br>
            Password: <input type="password" name="password" ><br><br>
                    <input type="submit" value = "Login">
        </form>
        <?php
            session_start();
            error_reporting(E_ALL);
            ini_set('display_errors','On');
            $username = $pwd = $fullname= "";

            
            function test_input($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
              }
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
              $username = test_input($_POST["Username"]);
              $pwd = md5(test_input($_POST["password"]));         
            }
            try {
              $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board","root","moon2far1!",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));              
              $dbh->beginTransaction();             

              $stmt = $dbh->prepare('select * from users');
              $stmt->execute();
              
              print "<pre>";
              while ($row = $stmt->fetch()) {                  
                  if (($row['username']==$username  )&&($row['password']==$pwd ))
                      {     
                      
                      print_r($row);
                      print  $username ;
                      
                      $_SESSION["username"]=$username;
                      $_SESSION["fullname"]=$row['fullname'];
                      
                      header("Location: board.php");
                      exit;
                      
                  }
                  else
                    { 
                      print "";

                  }
                  
                  
              }   
              
              print "</pre>";
            } catch (PDOException $e) {
              print "Error!: " . $e->getMessage() . "<br/>";
              die();
            }
            
        ?>

    </body>      
</html>





