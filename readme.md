### p5.geolocation
![p5.geolocation](p5geolocation.png)

p5.geolocation provides techniques for acquiring, watching, calculating, and geofencing user locations for [p5.js](http://p5js.org/).

This activity is made possible by a research & planning grant from [Forecast Public Art](http://forecastpublicart.org/) and the [Jerome Foundation](http://www.jeromefdn.org/). Special thanks to [Derek Anderson](http://mediaupstream.com/).

### p5.geolocation:
+ [geoCheck()](#geocheck)
+ [getCurrentPosition()](#getcurrentposition-used-in-preload)
+ [watchPosition()](#watchposition-used-with-a-callback)
+ [clearWatch()](#clearwatch)
+ [intervalCurrentPosition()](#intervalcurrentposition-used-with-a-callback)
+ [clearIntervalPos()](#clearintervalpos)
+ [calcGeoDistance()](#calcgeodistance)
+ [geoFence()](#geofence)

##### Useful Tips
+ When using the p5.js editor, you must 'run in browser' to emulate or receive location events.
+ [How to Add a library to your p5.js sketch](https://github.com/processing/p5.js/wiki/Libraries#adding-a-library-to-your-project)

##### License
p5.geolocaiton is licensed under the [GNU LGPL 2.1](http://choosealicense.com/licenses/lgpl-2.1/).


### ~+~+~+~+~ p5.geolocation examples ~+~+~+~+~

#### geoCheck()
###### geoCheck()
geoCheck() checks the availability of geolocation. Returns true if geolocation is available or false if geolocation is not available.
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
    locationData =  getCurrentPosition();
}

function setup() {
    print(locationData.latitude)
    print(locationData.longitude)
    print(locationData.accuracy)
    print(locationData.altitude)
    print(locationData.altitudeAccuracy)
    print(locationData.heading)
    print(locationData.speed)
}
```

#### getCurrentPosition() used with a callback
###### getCurrentPosition(callback, errorCallback)
getCurrentPosition() can also be used with a callback. The callback fires once when the position data becomes available.
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
calcGeoDistance() calculates the distance between two points in the provided units (default is 'mi', 'km' is also available).
```javascript
var distance;
function setup(){
	distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
	print(distance);
}
```
#### geoFence()
###### geoFence(latitude, longitude, fenceDistance, insideCallback, outsideCallback, units, options)
geoFence() is class which creates a geofence around the provided lat/long point with a provided radius in provided units('mi' is default). It will fire a callback with an object containing position data when the user is inside of the geofence each time the location updates. It will fire a second callback each time the position updates and the user is outside of the geofence. Takes an optional object containing options for accuracy, timeout and age.
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

    fence = new geoFence(44.979779, -93.325499, 0.05, insideTheFence, outsideTheFence, 'mi')
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
#### geoFence() insideFence boolean
###### geoFence(latitude, longitude, fenceDistance, insideCallback, outsideCallback, units, options)
geofence has a useful parameter for checking the fence status. .insideFence when called on your geofence object will return true or false depending on the users relationship to the fence.
```javascript
var fence;
function setup(){
 	fence = new geoFence(44.979779, -93.325499, 0.05)
}

function draw(){
	print(fence.insideFence);
}
```
