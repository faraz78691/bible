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
  chapterVerses:any[] = [];
  selectedVersion = computed(() => {
   return this.apiService.versionSelected()
  });
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }

  ngOnInit() {
    const table_name = this.apiService.getData();
    console.log(table_name);
    this.getChapters()
  };




  getChapters() {
    const formData = new URLSearchParams();
    formData.set('table_name',this.selectedVersion())
    formData.set('book_name',this.chapter)
    formData.set('chatperNo',this.chapterNo.toString())

    this.apiService.postAPI('getChapters', formData.toString()).subscribe({
      next: res => {
        if(res.success == true){
          this.chapterVerses = res.data
        }
        console.log(res);
      }
    })
  }


  previous() {
if(this.chapterNo == 1){
  return
}this.chapterNo--;
this.getChapters()
  };



  next() {
 this.chapterNo++;
 this.getChapters()
 console.log(this.chapterNo);
  }

}
