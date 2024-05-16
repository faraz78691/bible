import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
 
})
export class ApiService {
apiUrl = 'http://192.168.1.18:4000/'
verses = signal<any>([]);
keywordVerseData = signal<any>([]);

  constructor(private http:HttpClient,private toastr: ToastrService, private route: Router) { }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getApi(url:any):Observable<any>{
    return this.http.get(this.apiUrl + url )
  };
  
  postAPI(url:any, data:any):Observable<any>{
    return this.http.post(this.apiUrl + url ,data )
  };

  getVersions():Observable<any>{
    return this.http.get(this.apiUrl + 'getVersion' )
  };

  showSuccess(message:string) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message:string) {
    this.toastr.warning(message, 'Success');
  }
  showError(message:string) {
    this.toastr.error(message, 'Success');
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/');
  }

}
