import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  image$!: Observable<any>;
  constructor(private loaderService: LoaderService, public apiService: ApiService) {

  }

  ngOnInit(){
    this.image$ = this.apiService.getApi('getbanners')
  }
}
