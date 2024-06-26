import { Component, ElementRef, ViewChild, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Observable, tap } from 'rxjs';
import { SafeHtmlPipe } from "../../../helper/safe-html.pipe";
import { FooterComponent } from "../footer/footer.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-customize',
    standalone: true,
    templateUrl: './customize.component.html',
    styleUrls: ['./customize.component.css'],
    imports: [CommonModule, CKEditorModule, FormsModule, PaginatorModule, TableModule, FooterComponent, ShareButtonsModule,
      ShareIconsModule, SafeHtmlPipe]
})
export class CustomizeComponent {
  customize = false;
  customize2 = false;
  shareButton = false;
  shareButton2 = false;
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
  template$!: Observable<any>;
  verseOftheDay: any = {};
  notes: string = '';
  @ViewChild('contentDiv') contentDiv: ElementRef | undefined;
  @ViewChild('customizeDiv') customizeDiv: ElementRef | undefined;
  @ViewChild('searchedDiv') searchedDiv: ElementRef | undefined;
  @ViewChild('searchcustomizeDiv') searchcustomizeDiv: ElementRef | undefined;
  shareUrl: string = '';
  shareImageUrl: string = '';
  shareEditUrl: string = '';
  shareText?: string;
  verseNumber = '';
  getVerse = '';
  randomTableID: any;
  selectedTempalte: string = 'verse_day1.jpg';
  customMessage: string = '';
  keywordItems: any;

  
  public config  = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', '|',
      'link', 'bulletedList', 'numberedList', 'blockQuote', 'fontColor', 'fontBackgroundColor'
    ],
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
      ]
    },
    fontColor: {
      colors: [
        {
          color: '#CF5D4E',
          label: 'Red'
        },
        {
          color: '#454545',
          label: 'Dark Gray'
        },
        {
          color: '#FFFFFF',
          label: 'White'
        },
        {
          color: '#CCCCCC',
          label: 'Light Gray'
        },
        {
          color: '#0000FF',
          label: 'Blue'
        },
        {
          color: '#3892DD',
          label: 'Light Blue'
        }
      ],
      columns: 6,
      documentColors: 0
    },
    fontBackgroundColor: {
      colors: [
        {
          color: '#CF5D4E',
          label: 'Red'
        },
        {
          color: '#454545',
          label: 'Dark Gray'
        },
        {
          color: '#FFFFFF',
          label: 'White'
        },
        {
          color: '#CCCCCC',
          label: 'Light Gray'
        },
        {
          color: '#0000FF',
          label: 'Blue'
        },
        {
          color: '#3892DD',
          label: 'Light Blue'
        }
      ],
      columns: 6,
      documentColors: 0
    }
  };
  constructor(private loaderService: LoaderService, public apiService: ApiService, private route: Router, private metaService: Meta) {
    effect(() => {
      if (this.apiService.verses().length > 0) {
        setTimeout(() => {
          console.log("effect is  working")
          this.searchShareContent()

        }, 1000)
      }
    })
  };

  ngOnInit(): void {
    this.verseDay$ = this.apiService.getApi('getBibleVerseOfTheDay').pipe(tap(value => {
      this.randomTableID = value.data.id;
      this.verseOftheDay = value.data;
      console.log('verseOftheDay', this.verseOftheDay);
      setTimeout(() => {
        this.updateShareContent()
      }, 1000)
      // console.log("ngonint");

    }))

    this.template$ = this.apiService.getApi('getCardTemplate')

    this.loaderService.removeLoaderClass();
  
  };

  searchShareContent() {
    console.log("function");
    const contentElement = this.searchedDiv?.nativeElement.cloneNode(true);
    console.log("contentElement", contentElement);
    const linkElement = contentElement.querySelector('.ct_searchedDiv');

    if (linkElement) {
      linkElement.style.display = 'block';
    }
    const content = contentElement.innerHTML;
    console.log("content", content);
    this.shareText = encodeURIComponent(content);

    this.shareUrl = `http://52.204.188.107/content?content=${this.shareText}`;
    // this.getEditShortURl(this.shareUrl)
  };

  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  updateShareContent() {
    // html2canvas(this.contentDiv?.nativeElement).then(canvas => {
    //   this.shareImageUrl = canvas.toDataURL('image/png');
    // });
    const contentElement = this.contentDiv?.nativeElement.cloneNode(true);
    const linkElement = contentElement.querySelector('.ct_page_link');

    if (linkElement) {
      linkElement.style.display = 'block';
    }
    const content = contentElement.innerHTML;
    this.shareText = encodeURIComponent(content);

    this.shareUrl = `http://52.204.188.107/content?content=${this.shareText}`;
    this.getShortURl(this.shareUrl, this.randomTableID)
  };

  getShortURl(fullUrl: string, id: any) {

    const formData = new URLSearchParams();
    formData.set('full_url', fullUrl)
    formData.set('id', id)


    this.apiService.postAPI('getshortURl', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          this.shareUrl = `http://52.204.188.107/content?content=${res.data}`;

        }
      }
    })

  };
  onEditorChange3(event: any) {
    this.editorData3 = event.editor.getData();
  };
  onEditorChange4(event: any) {
    this.editorData4 = event.editor.getData();
  };

  searchedEditedURl() {
    this.shareButton2 = !this.shareButton2
    // const contentElement = this.contentDiv?.nativeElement.cloneNode(true);
    // const linkElement = contentElement.querySelector('.ct_page_link');

    // if (linkElement) {
    //   linkElement.style.display = 'block';
    // }
    const content = this.searchcustomizeDiv?.nativeElement.innerHTML;
    this.shareText = encodeURIComponent(content);

    this.shareEditUrl = `http://52.204.188.107/content?content=${this.shareText}`;
    this.getEditShortURl(this.shareEditUrl)
  };

  getEditShortURl(fullUrl: string) {
    console.log(fullUrl)
    const formData = new URLSearchParams();
    formData.set('full_url', fullUrl)




    this.apiService.postAPI('getEditshortURl', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          this.shareEditUrl = `http://52.204.188.107/content?content=${res.data}`;

        }
      }
    })

  };

  saveEditedVerse2(message: any) {
    console.log('editorData3', this.editorData3);
    console.log('editorData4', this.editorData4);

    const formData = new URLSearchParams();
    formData.set('verse_number', this.editorData3)
    formData.set('verse', this.editorData4)
    formData.set('notes', message.value)
    formData.set('bg_image', this.selectedTempalte)
    this.apiService.postAPI('saveEditedBibleVerses', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          // document.getElementById('modalClose')?.click()
          this.apiService.showSuccess(res.message)
          this.customize2 = false;
          this.selectedTempalte = 'verse_day1.jpg';
        }
      }
    })
  }
}
