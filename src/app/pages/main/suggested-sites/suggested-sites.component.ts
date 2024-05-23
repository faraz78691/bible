import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggested-sites',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './suggested-sites.component.html',
  styleUrls: ['./suggested-sites.component.css']
})
export class SuggestedSitesComponent {

  data: any[] = [];

  constructor(private route: Router, private service: ApiService) { }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getApi('getSuggestedLinks').subscribe({
      next: resp => {
        this.data = resp.data.reverse();
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

}
