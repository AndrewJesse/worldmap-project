import { Component } from '@angular/core';
import { GeoApiService } from '../geo-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  public countryData: any; // This will hold the data fetched from the API.

  constructor(private geoApiService: GeoApiService) { } // Inject the service here

  onCountryHover(event: MouseEvent) {
    let countryElement = event.target as SVGPathElement;
    let countryId = countryElement.id;
    let countryName = countryElement.getAttribute('name') || countryElement.getAttribute('class');

    if (countryId) {
      this.fetchCountryData(countryId, () => {
        console.log(`Mouse hovered over country with ID: ${countryId}`);
      });
    } else if (countryName) {
      this.fetchCountryDataByName(countryName, () => {
        console.log(`Mouse hovered over country with Name: ${countryName}`);
      });
    }
  }

  fetchCountryDataByName(countryName: string, callback: () => void) {
    this.geoApiService.getCountryInfoByName(countryName).subscribe(data => {
      console.log('API Response by Name:', data);
      if (data.geonames && data.geonames.length > 0) {
        const countryCode = data.geonames[0].countryCode;
        if (countryCode) {
          this.fetchCountryData(countryCode, callback);
        }
      }
    });
  }



  fetchCountryData(countryId: string, callback: () => void) {
    this.geoApiService.getCountryInfo(countryId).subscribe(data => {
      //console.log('API Response:', data);
      console.log('Raw API Response:', JSON.stringify(data));
      if (data.geonames && data.geonames.length > 0) {
        this.countryData = data.geonames[0];
        callback();
      }
    });
  }

}
