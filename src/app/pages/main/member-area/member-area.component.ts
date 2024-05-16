import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SafeHtmlPipe } from 'src/app/helper/safe-html.pipe';

@Component({
  selector: 'app-member-area',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MemberAreaComponent {

  // savedverse$!: Observable<any>;
  savedverse$!: Observable<any>;
  editedverse$!: Observable<any>;
  notedverse: any[]=[]
 
  verseOftheDay: any = {};
  notes: string = '';
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }


  ngOnInit(): void {


    this.savedverse$ = this.apiService.getApi('getSavedVerses').pipe(tap(items=>
      this.notedverse = (items.data).filter((val:any)=>val.notes !='')))
    
    this.editedverse$ = this.apiService.getApi('getEditedVerses');
  

    // this.loaderService.removeLoaderClass();
  };
}
