// Put your Last.fm API key here
var api_key = "your API Key";

function sendRequest() {
    var artist = encodeURI(document.getElementById("form-input").value);
    getInfo(artist);
    getTopAlbumInfo(artist);
    getSimilarArtistInfo(artist);
}

function getInfo(artist){
    
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
//    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        var myObj,x ,a= "";		
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            //myObj += "<table border = '1'><th>"+a+"</th>";
            var imgname = json.artist.name;
            var img= json.artist.image;
            var artisturl = json.artist.url;
            var artistsummary = json.artist.bio.summary;
			var artistcontent = json.artist.bio.content;
            for (x in img)
            {                
                var imgurl = json.artist.image[x]["#text"];
                var imgsize = json.artist.image[x]["size"];
                
                if (imgsize == "large")
                {
					//myObj +="<tr>"+imgname+'</tr><tr><img src='+imgurl+
                    //'width="228" height="228"></img></tr><tr>'+imgsize+"</tr></table>" ;
                    myObj +="<h1>"+imgname+'</h1><a href='+artisturl+'>Visit our link: '+imgname+'</a>\n\
                            </br><img src='+imgurl+'width="400" height="400"></img><h3>'+imgname+"Summary</h3><div>"
							+artistsummary+"</div><h2>"+imgname+" Biography</h2><div>"
							+artistcontent+"</div>" ;
                }
                
            }                
            //var str = JSON.stringify(json,undefined,2);
            
//            document.getElementById("output").innerHTML = "<table><tr>"+imgname+ 
//                    '<tr><tr><td><img src='+imgurl+
//                    'width="228" height="228"></img></td><td>'+imgsize+"</td></tr>" ;
            document.getElementById("output").innerHTML = myObj;
            //document.getElementById("output").innerHTML = "<pre>"+str+"</pre>" ;
        }
    };
    xhr.send(null);
} 
    
       
       
function getTopAlbumInfo (artist) {
    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums";
//    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
		var myObj1="";
		var i=1;
		var x=10;
        if (this.readyState == 4) 
        {
            var json = JSON.parse(this.responseText);
            var albumname = json.topalbums.album;
            var albumimge = json.topalbums.album.image;
            myObj1 = "<h2> Album List</h2>"
            for (;i< x ;i++)
            {		
                for (j=0;j<4;j++)
                {
                    var al = json.topalbums.album[i]["name"];	
                    var albumimge = json.topalbums.album[i]["image"][j]["#text"];
                    var albumimgsz = json.topalbums.album[i]["image"][j]["size"];

                    if (albumimgsz == "large")
    //{
                        myObj1 += '<ul><li>'+al+'<img src='+albumimge+'width="228" height="228"></img></li></ul>';
    //}
//				myObj1 += "<ul><li>"+al+","+albumimge+"</li></ul> ";
                }
            var str = JSON.stringify(json,undefined,2);
            }
            document.getElementById("output1").innerHTML =  myObj1 ;
        }
    };
    xhr.send(null);
} 

function getSimilarArtistInfo (artist) {
    var xhr = new XMLHttpRequest();
    var method = "artist.getSimilar";
//    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        var myObj2="";
		var i =0;
		var x=10;
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var similar = json.similarartists.artist;
            myObj2 = "<h2> Similar Artist List</h2>"
            //for (;i<x;i++)
			for (i in similar)
			{			
                    var al = json.similarartists.artist[i]["name"];
                    myObj2 += "<ul><li>"+al+"</ul></li>";
            //var str = JSON.stringify(json,undefined,2);
            }
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output2").innerHTML = myObj2;
        }
    };
    xhr.send(null);
}



