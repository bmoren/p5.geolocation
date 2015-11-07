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



###Documentation
#### ~+~+~+~+~ p5.geolocation examples ~+~+~+~+~ 

####geoCheck()
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
```javascript
var startLocation;
preload(){
	startLocation = getCurrentPosition();
}

draw(){
	print(startLocation);
}
```

#### getCurrentPosition() used with a callback
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
```javascript
mousePressed(){
	clearWatch();
}
```

#### intervalCurrentPosition() used with a callback
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
```javascript
var distance;
mousePressed(){
	distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
	print(distance);

}
```

#### geoFence()
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
