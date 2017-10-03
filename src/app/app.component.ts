import { Component } from '@angular/core';
declare var Skylink: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor() {
  }

  ngOnInit() {
    var sl = new Skylink()
    console.log(sl)

}
}
