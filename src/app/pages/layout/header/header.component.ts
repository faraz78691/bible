import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  version$!: Observable<any>;
  verse_number: string = '';
  selectedOption: string = '';
  verseSignal = computed(()=>{
    this.apiService.verses()
  })
  constructor(private apiService: ApiService) {

  }
  ngOnInit() {

    this.version$ = this.apiService.getApi('getversion')
  }

  search_verse() {
    const formData = new URLSearchParams();
    formData.set("table_name", this.selectedOption)
    formData.set("verse_no", this.verse_number)

    this.apiService.postAPI('getVerses', formData.toString()).subscribe({
      next: res => {
        this.apiService.verses.set(res.data);
        console.log(this.apiService.verses());
        
      }
    })
  };


  onChangeVersion(option: any) {
    
    this.selectedOption = option.target.value;

  }


}
