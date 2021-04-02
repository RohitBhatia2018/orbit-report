//1) Define and Create Satellites
import { Satellite } from './satellite'; 

//Existing Code
import { Component } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  //1) Define and Create Satellites
  sourceList: Satellite[];
  displayList: Satellite[];

constructor() {
  this.sourceList = [];
  this.displayList = [];
  let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

//   Part 5)
 window.fetch(satellitesUrl).then(function(response) {
     response.json().then(function(data) {
        let fetchedSatellites = data.satellites;
        for (let satellite of fetchedSatellites){
          this.sourceList.push(new Satellite(satellite.name, satellite.type, satellite.launchDate, satellite.orbitType, satellite.operational))
        } 
        this.displayList.push(...this.sourceList)
        ///three dots pushes all aspects of sourceList at once instead of using the index for each
     }.bind(this));
  }.bind(this));

}
search(searchTerm: string): void {
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
     let name = this.sourceList[i].name.toLowerCase();
     if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
     }
  } 
  this.displayList = [...matchingSatellites]
}
}
