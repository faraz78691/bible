import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-bible-books',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.css']
})
export class BibleBooksComponent {

}
