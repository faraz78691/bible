import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-bible-chapter',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './bible-chapter.component.html',
  styleUrls: ['./bible-chapter.component.css']
})
export class BibleChapterComponent {
  @Input() chapter = '';
  chapterNo = 1;
  bookName: any;
  chapterNo1: any;
  chapterVerses: any[] = [];
  selectedVersion = computed(() => {
    return this.apiService.versionSelected()
  });
  
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }

  ngOnInit() {
    const table_name = this.apiService.getData();
    //console.log(table_name);
    this.getChapters();
  };


  getChapters() {
    const formData = new URLSearchParams();
    if (!this.apiService.getBookDetails()[0]?.chapterNo) {
      formData.set('table_name', this.selectedVersion())
      formData.set('book_name', this.chapter)
      formData.set('chatperNo', this.chapterNo.toString())
    } else {
      formData.set('book_name', this.apiService.getBookDetails()[0]?.bookName);
      formData.set('chatperNo', this.apiService.getBookDetails()[0]?.chapterNo);
      formData.set('table_name', 'kjvbible');
      this.chapterNo = parseInt(this.apiService.getBookDetails()[0]?.chapterNo);
      this.apiService.setBookDetails(this.bookName = undefined, this.chapterNo1 = undefined)
      // const num = parseInt(this.apiService.getBookDetails()[0]?.chapterNo)
      // if(num !== this.chapterNo){
      //   this.chapterNo = parseInt(this.apiService.getBookDetails()[0]?.chapterNo);
      //   console.log('chanptr num', this.chapterNo)
      // }     
    }

    this.apiService.postAPI('getChapters', formData.toString()).subscribe({
      next: res => {
        if (res.success == true) {
          this.chapterVerses = res.data;
        }
        console.log(res);
      }
    })
  }


  ngOnDestroy(): void {
    this.apiService.setBookDetails(this.bookName = undefined, this.chapterNo1 = undefined)
  }


  previous() {
    if (this.chapterNo == 1) {
      return
    }
    this.chapterNo--;
    this.getChapters()
  };

  next() {
    this.chapterNo++;
    this.getChapters();
    console.log(this.chapterNo);
  }


}
