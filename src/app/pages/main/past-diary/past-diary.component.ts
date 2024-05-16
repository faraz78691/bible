import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-past-diary',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './past-diary.component.html',
  styleUrls: ['./past-diary.component.css']
})
export class PastDiaryComponent {
  // isActiveLabel = computed(() => this.apiService.verses());
  verseDay$!: Observable<any>;
  verseOftheDay: any = {};
  notes: string = '';
  constructor(private loaderService: LoaderService, private apiService: ApiService) { }


  ngOnInit(): void {


    this.verseDay$ = this.apiService.getApi('getPastRandomVerses');

    this.loaderService.removeLoaderClass();
  };
}
