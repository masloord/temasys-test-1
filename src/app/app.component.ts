import { Component } from '@angular/core';
declare var Skylink: any;
declare var AdapterJS: any;
import { NgxCarousel } from 'ngx-carousel';
import { Carousel } from '../models/Carousel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
 sl = new Skylink()
 appKey = "9ee78bfb-e7ee-4998-b3fd-c77daeccf06f"
  items: Array<any> = []
  public carouselTile: Carousel;

  public generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  };

  constructor() {
  }

  ngOnInit() {
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 3, all: 0},
      animation: 'lazy',
      slide: 2,
      speed: 400,
      point: true,
      load: 2,
      touch: true,
    }

    // console.log(this.sl)
    AdapterJS.webRTCReady(function(isUsingPlugin) {
    // The WebRTC API is ready.
    //isUsingPlugin: true is the WebRTC plugin is being used, false otherwise

})


this.sl.setLogLevel(4);

this.sl.on('peerJoined', function(peerId, peerInfo, isSelf)  {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.height = 300;
  vid.width=300;
  vid.muted = false; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

this.sl.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  var tilecreation=document.getElementById('tilecreation')
   var createTiles = document.createElement("ngx-item")
   createTiles.setAttribute("NgxCarouselItem", "");  // inserted the directive
   tilecreation.appendChild(createTiles)
   var vidID = this.generateUUID() //to generate UUID for video
   createTiles.id=vidID
   var videoAttached = document.getElementById(vidID)
    videoAttached.appendChild(vid)
   AdapterJS.attachMediaStream(vid, stream);
});

this.sl.on('peerLeft', function(peerId) {
  var vid = document.getElementById(peerId);
  vid.remove(); //only removes the video and not ngx-tile
});

this.sl.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('localVideo');
  AdapterJS.attachMediaStream(vid, stream);
});


this.sl.init(this.appKey, function (error, success) {
    if (error) {
       document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
     } else {
       document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
       document.getElementById('start').style.display = 'block';
       this.sl.joinRoom("testxx");
     }
  });
}



joinRoom() {
this.sl.joinRoom("testxx",{
    audio: true,
    video: true
  }, function (error, success) {
    if (error) return;
    console.log("User connected with getUserMedia() Stream.")
  });
}


leaveRoom(){ this.sl.leaveRoom(); }

toggleMute(){
var mutetoggle = (<HTMLInputElement>document.getElementById("muteToggle")).checked;
if(mutetoggle === true){
  this.sl.muteStream({
    audioMuted: true,
   videoMuted: false
  });
}
else{
  this.sl.muteStream({
    audioMuted: false,
   videoMuted: false
  });
}
}

/* Helper functions */
 getRoomId() {
  var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
  if(roomId) {
    return roomId[1];
  }
  else {
    roomId = this.sl.generateUUID();
    var date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    document.cookie = 'roomId=' + roomId + '; expires=' + date.toUTCString() + '; path=/';
    return roomId;
  }
}

}
