import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoldApiService {

  private apiUrl = 'https://www.goldapi.io/api/XAU/GBP';
  private headers = new HttpHeaders({
    'x-access-token': '**************',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  fetchGoldData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }
}
