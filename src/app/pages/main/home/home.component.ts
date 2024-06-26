import { Component, ElementRef, ViewChild, computed, effect } from '@angular/core';
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
import html2canvas from 'html2canvas';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
import { TableModule } from 'primeng/table';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from 'src/app/helper/safe-html.pipe';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, CKEditorModule, FormsModule, PaginatorModule, TableModule, FooterComponent, ShareButtonsModule,
    ShareIconsModule, SafeHtmlPipe]
})
export class HomeComponent {
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


  // ngAfterViewInit() {
  //   console.log("aferr view init");
  //   this.updateShareContent();
  // }
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
    this.addOpenGraphTags();
  };

  

  addOpenGraphTags() {
    this.metaService.addTags([
      { property: 'og:title', content: 'Bible Verse' },
      { property: 'og:description', content: 'For perhaps he therefore departed for a season, that thou shouldest receive him for ever;' },
      { property: 'og:image', content: 'http://52.204.188.107/path-to-your-image.jpg' },
      { property: 'og:url', content: this.shareUrl },
      { property: 'og:type', content: 'website' }
    ]);
  }


  updateShareContent() {
    html2canvas(this.contentDiv?.nativeElement).then(canvas => {
      this.shareImageUrl = canvas.toDataURL('image/png');
    });
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
    this.getEditShortURl(this.shareUrl)
  };

  makeEditedURl() {
    this.shareButton2 = !this.shareButton2
    // const contentElement = this.contentDiv?.nativeElement.cloneNode(true);
    // const linkElement = contentElement.querySelector('.ct_page_link');

    // if (linkElement) {
    //   linkElement.style.display = 'block';
    // }
    const content = this.customizeDiv?.nativeElement.innerHTML;
    this.shareText = encodeURIComponent(content);

    this.shareEditUrl = `http://52.204.188.107/content?content=${this.shareText}`;
    this.getEditShortURl(this.shareEditUrl)
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


  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  };

  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }


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


  clearResults(key: string) {
    if (key) {
      key == 'keyword';
      this.apiService.keywordVerseData.set([]);
    } else {
      this.apiService.verses.set([]);

    }

  };

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal2') closeModal2!: ElementRef;

  saveVerse() {

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
          this.notes = '';
        }
      }
    })

  };

  setKeywordData(items: any) {
    this.keywordItems = items
    console.log(this.keywordItems);
  }



  saveVerse2() {
    const formData = new URLSearchParams();
    formData.set('book_name', this.isActiveLabel()[0]?.book_name)
    formData.set('chapter', this.isActiveLabel()[0]?.chapter)
    formData.set('verse_number', this.isActiveLabel()[0]?.verse_number)
    formData.set('verse', this.verseOftheDay.verse)
    formData.set('notes', this.notes)

    this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          document.getElementById('modalClose')?.click()
          this.closeModal2.nativeElement.click();
          this.apiService.showSuccess(res.message);
          this.notes = '';
        }
      }
    })
  };
  saveKeywordVerse() {
    const formData = new URLSearchParams();
    formData.set('book_name', this.keywordItems?.book_name)
    formData.set('chapter', this.keywordItems?.chapter)
    formData.set('verse_number', this.keywordItems?.verse_number)
    formData.set('verse', this.keywordItems.verse)
    formData.set('notes', this.notes)

    this.apiService.postAPI('saveBibleVerses', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          document.getElementById('modalClose')?.click()
          this.apiService.showSuccess(res.message);
          this.notes = '';
          this.keywordItems = ''
        }
      }
    })
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


  customizeVerse() {
    this.customize = !this.customize;
    this.editorData = `<h4>${this.verseOftheDay.book_name} ${this.verseOftheDay.chapter}:${this.verseOftheDay.verse_number}</h4>`
    this.editorData2 = `<p>${this.verseOftheDay.verse}</p>`

  };

  customizeVerse2() {
    console.log("called f")
    console.log("called", this.isActiveLabel())
    this.editorData3 = `<h4>${this.isActiveLabel()[0]?.book_name} ${this.isActiveLabel()[0]?.chapter}:${this.isActiveLabel()[0]?.verse_number}</h4>`
    this.editorData4 = `<p>${this.isActiveLabel()[0]?.verse}</p>`
  };


  saveEditedVerse(message: any) {
    console.log('editorData', this.editorData3);
    console.log('editorData2', this.editorData4);
    const formData = new URLSearchParams();
    formData.set('verse_number', this.editorData)
    formData.set('verse', this.editorData2)
    formData.set('notes', message.value)
    formData.set('bg_image', this.selectedTempalte)

    this.apiService.postAPI('saveEditedBibleVerses', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          // document.getElementById('modalClose')?.click()
          this.apiService.showSuccess(res.message)
          this.customize = false;
          this.selectedTempalte = 'verse_day1.jpg';
        }
      }
    })
  }

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

  getChapter() {
    // const formData = new URLSearchParams();
    // formData.set('book_name', this.verseOftheDay.book_name)
    // formData.set('chatperNo', this.verseOftheDay.chapter)
    // formData.set('table_name', 'kjvbible')
    this.route.navigateByUrl(`main/bible_chapter/${this.verseOftheDay.book_name}`);
    this.apiService.setBookDetails(this.verseOftheDay.book_name, this.verseOftheDay.chapter)
  };

  getSearchChapter() {
    // const formData = new URLSearchParams();
    // formData.set('book_name', this.verseOftheDay.book_name)
    // formData.set('chatperNo', this.verseOftheDay.chapter)
    // formData.set('table_name', 'kjvbible')
    this.route.navigateByUrl(`main/bible_chapter/${this.isActiveLabel()[0]?.book_name}`);
    this.apiService.setBookDetails(this.isActiveLabel()[0]?.book_name, this.isActiveLabel()[0]?.chapter)
  };




}
