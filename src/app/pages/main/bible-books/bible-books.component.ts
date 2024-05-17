import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-bible-books',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterLink],
  templateUrl: './bible-books.component.html',
  styleUrls: ['./bible-books.component.css']
})
export class BibleBooksComponent {




  // savedverse$!: Observable<any>;
  booktestament$!: Observable<any>;
 
 
  notedverse: any[] = []

  verseOftheDay: any = {};
  notes: string = '';
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }


  ngOnInit(): void {



    this.booktestament$ = this.apiService.getApi('testaments');
   

    // this.loaderService.removeLoaderClass();
  };

getBooks(){
  const formData = new URLSearchParams();

  this.apiService.postAPI('/getChapters', formData.toString()).subscribe({
    next:res=>{
      console.log(res);
    }
  })
}


}
