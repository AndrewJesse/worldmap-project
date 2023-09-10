import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {

  private readonly BASE_URL = 'http://api.geonames.org/';
  private readonly USERNAME = 'ajman789';

  constructor(private http: HttpClient) { }

  getCountryInfo(countryCode: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}countryInfoJSON`, {
      params: {
        country: countryCode,
        username: this.USERNAME
      }
    });
  }
  getCountryInfoByName(countryName: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}searchJSON`, {
      params: {
        name: countryName,
        maxRows: '1',
        username: this.USERNAME
      }
    });
  }
  getIncomeLevelByCountry(isoAlpha3: string): Observable<any> {
    return this.http.get<any>(`http://api.worldbank.org/v2/country/${isoAlpha3}?format=json`);

  }
}
