import { Component } from '@angular/core';
declare var Skylink: any;
declare var AdapterJS: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
 sl = new Skylink()
 appKey = "9ee78bfb-e7ee-4998-b3fd-c77daeccf06f"


  constructor() {

  }

  ngOnInit() {

    console.log(this.sl)
    AdapterJS.webRTCReady(function(isUsingPlugin) {
    // The WebRTC API is ready.
    //isUsingPlugin: true is the WebRTC plugin is being used, false otherwise

})



this.sl.setLogLevel(4);
this.sl.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

this.sl.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  AdapterJS.attachMediaStream(vid, stream);
});

this.sl.on('peerLeft', function(peerId) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});

this.sl.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('localVideo');
  AdapterJS.attachMediaStream(vid, stream);
});


this.sl.init(this.appKey, function (error, success) {
    this.sl.joinRoom("testxx"); // Goes to "testxx" Room
  });

// this.sl.init({
//   apiKey: '9ee78bfb-e7ee-4998-b3fd-c77daeccf06f', // Get your own key at https://console.temasys.io
//   defaultRoom: 'GogabE' //this.getRoomId()
// }, function (error, success) {
//   if (error) {
//     document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
//   } else {
//        document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
//     document.getElementById('start').style.display = 'block';
//   }
// });

}

// joinRoom() {
//   this.sl.joinRoom({
//     audio: true,
//     video: true
//   }, function (error, success) {
//     if (error) {
//       document.getElementById('status').innerHTML = 'Failed joining room.<br>' +
//   'Error: ' + (error.error.message || error.error);
//     } else {
//       document.getElementById('status').innerHTML = 'Joined room.';
//     }
//   });
// }

joinRoom() {
this.sl.joinRoom("testxx", {
    audio: true,
    video: true
  }, function (error, success) {
    if (error) {
        document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
      } else {
           document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
        document.getElementById('start').style.display = 'block';
        console.log("User connected with getUserMedia() Stream.")
        this.sl.getPeers(true, function (error, success) {
           if (error) return;
           console.log("The list of all Peers in the same App space ->", success);
        });
      }
  });
}


leaveRoom(){ this.sl.leaveRoom(); }

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
