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
          // const encodedContent: any = url.searchParams.get("content");
          const encodedContent: any = '<div class="ct_verse_bg" style="background-color: #3a0d0f;"><img src="http://localhost:4000/profile/verse_day1.jpg"><div class="ct_verse_overlay"><div class="ct_verse_head"><div class="ct_verse_head ct_verse_title_clr_12"><h4><span style="color:hsl(30, 75%, 60%)">Philemon 1:15</span></h4></div><div class="ct_verse_title_clr_12"><p>For perhaps he therefore departed for a season, that thou shouldest receive him for ever;</p></div></div><p class="text-white"></p></div></div>'

          console.log(encodedContent);
          // this.content = decodeURIComponent(encodedContent);
          this.safeDecodeURIComponent(encodedContent)
          console.log("dsg",this.content);

        }
      }
    })

  };

  safeDecodeURIComponent(uri:any) {
    try {
     return decodeURIComponent(uri);
    } catch (e) {
        console.error("URIError: URI malformed", e);
        // Attempt to identify problematic parts
        let parts = uri.split('%');
        for (let i = 1; i < parts.length; i++) {
            let testUri = parts.slice(0, i).join('%');
            try {
                console.log(`Decoding: ${testUri}`);
                console.log(decodeURIComponent(testUri));
            } catch (innerE) {
                console.error(`Failed at part ${i}: ${parts[i]}`);
            }
        }
        return null;
    }
}
}
