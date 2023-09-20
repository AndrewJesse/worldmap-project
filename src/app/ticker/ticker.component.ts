import { Component, OnInit } from '@angular/core';
import { GoldApiService } from '../gold-api/gold-api.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit { // Implement the OnInit interface

  public goldData: any;

  constructor(private goldApiService: GoldApiService) { }

  fetchGoldData() {
    this.goldApiService.fetchGoldData().subscribe(
      data => {
        console.log('Gold API Data:', data);
        this.goldData = data;
      },
      error => console.log('error', error)
    );
  }

  ngOnInit() {  // Define the ngOnInit method
    this.fetchGoldData();
  }
}

