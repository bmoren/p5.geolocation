###p5.geolocation

Common Geolocation techniques & tools for p5.js 


+ Get current Lat/long once
+ Watch Lat/Long
+ Calculate distance between 2 points in multiple units
+ ellipse geofence (see above)
+ geometry geofence
+ a getCurrentPosition on set interval for minor movements. 
+

Parts of this activity are made possible by a research grant from Forecast Public Art and the Jerome Foundation

### ~+~+~+~+~ p5.geolocation examples ~+~+~+~+~ 

####geoCheck()
######geoCheck()
geoCheck() checks the avalibility of geolocation, returns true if geolocation is available.
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
var startLocation;
preload(){
	startLocation = getCurrentPosition();
}

draw(){
	print(startLocation.latitude);
	print(startLocation.longitude);
}
```

#### getCurrentPosition() used with a callback
###### getCurrentPosition(callback, errorCallback)
getCurrentPosition() can alse be used with a callback. The callback fires once when the position data becomes available.
```javascript
mousePressed(){
	getCurrentPosition(doThisOnLocation)
}

function doThisOnLocation(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
}
```

#### watchPosition() used with a callback
###### watchPosition(callback, errorCallback, options)
watchPosition() is very similar to getCurrentPosition(), except that it will fire it's callback each time the users position makes a noticable change.
```javascript
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
```

#### clearWatch() 
###### clearWatch() 
clearWatch() cancels the watchPosition()
```javascript
mousePressed(){
	clearWatch();
}
```

#### intervalCurrentPosition() used with a callback
###### intervalCurrentPosition(callback, interval,  errorCallback)
intervalCurrentPosition() is a hybrid of watchPosition() and getCurrentPosition(). It executes the getCurretnPosition() function on a interval in Milliseconds. This is useful when you need more nuanced changed location detection than watchPosition() can provide.
```javascript
setup(){
	intervalCurrentPosition(positionPing, 1000)
}

function positionPing(position){
	print("lat: " + position.latitude);
	print("long: " + position.longitude);
}
```

#### calcGeoDistance()
###### calcGeoDistance(lat1, lon1, lat2, lon2, units)
calcGeoDistance() calculates the distance between two points in the provided units (default is 'mi', 'km' is a second option). 
```javascript
var distance;
mousePressed(){
	distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
	print(distance);

}
```

#### geoFence()
###### geoFence(lat, lon, fence, callback, units, options)
geoFence() creates a geofence around the provided lat/long point. with a provided radius in provided units('mi' is default). It will fire a callback with an object containitng position data when the user is inside of the geofence.
```javascript
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
```
