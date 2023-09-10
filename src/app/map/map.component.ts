import { Component } from '@angular/core';
import { GeoApiService } from '../geo-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  public countryData: any; // This will hold the data fetched from the API.

  constructor(private geoApiService: GeoApiService) { } // Inject the service

  onCountryHover(event: MouseEvent) {
    let countryElement = event.target as SVGPathElement;
    let countryId = countryElement.id;
    let countryName = countryElement.getAttribute('name') || countryElement.getAttribute('class');

    if (countryId) {
      this.fetchCountryData(countryId);
    } else if (countryName) {
      this.fetchCountryDataByName(countryName);
    }
  }

  fetchCountryData(countryId: string) {
    this.geoApiService.getCountryInfo(countryId).subscribe(data => {
      console.log('Raw API Response:', JSON.stringify(data));
      if (data.geonames && data.geonames.length > 0) {
        this.countryData = data.geonames[0];
        if (this.countryData.isoAlpha3) {
          this.fetchIncomeLevelData(this.countryData.isoAlpha3);
        } else {
          console.error('No isoAlpha3 code found in GeoNames response.');
        }
      }
    });
  }

  fetchCountryDataByName(countryName: string) {
    this.geoApiService.getCountryInfoByName(countryName).subscribe(data => {
      console.log('API Response by Name:', data);
      if (data.geonames && data.geonames.length > 0) {
        const countryCode = data.geonames[0].countryCode;
        if (countryCode) {
          this.fetchCountryData(countryCode);
        }
      }
    });
  }

  fetchIncomeLevelData(isoAlpha3: string) {
    this.geoApiService.getIncomeLevelByCountry(isoAlpha3).subscribe(response => {
      if (response && response[1] && response[1].length > 0) {
        const worldBankData = response[1][0];
        this.countryData.region = worldBankData.region?.value;
        this.countryData.income = worldBankData.incomeLevel?.value;
      }
    });
  }

}
