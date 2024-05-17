import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  version$!: Observable<any>;
  name$!: Observable<any>;
  verse_number: string = '';
  keyWord: string = ''
  selectedOption: string = 'kjvbible';
  selectedBookName: string = '';

  bookName: string = '';

  selectedChapter: any = '';
  selectedVerse: any = 0;
  bookNames: any[] = [];
  chapterNo: any[] = [];
  varseNo: any[] = [];

  verseSignal = computed(() => {
    this.apiService.verses()
  })

  constructor(private apiService: ApiService) {
    this.apiService.versionSelected.set(this.selectedOption)
  }

  ngOnInit() {
    this.version$ = this.apiService.getApi('getversion').pipe(tap((items: any) => {
      this.selectedOption = items.data[0].table_name;
      this.getBooksName()
      
    }))
  }

  search_verse() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    formData.set("verse_no", this.verse_number)

    this.apiService.postAPI('getVerses', formData.toString()).subscribe({
      next: res => {
        this.apiService.verses.set(res.data);
        console.log(this.apiService.verses());

      }
    })
  };

  search_keyword() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    formData.set("keyword", this.keyWord)
    this.apiService.postAPI('getBibleVersesByKeyword', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          this.apiService.keywordVerseData.set(res.data)
          console.log(this.apiService.keywordVerseData());
        }
        // this.apiService.verses.set(res.data);
        // console.log(this.apiService.verses());
      }
    })
  };

  logout() {
    this.apiService.logout();
  }


  onChangeVersion(option: any) {
    this.selectedOption = option.target.value;
    this.apiService.versionSelected.set(this.selectedOption)
    this.getBooksName();
  }

  getBooksName() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    this.apiService.postAPI('getBooksByVersion', formData.toString()).subscribe({
      next: resp => {
        this.bookNames = resp.data;
        this.selectedBookName = this.bookNames[0].book_name;
        this.getChapterNo()
      }
    })
  }

  onChangeName(option: any) {
    this.selectedBookName = option.target.value;
    console.log(this.selectedBookName)
    this.getChapterNo();
    //this.apiService.versionSelected.set(this.selectedOption)
  }

  getChapterNo() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    formData.set("book_name", this.selectedBookName)
    this.apiService.postAPI('getChaptersNo', formData.toString()).subscribe({
      next: resp => {
        this.chapterNo = resp.data;
        // this.selectedChapter = this.chapterNo[0].chapter;
        // this.getVerseNo();
      }
    })
  }

  onChangeChapter(option: any) {
    this.selectedChapter = option.target.value;
    this.getVerseNo();
    //this.apiService.versionSelected.set(this.selectedOption)
  }

  getVerseNo() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    formData.set("book_name", this.selectedBookName)
    formData.set("chatperNo", this.selectedChapter)
    this.apiService.postAPI('getVerseNo', formData.toString()).subscribe({
      next: resp => {
        this.varseNo = resp.data;
        this.selectedVerse = this.varseNo[0].verse_number
      }
    })
  }


}
