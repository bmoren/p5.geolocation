console.log("p5.geo Loaded");


/**
* Check if locaiton services are available
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

      //see the p5.js github libraries wiki page for more info on what is going on here.
      for(var k in position){
        if (typeof position[k] == 'object'){
          ret[k] = {};
          for(var x in position[k]){
            ret[k][x] = position[k][x];
          }
        } else {
          ret[k] = position[k];
        }
      }

      if(typeof callback == 'function'){ callback(position.coords) };
    }

    return ret;

};


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
      console.log(message.message);
      ret.error = message.message;
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
  // console.log( _posWatch );

}






//       distance = calculateDistance(startPosLat, startPosLong,position.coords.latitude, position.coords.longitude)

//       console.log(distance);

//       if(distance < .05){
//         $("#message").text("Yes, were inside .05 KM!!! :) A+")
//       }else if(distance > .05){
//         $("#message").text("No, not inside .05 KM :(")
//       }
//     });
//   }
// };





/**
* Calculate the Distance between two points
*
* Watches the users current position
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
    var R = 3959; // earth radius in Miles
  }
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }


//add the get Current position to the preload stack.
p5.prototype.registerPreloadMethod('getCurrentPosition'); 
  