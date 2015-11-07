/* ~+~+~+~+~ p5.geolocation examples ~+~+~+~+~  */

/* ~+~+~+~+~ geoCheck()*/
setup(){
	if(geoCheck() == true){
		//geolocation is available
	}else{
		//error getting geolocaion
	}
}

/* ~+~+~+~+~ getCurrentPosition() used in preload()*/
var startLocation;
preload(){
	startLocation = getCurrentPosition();
}

draw(){
	print(startLocation);
}

/* ~+~+~+~+~ getCurrentPosition() used with a callback*/
mousePressed(){
	getCurrentPosition(doThisOnLocation)
}

function doThisOnLocation(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
}

/* ~+~+~+~+~ watchPosition() used with a callback */
watchOptions = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

setup(){
	watchPosition(positionChanged, watchOptions)
}

function positionChanged(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
}

/* ~+~+~+~+~ clearWatch()  */
mousePressed(){
	clearWatch();
}

/* ~+~+~+~+~ intervalCurrentPosition() used with a callback */
setup(){
	intervalCurrentPosition(positionPing, 1000)
}

function positionPing(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
}

/* ~+~+~+~+~ calcGeoDistance() */

var distance;
mousePressed(){
	distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
	print(distance);

}

/* ~+~+~+~+~ geoFence() */

fenceOptions = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

geoFence(44.979779, -93.325499, .05, insideTheFence, 'mi', fenceOptions)

function insideTheFence(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
	print("user is inside of the fence")

}


