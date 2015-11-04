console.log("p5.geo Loaded");

p5.prototype.locationCheck = function(){
  if (navigator.geolocation) {
    return true;
  }else{
    return false;
  }

}


// //test function
// p5.prototype.getData = function(callback){
//   var ret = false;
//   getExternalData(function(data){
//     ret = data;
//     if (typeof callback == 'function'){
//       callback(data)
//     }
//   })
//   return ret;
// }


p5.prototype.getCurrentPosition = function(callback, errorCallback) {

  var ret = {};

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, geoError);
  }else{
    geoError();
  };

    function geoError(message){
      console.log(message.message);
      ret.error = message.message;
       if(typeof errorCallback == 'function'){ errorCallback(message.message) };
    }

    function success(position){
      // console.log(position);

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

      // ret.timestamp = position.timestamp;
      // ret.coords = {
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude,
      // }
      // ret.coords = position.coords;
      if(typeof callback == 'function'){ callback(position.coords) };
    }

    return ret;

};



// p5.prototype.startPositionWatch = function(){

//   // var watchedLat, watchedLong;

//   watchUser = navigator.geolocation.watchPosition(function(position) {
//     watchedLat = position.coords.latitude;
//     watchedLong = position.coords.longitude;
//   });

//   this.lat = watchedLat
//   this.long = watchedLong;


// }

// p5.prototype.getPositionWatch = function(){

//   return [watchedLat,watchedLong];

//   }

// p5.prototype.stopPositionWatch = function(){

//   navigator.geolocation.clearWatch(watchUser);
//   console.log("stop watching position");

// }



//     navigator.geolocation.watchPosition(function(position) {

//       console.log(position.coords.latitude, position.coords.longitude);





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

// http://www.movable-type.co.uk/scripts/latlong.html
// Used Under MIT License
p5.prototype.calculateDistance = function(lat1, lon1, lat2, lon2) {
    var R = 3959; // earth radius in Miles
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }



p5.prototype.registerPreloadMethod('getCurrentPosition'); 
  