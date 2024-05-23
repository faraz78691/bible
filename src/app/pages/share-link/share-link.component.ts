import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SafeHtmlPipe } from "../../helper/safe-html.pipe";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-share-link',
  standalone: true,
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css'],
  imports: [CommonModule, SafeHtmlPipe]
})
export class ShareLinkComponent {
  content!: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const shortUrl = (params['content'] || '');
      console.log(shortUrl);
      this.getFullURl(shortUrl)
    });
  };

  getFullURl(fullUrl: string) {

    const formData = new URLSearchParams();
    formData.set('short_url', fullUrl)

    this.apiService.postAPI('getFullURl', formData.toString()).subscribe({
      next: res => {
        console.log(res)
        if (res.success == true) {
          const getdata = res.data[0];
          const url = new URL(getdata.full_url);
          const encodedContent: any = url.searchParams.get("content");
          this.content = decodeURIComponent(encodedContent);

        }
      }
    })

  };
}
