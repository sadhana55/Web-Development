// Put your zillow.com API key here
var zwsid = "";

var request = new XMLHttpRequest();
var geocoder;
var map;
var markers = [];
var historyaddress = [];

function initialize () {
    geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow;
    var latlng = new google.maps.LatLng(32.75, -97.13);
    var mapOptions = {
      zoom: 17,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(map, event.latLng);    
  });
}

function placeMarker(map, location) {   
    setMapOnAll(null)
    var marker;
    
    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
    position: location,
    map: map
    });
	
    markers.push(marker);
    var infowindow = new google.maps.InfoWindow;   
  
    var latlng = {lat: location.lat(), lng: location.lng()};
  
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        //map.setZoom(8);
        var address = results[0].formatted_address;    
//        var city = document.getElementById("city").value;
//        var state = document.getElementById("state").value;
//        var zipcode = document.getElementById("zipcode").value;
        var city = "";
        var state = "";
        var zipcode = "";

        request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
        request.withCredentials = "true";
        request.send(null);
        request.onreadystatechange = function(){
            try{
            if (request.readyState == 4) {
                var xml = request.responseXML.documentElement;
                var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
                historyaddress.push(address+ " : " +value+"<br>");
				alert(historyaddress);
                document.getElementById("output").innerHTML = historyaddress;
                infowindow.setContent(address+ " : " +value);
                infowindow.open(map, marker);
                
                
                if (value==""){
                    alert("This is not a house address, please click at some house")
                }            
              }
            }catch(e){
                alert("Value is undefined from Zillow")
            }
            };
        } 
    
      else {
        window.alert('No results found');
        }
    }
     else {
      window.alert('Geocoder failed due to: ' + status);
    }
  }); 
    
    
}


function displayResult () {
    if (request.readyState == 4) {
        setMapOnAll(null);
        var xml = request.responseXML.documentElement;
        var address = document.getElementById('address').value;
        var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
		historyaddress.push(address+ " : " +value +"<br>");
        document.getElementById("output").innerHTML = historyaddress;	
        
        
        geocoder.geocode( { 'address': address}, function(results, status) 
        {
        if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
            });
        markers.push(marker);
        
        var infowindow = new google.maps.InfoWindow;   
        infowindow.setContent(address+ " : " +value);
        infowindow.open(map, marker);
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    }
}
 function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

	  

	  
function sendRequest () {
    request.onreadystatechange = displayResult;
    var address = document.getElementById("address").value;
//    var city = document.getElementById("city").value;
//    var state = document.getElementById("state").value;
//    var zipcode = document.getElementById("zipcode").value;
//    document.getElementById("output").innerHTML = value;
        var city = "";
        var state = "";
        var zipcode = "";
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true";
    request.send(null);
}

function clearText() {
        document.getElementById("address").value="";
      }