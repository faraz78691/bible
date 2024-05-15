import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ApiService } from 'src/app/services/api.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CKEditorModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customize = false;
  public Editor = DecoupledEditor;
  public editorData = '<p>Hello, world!</p>';
  isActiveLabel = computed(() => this.apiService.verses());
  verseDay$! :Observable<any>;
  verseOftheDay :any[]= [];
  notes:string = '';
  constructor(private loaderService: LoaderService, private apiService :ApiService) { }


  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  ngOnInit(): void {


this.verseDay$ = this.apiService.getApi('getBibleVerseOfTheDay').pipe(tap(value=>{
console.log(value);
this.verseOftheDay = value.data;
}))
   
    this.loaderService.removeLoaderClass();
  };

  onEditorChange(event: any) {
    this.editorData = event.editor.getData();
  };

  getVersions(){
    this.apiService.getApi('getVersion')
  };

  getVerseOfTheDay(){
    this.apiService.getApi('getBibleVerseOfTheDay')
  };


clearResults(){
  this.apiService.verses.set([]);
   
};

saveVerse(){
const formData = new URLSearchParams();
formData.set('verse_number',this.verseOftheDay[0].verse_number)
formData.set('verse',this.verseOftheDay[0].verse)
formData.set('notes',this.verseOftheDay[0].verse)

this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({next:res=>{
  console.log(res)
}})

}

}
