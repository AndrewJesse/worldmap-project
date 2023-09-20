import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoldApiService {

  private apiUrl = 'https://www.goldapi.io/api/XAU/USD';

  constructor(private http: HttpClient) { }

  private fetchApiKey(): Observable<string> {
    return this.http.get('assets/api-keys.json').pipe(
      map((config: any) => config.GOLD_API_KEY)
    );
  }

  fetchGoldData(): Observable<any> {
    return this.fetchApiKey().pipe(
      switchMap(apiKey => {
        const headers = new HttpHeaders({
          'x-access-token': apiKey,
          'Content-Type': 'application/json'
        });
        return this.http.get(this.apiUrl, { headers: headers });
      })
    );
  }
}
