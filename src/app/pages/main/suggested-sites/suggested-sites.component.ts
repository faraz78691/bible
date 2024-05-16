import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-suggested-sites',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './suggested-sites.component.html',
  styleUrls: ['./suggested-sites.component.css']
})
export class SuggestedSitesComponent {

}
