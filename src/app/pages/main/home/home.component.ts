import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ApiService } from 'src/app/services/api.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CKEditorModule, FormsModule, PaginatorModule,TableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customize = false;
  public Editor = DecoupledEditor;
  public Editor2 = DecoupledEditor;
  public editorData = '';
  public editorData2 = '<p>Hello, world!</p>';
  verse_number = '';
  verse = '';
  isActiveLabel = computed(() => this.apiService.verses());
  verseDay$!: Observable<any>;
  verseOftheDay: any = {};
  notes: string = '';
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }


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

  getVersions() {
    this.apiService.getApi('getVersion')
  };

  getVerseOfTheDay() {
    this.apiService.getApi('getBibleVerseOfTheDay')
  };


  clearResults() {
    this.apiService.verses.set([]);

  };

  saveVerse() {
    console.log("yo", this.verseOftheDay);
    const formData = new URLSearchParams();
    formData.set('verse_number', this.verseOftheDay.verse_number)
    formData.set('verse', this.verseOftheDay.verse)
    formData.set('notes', this.notes)

    this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          document.getElementById('modalClose')?.click()
        }
      }
    })

  };


  customizeVerse() {
    this.customize = !this.customize;
    this.editorData = `<p>${this.verseOftheDay.verse_number}</p>`
    this.editorData2 = `<p>${this.verseOftheDay.verse}</p>`
   
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

}
