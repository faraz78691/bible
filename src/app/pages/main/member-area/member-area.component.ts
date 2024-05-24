import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SafeHtmlPipe } from 'src/app/helper/safe-html.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@Component({
  selector: 'app-member-area',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, FormsModule, ReactiveFormsModule, FooterComponent, ShareButtonsModule,
    ShareIconsModule, SafeHtmlPipe],
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MemberAreaComponent {
  form!: FormGroup;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('savedDiv') savedDiv: ElementRef | undefined;
  @ViewChild('editedDiv') editedDiv: ElementRef | undefined;

  // savedverse$!: Observable<any>;
  shareButton = false;
  savedverse$!: Observable<any>;
  editedverse$!: Observable<any>;
  freinds$!: Observable<any>;
  notedverse: any[] = []

  verseOftheDay: any = {};
  notes: string = '';
  shareUrl: string = '';
  shareEditUrl: string = '';
  shareText?: string;
  activeItemId: number | null = null;
  selectedItems: any;

  constructor(private loaderService: LoaderService, public apiService: ApiService) { }


  ngOnInit(): void {


    this.savedverse$ = this.apiService.getApi('getSavedVerses').pipe(tap(items =>
      this.notedverse = (items.data).reverse().filter((val: any) => val.notes != '')))

    this.editedverse$ = this.apiService.getApi('getEditedVerses');
    this.freinds$ = this.apiService.getApi('getFreidns');
    this.initForm();

    // this.loaderService.removeLoaderClass();
  };

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  };

  setActiveItem(items: any, index: any): void {
    console.log(items);
    this.selectedItems = items;



    if (this.activeItemId == index) {
      this.activeItemId = 0;
      this.selectedItems = '';
    } else {
      this.activeItemId = index;
      setTimeout(() => {
        console.log("effect is  working")
        this.updateShareContent()

      }, 1000)
    }
  };
  setActiveItem2(items: any, index: any): void {
    console.log(items);
    this.selectedItems = items;
    if (this.activeItemId == index) {
      this.activeItemId = 0;
      this.selectedItems = '';
    } else {
      this.activeItemId = index;
      setTimeout(() => {
        console.log("effect is  working")
        this.updateShareContent2()

      }, 1000)
    }
  };


  updateShareContent() {

    const contentElement = this.savedDiv?.nativeElement.cloneNode(true);
    const linkElement = contentElement.querySelector('.ct_searchedDiv');
    
    if (linkElement) {
      linkElement.style.display = 'block';
    }
    const content = contentElement.innerHTML;
    this.shareText = encodeURIComponent(content);

    this.shareUrl = `http://52.204.188.107:4000/content?content=${this.shareText}`;
    this.getEditShortURl(this.shareUrl)
  };
  updateShareContent2() {
    const contentElement = this.editedDiv?.nativeElement.cloneNode(true);
    const linkElement = contentElement.querySelector('.ct_searchedDiv2');
    console.log(contentElement);
    if (linkElement) {
      linkElement.style.display = 'block';
    }
    const content = contentElement.innerHTML;
    this.shareText = encodeURIComponent(content);

    this.shareUrl = `http://52.204.188.107:4000/content?content=${this.shareText}`;
    this.getEditShortURl(this.shareUrl)
  };

  getEditShortURl(fullUrl: string) {
    console.log(fullUrl)
    const formData = new URLSearchParams();
    formData.set('full_url', fullUrl);

    this.apiService.postAPI('getEditshortURl', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          this.shareEditUrl = `http://52.204.188.107:4000/content?content=${res.data}`;

        }
      }
    })

  };


  isActive(itemId: number) {
    return this.activeItemId === itemId;
  }
  isActive2(itemId: number) {
    return this.activeItemId === itemId;
  }

  addFriend() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      //this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('name', this.form.value.name);
      formURlData.set('email', this.form.value.email);
      this.apiService.postAPI('addFriends', formURlData.toString()).subscribe({
        next: (resp) => {
          console.log(resp)
          if (resp.success == true) {
            this.apiService.showSuccess(resp.message);
            this.closeModal.nativeElement.click();
            this.freinds$ = this.apiService.getApi('getFreidns');
            //this.loading = false;
            this.form.reset();
          } else {
            this.apiService.showWarning(resp.message);
            //this.loading = false;
          }
        },
        error: (error) => {
          //this.loading = false;
          this.apiService.showError('Something went wrong.');
          console.error('Login error:', error.message);
        }
      });
    }
  }


}
