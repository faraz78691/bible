import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
 
})
export class ApiService {
apiUrl = 'http://192.168.1.18:4000/'
// apiUrl = 'https://e704-2401-4900-1c08-6421-79ee-8067-d19e-afaa.ngrok-free.app/'
verses = signal<any>([]);
versionSelected = signal('');
keywordVerseData = signal<any>([]);
filterSection = signal<any>(true);
  constructor(private http:HttpClient, private toastr: ToastrService, private route: Router) { 
    this.route.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.checkRoute(event.urlAfterRedirects);
    });

  };

    // Function to check the current route and update the boolean variable
    private checkRoute(currentRoute: string): void {
    console.log(currentRoute);
      if (currentRoute.includes('/main/home') ) {
        console.log("here it si");
          this.filterSection.set(true)
      
      } else {
          this.filterSection.set(false)
   
      }
    }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  };

  getData(){
    return this.versionSelected();
  }

  getApi(url:any):Observable<any>{
    return this.http.get(this.apiUrl + url )
  };

  isLogedIn() {
    return this.getToken() !== null;
  }
  
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
