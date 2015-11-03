console.log("p5.geo Loaded");

var watchUser, watchedLat, watchedLong

p5.prototype.locationCheck = function(){
  if (navigator.geolocation) {
    return true;
  }else{
    return false;
  }

}

p5.prototype.getCurrentPosition = function(callback) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, geoError);
  }else{
    geoError();
  };

    function success(position){

        //console.log works and delivers data once it is available
       console.log(position.coords.latitude);
       // return always pushes out undefined....
    }
};







// p5.prototype.getCurrentPosition = function(opts) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, geoError, opts);
//   }else{
//     geoError();
//   };


//     function success(position, callback){

//        // console.log(position.coords.latitude);
//        return position.coords.latitude;      
//     }


// };


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

function geoError(){
      console.log('geolocation services are not available.');
    }
  
  