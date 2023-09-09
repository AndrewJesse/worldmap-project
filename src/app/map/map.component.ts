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
    let countryId = countryElement.id || countryElement.getAttribute('class');
    if (countryId) {
      this.fetchCountryData(countryId);
    }
  }

  fetchCountryData(countryId: string) {
    this.geoApiService.getCountryInfo(countryId).subscribe(data => {
      if (data.geonames && data.geonames.length > 0) {
        this.countryData = data.geonames[0];
      }
    });
  }
}
