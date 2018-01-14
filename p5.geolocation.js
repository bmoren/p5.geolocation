console.log("%c p5.geolocation Loaded ", "color:pink; background:black; ");


/**
* Check if location services are available
*
* Returns true if geolocation is available
*
* @method locationCheck
* @return {boolean} true if geolocation is available
*/
p5.prototype.geoCheck = function(){
  if (navigator.geolocation) {
    return true;
  }else{
    return false;
  }

}

/**
* Get User's Current Position
*
* Gets the users current position. Can be used in preload(), or as a callback.
*
* @method getCurrentPosition
* @param  {function} a callback to handle the current position data
* @param  {function} a callback to handle an error
* @return {object} an object containing the users position data
*/
p5.prototype.getCurrentPosition = function(callback, errorCallback) {

  var ret = {};

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, geoError);
  }else{
    geoError("geolocation not available");
  };

    function geoError(message){
      console.log(message.message);
      ret.error = message.message;
       if(typeof errorCallback == 'function'){ errorCallback(message.message) };
    }

    function success(position){
      // console.log(position);

      //get the entire position object....
      // //see the p5.js github libraries wiki page for more info on what is going on here.
      // for(var k in position){
      //   if (typeof position[k] == 'object'){
      //     ret[k] = {};
      //     for(var x in position[k]){
      //       ret[k][x] = position[k][x];
      //     }
      //   } else {
      //     ret[k] = position[k];
      //   }
      // }

      //get only the coords part of the position object
          for(var x in position.coords){
            ret[x] = position.coords[x];
          }

      if(typeof callback == 'function'){ callback(position.coords) };
    }

    return ret;
};

//add the get Current position to the preload stack.
p5.prototype.registerPreloadMethod('getCurrentPosition');

/**
* Get User's Current Position on an interval
*
* Gets the users current position on an interval. Can be useful if watchPosition is not responsive enough. This can be a resource hog (read:battery) as it is calling the getPosition at the rate of your interval. Set it long for less intense usage.
*
* @method getCurrentPosition
* @param  {function} a callback to handle the current position data
* @param  {function} an interval in MS
* @param  {function} a callback to handle an error
*/
p5.prototype._intervalPosition = null;
p5.prototype.intervalCurrentPosition = function(callback, interval,  errorCallback){

  var gogogadget = 5000;
  gogogadget = interval;

  if (navigator.geolocation) {

    _intervalPosition = setInterval(function(){

      console.log("pos");
      navigator.geolocation.getCurrentPosition(success, geoError);

    }, gogogadget)

  }else{
    geoError("geolocation not available");
  };

    function geoError(message){
      console.log(message.message);
       if(typeof errorCallback == 'function'){ errorCallback(message.message) };
    }

    function success(position){
      if(typeof callback == 'function'){ callback(position.coords) };
    }
}

/**
* Clear interval Position
*
* clears the current intervalCurrentPosition()
*
* @method clearIntervalPos()
*/
p5.prototype.clearIntervalPos = function(){
  window.clearInterval(_intervalPosition);
}

/**
* Watch User's Current Position
*
* Watches the users current position
*
* @method watchPosition
* @param  {function} a callback to handle the current position data
* @param  {function} a callback to handle an error
* @param  {object} an positionOptions object: enableHighAccuracy, maximumAge, timeout
*/
p5.prototype._posWatch = null;
p5.prototype.watchPosition = function(callback, errorCallback, options){

  if (navigator.geolocation) {
    _posWatch = navigator.geolocation.watchPosition(success, geoError, options);
  }else{
    geoError("geolocation not available");
  };

  function geoError(message){
      console.log("watch Postition Error" + message);
       if(typeof errorCallback == 'function'){ errorCallback(message.message) };
    }

  function success(position){
        if(typeof callback == 'function'){ callback(position.coords) };
        // console.log(_posWatch);
  }

}

/**
* Clear the watchPosition
*
* clears the current watchPosition
*
* @method clearWatch
*/
p5.prototype.clearWatch = function(){
  navigator.geolocation.clearWatch( _posWatch );
}

/**
* Calculate the Distance between two points
*
*
* @method watchPosition
* @param  {float} latitude of the first point
* @param  {float} longitude of the first point
* @param  {float} latitude of the second point
* @param  {float} longitude of the second point
* @param  {string} units to use: 'km' or 'mi', 'mi' is default if left blank
* @return {float} the distance between the two points in the specified units, miles is default
*/

// http://www.movable-type.co.uk/scripts/latlong.html
// Used Under MIT License
p5.prototype.calcGeoDistance = function(lat1, lon1, lat2, lon2, units) {
  if(units == 'km'){
     var R = 6371; //earth radius in KM
  }else{
    var R = 3959; // earth radius in Miles (default)
  }
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }


/**
* Calculate if a Location is inside Polygon
*
*
* @method watchPosition
* @param  {float} Array of Objects with lat: and lon:
* @param  {float} Object with lat and long of my location
* @return {boolean} true if geolocation is within polygon
*/

