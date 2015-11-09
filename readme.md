###p5.geolocation

p5.geolocation provides techniques for getting, watching, calculating, and geo fencing users locations. 

Parts of this activity are made possible by a research grant from Forecast Public Art and the Jerome Foundation

### ~+~+~+~+~ p5.geolocation examples ~+~+~+~+~ 

####geoCheck()
######geoCheck()
geoCheck() checks the avalibility of geolocation. Returns true if geolocation is available or false if geolocation is not available.
```javascript
setup(){
	if(geoCheck() == true){
		//geolocation is available
	}else{
		//error getting geolocaion
	}
}
```

#### getCurrentPosition() used in preload()
###### getCurrentPosition(callback, errorCallback)
getCurrentPosition() can be used in preload() or with a callback (see below). When used in preload it will return an object containing position elements, latitude, longitude, altitude, etc..
```javascript
var locationData;
function preload(){
	locationData =	getCurrentPosition();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	print(locationData.coords.latitude)
	print(locationData.coords.longitude)
}
```

#### getCurrentPosition() used with a callback
###### getCurrentPosition(callback, errorCallback)
getCurrentPosition() can alse be used with a callback. The callback fires once when the position data becomes available.
```javascript
function setup(){
    getCurrentPosition(doThisOnLocation)
}

function doThisOnLocation(position){
    print("lat: " + position.latitude);
    print("long: " + position.longitude);
}
```

#### watchPosition() used with a callback
###### watchPosition(callback, errorCallback, options)
watchPosition() is very similar to getCurrentPosition(), except that it will fire it's callback each time the users position makes a noticable change. Takes an optional object containing options for accuracy, timeout and age.
```javascript
//optional options for watchPosition()
//watchPosition(positionChanged, watchOptions)

// watchOptions = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

function setup(){
    watchPosition(positionChanged)
}

function positionChanged(position){
    print("lat: " + position.latitude);
    print("long: " + position.longitude);
}
```

#### clearWatch() 
###### clearWatch() 
clearWatch() cancels the watchPosition()
```javascript
function mousePressed(){
	clearWatch();
	print("watchPosition() cleared")
}
```

#### intervalCurrentPosition() used with a callback
###### intervalCurrentPosition(callback, interval,  errorCallback)
intervalCurrentPosition() is a hybrid of watchPosition() and getCurrentPosition(). It executes the getCurretnPosition() function on a interval in Milliseconds via an optional second parameter, default is 5000ms. This is useful when you need more nuanced changed location detection than watchPosition() can provide.
```javascript
function setup(){
    intervalCurrentPosition(positionPing, 5000)
}

function positionPing(position){
    print("lat: " + position.latitude);
    print("long: " + position.longitude);
}
```
#### clearIntervalPos() 
###### clearIntervalPos() 
clearIntervalPos() cancels the intervalCurrentPosition()
```javascript
function mousePressed(){
	clearIntervalPos();
	print("intervalCurrentPosition() cleared!")
}
```
#### calcGeoDistance()
###### calcGeoDistance(lat1, lon1, lat2, lon2, units)
calcGeoDistance() calculates the distance between two points in the provided units (default is 'mi', 'km' is a second option). 
```javascript
var distance;
function setup(){
	distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
	print(distance);
}
```

#### geoFence()
###### geoFence(lat, lon, fenceDistance, callback, units, options)
geoFence() creates a geofence around the provided lat/long point. with a provided radius in provided units('mi' is default). It will fire a callback with an object containitng position data when the user is inside of the geofence. Takes an optional object containing options for accuracy, timeout and age.
```javascript
var fence;
function setup(){

	//optional options object for geoFence
	//fence = new geoFence(44.979779, -93.325499, .05, insideTheFence, 'mi', fenceOptions)
    // fenceOptions = {
    //   enableHighAccuracy: false,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    fence = new geoFence(44.979779, -93.325499, .05, insideTheFence, outsideTheFence, 'mi')
}

function insideTheFence(position){
    print("INlat: " + position.latitude);
    print("INlong: " + position.longitude);
    print("user is inside of the fence")
}

function outsideTheFence(position){
    print("OUTlat: " + position.latitude);
    print("OUTlong: " + position.longitude);
    print("user is outside of the fence")
}
```
