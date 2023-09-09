import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  onCountryHover(event: MouseEvent) {
    let countryElement = event.target as SVGPathElement;
    let countryId = countryElement.id || countryElement.getAttribute('class');

    if (countryId) {
      this.fetchCountryData(countryId); // or your method to fetch data
    }
  }

  fetchCountryData(countryId: string) {
    // Your logic to fetch data goes here, likely involving the GeoApiService you created earlier
  }
}