// http://jsfromhell.com/math/is-point-in-poly
// Adapted from: [http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html]
// Used Under MIT License
p5.prototype.isLocationInPolygon = function(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].lon <= pt.lon && pt.lon < poly[j].lon) || (poly[j].lon <= pt.lon && pt.lon < poly[i].lon))
        && (pt.lat < (poly[j].lat - poly[i].lat) * (pt.lon - poly[i].lon) / (poly[j].lon - poly[i].lon) + poly[i].lat)
        && (c = !c);
    return c;
}



/**
* Create a new geoFenceCircle
*
* Watches the users current position and checks to see if they are witihn a set radius of a specified point.
*
* @method watchPosition
* @param  {float} latitude of the first point
* @param  {float} longitude of the first point
* @param  {float} distance from the point to trigger the insideCallback
* @param  {function} a callback to fire when the user is inside the geoFenceCircle
* @param  {function} a callback to fire when the user is outside the geoFenceCircle
* @param  {string} units to use: 'km' or 'mi', 'mi' is default if left blank
* @param  {object} an positionOptions object: enableHighAccuracy, maximumAge, timeout
*/
p5.prototype.geoFenceCircle = function(lat, lon, fence, insideCallback, outsideCallback, units, options){

  this.lat = lat;
  this.lon = lon;
  this.fence = fence;
  this.units = units; //this should work since calcGeoDistance defaults to miles.
  this.distance = 0.0;
  this.insideCallback = insideCallback;
  this.outsideCallback = outsideCallback;
  this.insideFence = false;
  this.options = options;
  this.id = '';

    this.geoError = function(message){
      console.log("geoFenceCircle Error :" + message);
    }

    this.success = function(position){
      this.distance = calcGeoDistance(this.lat,this.lon, position.coords.latitude, position.coords.longitude, this.units);

      if(this.distance <= this.fence){
          if(typeof this.insideCallback == 'function'){ this.insideCallback(position.coords) };
          this.insideFence = true;
      }else{
        if(typeof this.outsideCallback == 'function'){ this.outsideCallback(position.coords) };
        this.insideFence = false;
      }
    }

    this.clear = function() {
      if (this.id) {
        navigator.geolocation.clearWatch(this.id);
        this.id = '';
      }
    }

    if (navigator.geolocation) {
      // bind the callbacks to the geoFenceCircle 'this' so we can access, this.lat, this.lon, etc..
      this.id = navigator.geolocation.watchPosition(this.success.bind(this), this.geoError.bind(this), this.options);
    }else{
      geoError("geolocation not available");
    };
}





/**
* Create a new geoFencePolygon
*
* Watches the users current position and checks to see if they are witihn a set radius of a specified point.
*
* @method watchPosition
* @param  {float} latitude of the first point
* @param  {float} longitude of the first point
* @param  {float} distance from the point to trigger the insideCallback
* @param  {function} a callback to fire when the user is inside the geoFenceCircle
* @param  {function} a callback to fire when the user is outside the geoFenceCircle
* @param  {string} units to use: 'km' or 'mi', 'mi' is default if left blank
* @param  {object} an positionOptions object: enableHighAccuracy, maximumAge, timeout
*/


/*var points = [
    {x: 34.076089, y: -118.440915},
    {x: 34.076095, y: -118.440605},
    {x: 34.075906, y: -118.440597},
    {x: 34.075891, y: -118.440932},
];*/
p5.prototype.geoFencePolygon = function( ArrayOfObjectsWithLatLong, insideCallback, outsideCallback, units, options){

  this.ArrayOfObjectsWithLatLong = ArrayOfObjectsWithLatLong;
  this.units = units; //this should work since calcGeoDistance defaults to miles.
  this.insideCallback = insideCallback;
  this.outsideCallback = outsideCallback;
  this.insideFence = false;
  this.options = options;
  this.id = '';

    this.geoError = function(message){
      console.log("geoFencePolygon Error :" + message);
    }

    this.success = function(position){
      this.insideFence = isLocationInPolygon(this.ArrayOfObjectsWithLatLong, { lat:position.coords.latitude, lon: position.coords.longitude });

      if(this.insideFence == true){
          if(typeof this.insideCallback == 'function'){ this.insideCallback(position.coords) };
      }else{
        if(typeof this.outsideCallback == 'function'){ this.outsideCallback(position.coords) };
      }
    }

    this.clear = function() {
      if (this.id) {
        navigator.geolocation.clearWatch(this.id);
        this.id = '';
      }
    }

    if (navigator.geolocation) {
      // bind the callbacks to the geoFenceCircle 'this' so we can access, this.lat, this.lon, etc..
      this.id = navigator.geolocation.watchPosition(this.success.bind(this), this.geoError.bind(this), this.options);
    }else{
      geoError("geolocation not available");
    };
}
