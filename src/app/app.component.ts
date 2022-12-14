import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'RegistrApp';
  showLoadingScreen: boolean = false;

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    this.dataService.loadingScreen.subscribe( x =>{
      this.showLoadingScreen = x;
    });
  }
}
