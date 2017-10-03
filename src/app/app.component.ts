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

  constructor() {


  }




  ngOnInit() {

    console.log(this.sl)
    AdapterJS.webRTCReady(function(isUsingPlugin) {
    // The WebRTC API is ready.
    //isUsingPlugin: true is the WebRTC plugin is being used, false otherwise

})
this.sl.init({
  apiKey:'9ee78bfb-e7ee-4998-b3fd-c77daeccf06f',
  defaultRoom:'GogabE'
})
this.sl.on('peerJoined', function(peerId, peerInfo ,isSelf){
  if(isSelf) return
  console.log('Peer ' + peerId + ' has joined the room');
  var peerVideo = document.createElement('video');
  peerVideo.id = peerId + '_video';
  peerVideo.autoplay = true
  peerVideo.muted=true
  document.getElementById('peerVideoList').appendChild(peerVideo);
})

this.sl.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  AdapterJS.attachMediaStream(vid, stream);
});

this.sl.on('addPeerStream', function(peerId, stream){
  // attachMediaStream is a Adapter function
  AdapterJS.attachMediaStream(document.getElementById(peerId + '_video'), stream);
});
// User's Audio/Video stream has been successfully added
this.sl.on('mediaAccessSuccess', function(stream){
  // attachMediaStream is a Adapter function
  AdapterJS.attachMediaStream( document.getElementById('localVideo'), stream );
});
// A Peer has left the room
this.sl.on('peerLeft', function(peerId){
  var peer = document.getElementById(peerId + '_video');
  document.getElementById('peerVideoList').removeChild(peer);
});



}

joinRoom(){ this.sl.joinRoom({ audio : true, video : true }); }
leaveRoom(){ this.sl.leaveRoom(); }
}







//
//
// var skylink = new Skylink();
// skylink.setLogLevel(4);
// skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
//   if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
//   var vid = document.createElement('video');
//   vid.autoplay = true;
//   vid.muted = true; // Added to avoid feedback when testing locally
//   vid.id = peerId;
//   document.body.appendChild(vid);
// });
//
// skylink.on('incomingStream', function(peerId, stream, isSelf) {
//   if(isSelf) return;
//   var vid = document.getElementById(peerId);
//   attachMediaStream(vid, stream);
// });
//
// skylink.on('peerLeft', function(peerId) {
//   var vid = document.getElementById(peerId);
//   document.body.removeChild(vid);
// });
//
// skylink.on('mediaAccessSuccess', function(stream) {
//   var vid = document.getElementById('myvideo');
//   attachMediaStream(vid, stream);
// });
//
// skylink.init({
//   apiKey: 'f1773757-5f8b-42dc-b1ef-2374066866f6', // Get your own key at https://console.temasys.io
//   defaultRoom: 'GogabE'//getRoomId()
// }, function (error, success) {
//   if (error) {
//     document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
//   } else {
//        document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
//     document.getElementById('start').style.display = 'block';
//   }
// });
//
// function start(event) {
//   event.target.style.visibility = 'hidden';
//
//   skylink.joinRoom({
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
//
//
// /* Helper functions */
//
// function getRoomId() {
//   var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
//   if(roomId) {
//     return roomId[1];
//   }
//   else {
//     roomId = skylink.generateUUID();
//     var date = new Date();
//     date.setTime(date.getTime() + (30*24*60*60*1000));
//     document.cookie = 'roomId=' + roomId + '; expires=' + date.toGMTString() + '; path=/';
//     return roomId;
//   }
// };
//
