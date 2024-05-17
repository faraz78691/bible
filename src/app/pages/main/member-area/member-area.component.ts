import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SafeHtmlPipe } from 'src/app/helper/safe-html.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-member-area',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, FormsModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MemberAreaComponent {

  form!: FormGroup;
  @ViewChild('closeModal') closeModal!: ElementRef;

  // savedverse$!: Observable<any>;
  savedverse$!: Observable<any>;
  editedverse$!: Observable<any>;
  freinds$!: Observable<any>;
  notedverse: any[] = []

  verseOftheDay: any = {};
  notes: string = '';
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }


  ngOnInit(): void {


    this.savedverse$ = this.apiService.getApi('getSavedVerses').pipe(tap(items =>
      this.notedverse = (items.data).filter((val: any) => val.notes != '')))

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
