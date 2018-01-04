<html>
<head><title>Message Board-</title>
<h1>Message Board</h1>
</head>
<body>
    <form id = "form1" action = "" method="post">
        Messages: <textarea name="messages" rows="5" cols="40" value="Messages"></textarea><br>
        <input type="submit" value = "NewPost" name="newpost"/>
        <!--<button type="submit" value = "Log Out" formaction="login.php">Logout</button>-->
        <!--<button type="submit" value = "Reply" name = "reply">Reply</button>-->
<!--        <input type="submit" value = "Reply" name="reply"/>-->
        <input type="submit" value = "LogOut" name="logout"/>
    
<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors','On');
$newpost=$replyid="";
function test_input($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
              }
              
try {
  $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board","root","moon2far1!",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

  $dbh->beginTransaction();
  $user = "";
  $user= $_SESSION["username"];
  $fullname1= $_SESSION["fullname"];
 
  if (($_SERVER["REQUEST_METHOD"] == "POST") || ($_SERVER["REQUEST_METHOD"] == "GET") ){
    if (!empty($_POST['messages']) ) {           
        $newpost = test_input($_POST["messages"]);
        $msgid = uniqid() ;
        if (isset($_POST['newpost']) && ($_POST['newpost'] == 'NewPost')) {
            $dbh->exec('insert into posts(id, replyto,postedby,datetime, message) values("'.$msgid.'","null","'.$user.'",NOW(),"'.$newpost.'")')
            or die(print_r($dbh->errorInfo(), true));
            $dbh->commit();
            header("Location: board.php");
            exit;

        }    
                
        if (isset($_GET['replyto'])) {
            $replynew=$_GET['replyto'];
            $dbh->exec('insert into posts(id, replyto,postedby,datetime, message) values("'.$msgid.'","'.$replynew.'","'.$user.'",NOW(),"'.$newpost.'")')
            or die(print_r($dbh->errorInfo(), true));
            $dbh->commit();
        }
    }
      
    if (isset($_POST['logout']) && ($_POST['logout'] == 'LogOut')) {
        print "Log Out and go to Login page";
		unset($_SESSION["username"]);
		session_destroy();
        header("Location: login.php");
        exit;
    }
  }
  
  $stmt = $dbh->prepare('select id,postedby,datetime,replyto,message,fullname from posts,users where users.username=posts.postedby order by datetime');
  $stmt->execute();
  
  echo "<table border='1'>
    <tr>
    <th>Message id</th>
    <th>UserName and Full Name</th>
    <th>Date and Time</th>
    <th>Reply To ID</th>
    <th>Message Text</th>
    <th>Reply</th>
    </tr>";
  while ($row = $stmt->fetch()) {
        $replyid= $row['id'];
        echo "<tr>";
        echo "<td>" . $replyid. "</td>";
        echo "<td>Username: " . $row['postedby'] . " , Full Name: ". $row['fullname']."</td>";
        echo "<td>" . $row['datetime'] . "</td>";
        echo "<td>" . $row['replyto'] . "</td>";
        echo "<td>" . $row['message'] . "</td>";  
        echo "<td><button type='submit' form='form1' formmethod='POST'  formaction ='board.php?replyto=$replyid'>Reply</button></td>";
        echo "</tr>";
  } 
  
  echo "</table>";
  
  
} catch (PDOException $e) {
  print "Error!: " . $e->getMessage() . "<br/>";
  die();
}
     
            
?>
</form> 
   
</body>
</html>
