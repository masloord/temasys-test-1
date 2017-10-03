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
this.sl.init('9ee78bfb-e7ee-4998-b3fd-c77daeccf06f')
this.sl.on('peerJoined', function(peerId, peerInfo){
  console.log('Peer ' + peerId + ' has joined the room');
  var peerVideo = document.createElement('video');
  peerVideo.id = peerId + '_video';
  peerVideo.autoplay = true
  document.getElementById('peerVideoList').appendChild(peerVideo);
})

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
