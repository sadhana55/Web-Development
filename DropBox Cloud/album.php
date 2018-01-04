<!DOCTYPE html>
<html>
<body>
<h1>PHOTO ALBUM</h1>
<h2>Sadhana Singh </h2>
<head><link rel="stylesheet" href="styles.css"></head>
<div class="photo">
<form name = "form1" action="album.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="imageFile" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>
<script>
        function displayImage($imageurl){
            document.getElementById('img').src=$imageurl;
        }
        
        function deleteImage(img){
            location.href="album.php?delete="+img;
        }
</script>		

<?php
$msg='';
// display all errors on the browser
error_reporting(E_ALL);
ini_set('display_errors','On');



require_once 'demo-lib.php';
demo_init(); // this just enables nicer output

// if there are many files in your Dropbox it can take some time, so disable the max. execution time
set_time_limit( 0 );

require_once 'DropboxClient.php';

/** you have to create an app at @see https://www.dropbox.com/developers/apps and enter details below: */
/** @noinspection SpellCheckingInspection */
$dropbox = new DropboxClient( array(
	'app_key' => "mz3n5vtmp8jfqyl",      // Put your Dropbox API key here
	'app_secret' => "y7u4wygjgnoc0v4",   // Put your Dropbox API secret here
	'app_full_access' => true,
) );


/**
 * Dropbox will redirect the user here
 * @var string $return_url
 */
$return_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . "?auth_redirect=1";

// first, try to load existing access token
$bearer_token = demo_token_load( "bearer" );

if ( $bearer_token ) {
	$dropbox->SetBearerToken( $bearer_token );
//	echo "loaded bearer token: " . json_encode( $bearer_token, JSON_PRETTY_PRINT ) . "\n";
} elseif ( ! empty( $_GET['auth_redirect'] ) ) // are we coming from dropbox's auth page?
{
	// get & store bearer token
	$bearer_token = $dropbox->GetBearerToken( null, $return_url );
	demo_store_token( $bearer_token, "bearer" );
} elseif ( ! $dropbox->IsAuthorized() ) {
	// redirect user to Dropbox auth page
	$auth_url = $dropbox->BuildAuthorizeUrl( $return_url );
	die( "Authentication required. <a href='$auth_url'>Continue.</a>" );
}
 
if(!empty($_FILES['imageFile'])){
    $file_name = $_FILES['imageFile']['name'];
    $file_tmpname = $_FILES['imageFile']['tmp_name'];
    $file_ext = pathinfo($file_name,PATHINFO_EXTENSION);
    $file_size = $_FILES['imageFile']['size'];    
    if ($file_ext != 'jpg'){
        echo "Please upload an image file in jpg format";
    }
    
 
    if (($file_ext == 'jpg') && $file_size >0){
        if ($file_size > 2097152){
            echo "File must be less than 2MB";
        }else{
        move_uploaded_file($file_tmpname,$file_name);
        $dropbox->UploadFile($file_name);
        }
    }   
    
}
$error_msg='';

if(isset($_GET['delete'])){
     try{
     $result =   $dropbox->Delete($_GET['delete']);
     $msg = "<h3>Image is deleted</h3>";
    }catch(DropboxException $d){
     $error_msg .="Image to be deleted is not present."; 
    }
 }
 
$files = $dropbox->Search("/", ".jpg");

if(empty($files)) {
   $dropbox->UploadFile("leonidas.jpg");
   $files = $dropbox->GetFiles("",false);
 }

if(!empty($files)){    

    $button = "";
    foreach($files as $key => $img){ 
        $link = $dropbox->GetLink($img,false);
        $button .= "<table><tr><td><button name= 'url' class='imageurl'  onclick='displayImage(\"$link\")'>".str_replace(array("/",".jpg"),"",$img->path)."</button></td>"
                 ."<td><button name='delete' onclick='deleteImage(\"$img->path\")'>Delete</button></td></tr></table>";

    }
    print($button);

}
echo "<div msg = 'msg'>$msg</div>";
echo "<div class='album'>";
echo "<img src='no_image.jpg' id='img'/></div>";

?>

</div>
 </body>      
</html>
