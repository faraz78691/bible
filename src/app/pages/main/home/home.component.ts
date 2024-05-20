import { Component, ElementRef, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ApiService } from 'src/app/services/api.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
import { TableModule } from 'primeng/table';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CKEditorModule, FormsModule, PaginatorModule, TableModule, FooterComponent, ShareButtonsModule,
    ShareIconsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customize = false;
  customize2 = false;
  public Editor = DecoupledEditor;
  public Editor2 = DecoupledEditor;
  public editorData = '';
  public editorData2 = '';
  public editorData3 = '';
  public editorData4 = '';
  verse_number = '';
  verse = '';
  isActiveLabel = computed(() => this.apiService.verses());
  keywordDatas = computed(() => this.apiService.keywordVerseData());
  verseDay$!: Observable<any>;
  verseOftheDay: any = {};
  notes: string = '';
  representatives: any[];
  constructor(private loaderService: LoaderService, private apiService: ApiService) {
    this.representatives = [
      { name: "Amy Elsner", image: 'amyelsner.png' },
      { name: "Anna Fali", image: 'annafali.png' },
      { name: "Asiya Javayant", image: 'asiyajavayant.png' },
      { name: "Bernardo Dominic", image: 'bernardodominic.png' },
      { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
      { name: "Ioni Bowcher", image: 'ionibowcher.png' },
      { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
      { name: "Onyama Limba", image: 'onyamalimba.png' },
      { name: "Stephen Shaw", image: 'stephenshaw.png' },
      { name: "Xuxue Feng", image: 'xuxuefeng.png' }
    ];
  }


  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  ngOnInit(): void {


    this.verseDay$ = this.apiService.getApi('getBibleVerseOfTheDay').pipe(tap(value => {
      console.log(value);
      this.verseOftheDay = value.data;
    }))

    this.loaderService.removeLoaderClass();
  };

  onEditorChange(event: any) {
    this.editorData = event.editor.getData();
  };
  onEditorChange2(event: any) {
    this.editorData2 = event.editor.getData();
  };
  onEditorChange3(event: any) {
    this.editorData3 = event.editor.getData();
  };
  onEditorChange4(event: any) {
    this.editorData4 = event.editor.getData();
  };

  getVersions() {
    this.apiService.getApi('getVersion')
  };

  getVerseOfTheDay() {
    this.apiService.getApi('getBibleVerseOfTheDay')
  };


  clearResults() {
    this.apiService.verses.set([]);

  };

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal2') closeModal2!: ElementRef;

  saveVerse() {
    // console.log("yo", this.verseOftheDay);
    // return
    const formData = new URLSearchParams();
    formData.set('book_name', this.verseOftheDay.book_name)
    formData.set('chapter', this.verseOftheDay.chapter)
    formData.set('verse_number', this.verseOftheDay.verse_number)
    formData.set('verse', this.verseOftheDay.verse)
    formData.set('notes', this.notes)

    this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          document.getElementById('modalClose')?.click()
          this.closeModal.nativeElement.click();
          this.apiService.showSuccess(res.message);
        }
      }
    })

  };



  saveVerse2() {
    console.log("yo", this.isActiveLabel());
    
    const formData = new URLSearchParams();
    formData.set('book_name', this.isActiveLabel()[0]?.book_name)
    formData.set('chapter', this.isActiveLabel()[0]?.chapter)
    formData.set('verse_number', this.isActiveLabel()[0]?.verse_number)
    formData.set('verse', this.verseOftheDay.verse)
    formData.set('notes', this.notes)

    this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          document.getElementById('modalClose')?.click()
          this.closeModal2.nativeElement.click();
          this.apiService.showSuccess(res.message);
        }
      }
    })

  };


  customizeVerse() {
    this.customize = !this.customize;
    this.editorData = `<p>${this.verseOftheDay.book_name} ${this.verseOftheDay.verse_number}:${this.verseOftheDay.chapter}</p>`
    this.editorData2 = `<p>${this.verseOftheDay.verse}</p>`

  };

  customizeVerse2() {
    console.log("called f")
    console.log("called",this.isActiveLabel())
    this.editorData3 = `<p>${this.isActiveLabel()[0]?.book_name} ${this.isActiveLabel()[0]?.verse_number}:${this.isActiveLabel()[0]?.chapter}</p>`
    this.editorData4 = `<p>${this.isActiveLabel()[0]?.verse}</p>`
  };


  saveEditedVerse(message: any) {
    console.log(this.editorData);
    console.log(this.editorData2);

    const formData = new URLSearchParams();
    formData.set('verse_number', this.editorData)
    formData.set('verse', this.editorData2)
    formData.set('notes', message.value)

    this.apiService.postAPI('saveEditedBibleVerses', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          // document.getElementById('modalClose')?.click()
          this.apiService.showSuccess(res.message)
          this.customize = false;
        }
      }
    })
  }

  saveEditedVerse2(message: any) {
    console.log(this.editorData3);
    console.log(this.editorData4);
    
     const formData = new URLSearchParams();
     formData.set('verse_number', this.editorData3)
     formData.set('verse', this.editorData4)
     formData.set('notes', message.value)
 
     this.apiService.postAPI('saveEditedBibleVerses', formData.toString()).subscribe({
       next: res => {
         console.log(res)
         if (res.success == true) {
           // document.getElementById('modalClose')?.click()
           this.apiService.showSuccess(res.message)
           this.customize2 = false;
         }
       }
     })
   }

}
