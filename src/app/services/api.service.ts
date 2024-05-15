import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
 
})
export class ApiService {
apiUrl = 'http://localhost:4000/'
verses = signal<any>([]);

  constructor(private http:HttpClient) { }

  getApi(url:any):Observable<any>{
    return this.http.get(this.apiUrl + url )
  };
  
  postAPI(url:any, data:any):Observable<any>{
    return this.http.post(this.apiUrl + url ,data )
  };

  getVersions():Observable<any>{
    return this.http.get(this.apiUrl + 'getVersion' )
  }
}
