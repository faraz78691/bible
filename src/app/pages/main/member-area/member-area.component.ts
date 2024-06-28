import { Component, ElementRef, ViewChild, ViewEncapsulation, ViewChildren, QueryList, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SafeHtmlPipe } from 'src/app/helper/safe-html.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@Component({
  selector: 'app-member-area',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, FormsModule, ReactiveFormsModule, FooterComponent, ShareButtonsModule,
    ShareIconsModule, SafeHtmlPipe, SelectDropDownModule],
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
  savedSearches$!: Observable<any>;
  notedverse: any[] = [];
  checkedIDs: any[] = [];
  checkedItems: any[] = [];
  checkedIDs2: any[] = [];
  verseOftheDay: any = {};
  notes: string = '';
  shareUrl: string = '';
  shareEditUrl: string = '';
  shareText?: string;
  shareText4: string =''
  activeItemId: number | null = null;
  selectedItems: any;
  selectedTempalte: string = 'mailverse.jpg';
  selectedOption: any[] = [];
  userList: any[] = [];
  editedVer: any[] = [];
  @ViewChildren('customizeDiv') customizeDivs!: QueryList<ElementRef>;

  config2 = {
    displayKey: "name",
    search: true,
    height: 'auto',
    placeholder: 'Select Users',
    //customComparator: () => {},
    limitTo: 0,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    clearOnSelection: false,
    inputDirection: 'ltr',
    multiple: true // Enable multiple selection
  };

  constructor(private loaderService: LoaderService, public apiService: ApiService) { }


  ngOnInit(): void {

    this.savedverse$ = this.apiService.getApi('getSavedVerses').pipe(tap(items =>
      this.notedverse = (items.data).reverse().filter((val: any) => val.notes != '')))

    this.editedverse$ = this.apiService.getApi('getEditedVerses').pipe(tap(items => {
      this.editedVer = items.data
    }))
    this.freinds$ = this.apiService.getApi('getFreidns').pipe(tap(value => {
      this.userList = value.data;
    }))
    this.savedSearches$ = this.apiService.getApi('getSavedSearchesKeys');
    this.initForm();

    // this.loaderService.removeLoaderClass();
  };

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  };



  onCheckboxChange(itemId: any, isChecked: any) {
    if (isChecked.target.checked) {
      this.checkedIDs.push(itemId.id);
      console.log(this.checkedIDs);
      this.checkedItems.push(itemId);
    } else {
      const index = this.checkedIDs.indexOf(itemId);
      if (index > -1) {
        this.checkedIDs.splice(index, 1);
        this.checkedItems.splice(index, 1);
      }
    }
 

  };
  onCheckboxChange2(itemId: any, isChecked: any) {
    if (isChecked.target.checked) {
      this.checkedIDs2.push(itemId.id);
      this.customizeCard(itemId);
      // this.checkedItems.push(itemId);
    } else {
      const index = this.checkedIDs2.indexOf(itemId.id);
      if (index > -1) {
        this.checkedIDs2.splice(index, 1);
        // this.checkedItems.splice(index, 1);
      }
    }

  };

  customizeCard(itemId: number) {
    const index = this.editedVer.findIndex(item => item.id === itemId);
 
    if (index > -1) {
     
      const contentElement = this.customizeDivs.toArray()[index].nativeElement.cloneNode(true);
      const linkElement = contentElement.querySelector('.ct_socials_bottom_position');
      const checboxDiv = contentElement.querySelector('.ct_verse_check_box');

      if (linkElement) {
        linkElement.style.display = 'none';
      }
      if (checboxDiv) {
        checboxDiv.style.display = 'none';
      }
      const content = contentElement.innerHTML;

      this.shareText4 = encodeURIComponent(content);
    
    }
  }

  setActiveItem(items: any, index: any): void {

    this.selectedItems = items;


    if (this.activeItemId == index) {
      this.activeItemId = 0;
      this.selectedItems = '';
    } else {
      this.activeItemId = index;
      setTimeout(() => {
        console.log("effect is  working")
        this.updateShareContent()

      }, 500)
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

      }, 500)
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

    this.shareUrl = `http://52.204.188.107/content?content=${this.shareText}`;
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
    console.log("content", content);
    this.shareText = encodeURIComponent(content);

    this.shareUrl = `http://52.204.188.107/content?content=${this.shareText}`;
    // this.shareUrl = `http://localhost:4200/content?content=${this.shareText}`;
    this.getEditShortURl(this.shareUrl)
  };

  getEditShortURl(fullUrl: string) {
    console.log(fullUrl)
    const formData = new URLSearchParams();
    formData.set('full_url', fullUrl);

    this.apiService.postAPI('getEditshortURl', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          this.shareEditUrl = `http://52.204.188.107/content?content=${res.data}`;
          // this.shareEditUrl = `http://localhost:4200/content?content=${res.data}`;

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
  };

  deleteVerse(id:any,name: string) {

    if (this.checkedIDs.length == 0 && this.checkedIDs2.length == 0 && id =='') {
      return
    }
    const formURlData = new URLSearchParams();
    if (name == 'saved') {
      formURlData.set('table_name', name);
      formURlData.set('ids', this.checkedIDs.toString());
    } else if(name =='edited') {
      formURlData.set('table_name', name);
      formURlData.set('ids', this.checkedIDs2.toString());
    }else{
      formURlData.set('table_name', name);
      formURlData.set('ids', id.toString());
    }

    this.apiService.postAPI('deleteVerses', formURlData.toString()).subscribe({
      next: (resp) => {

        if (resp.success == true) {
          this.checkedIDs = [];
          this.checkedIDs2 = [];
          this.apiService.showSuccess(resp.message);
          if (name == 'saved') {
            this.savedverse$ = this.apiService.getApi('getSavedVerses').pipe(tap(items =>
              this.notedverse = (items.data).reverse().filter((val: any) => val.notes != '')))
          } else {
            this.editedverse$ = this.apiService.getApi('getEditedVerses');
            this.freinds$ = this.apiService.getApi('getFreidns').pipe(tap(value => {
              this.userList = value.data;
            }))
          }
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

  };


  sendEmail(tableName: string) {
    if(this.checkedItems.length >1){
      this.apiService.showWarning("You can only send one card at once")
      return
    }
    if(this.checkedItems.length ==0){
      this.apiService.showWarning("Select verse to send")
      return
    }
    console.log(this.checkedItems);
    if (this.selectedOption.length == 0) {
      this.apiService.showSuccess("Please select user")
      return
    }

    const selectedMail = this.selectedOption.map(project => project.email);
    const formData = new URLSearchParams();
    if (tableName == 'saved') {
      const stringifyData = JSON.stringify(this.checkedItems)
      formData.set('html', stringifyData)
    } else if (tableName == 'edited') {
      formData.set('html', this.shareText4)
    }
    formData.set('to', selectedMail.toString())
    formData.set('table_name', tableName)
    this.apiService.postAPI('sendEmail', formData.toString()).subscribe({
      next: res => {

        if (res.success == true) {
          document.getElementById('modalClose')?.click()
          this.apiService.showSuccess(res.message)
          // this.customize2 = false;
          this.selectedTempalte = 'mailverse.jpg';
        }
      }
    })
  };



}
