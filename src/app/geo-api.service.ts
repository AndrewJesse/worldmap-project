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
}
