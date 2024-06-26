import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-suggested-sites',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './suggested-sites.component.html',
  styleUrls: ['./suggested-sites.component.css']
})
export class SuggestedSitesComponent {

  adScripts: any[] = [];
  adScript!: SafeHtml;
  constructor(private route: Router, public service: ApiService,private renderer: Renderer2, private el: ElementRef, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.getData();
    const adHtml = `
    <a href="http://www.adobe.com" target="_blank">
      <img src="http://www.adobe.com/ads/ad.jpg" width="728" height="90" border="0" alt="">
    </a>
  `;
  this.adScript = this.sanitizer.bypassSecurityTrustHtml(adHtml);
    // const adContainer = this.el.nativeElement.querySelector('#ad-container');
    // const script = this.renderer.createElement('script');
    // script.type = 'text/javascript';
    // script.async = true;
    // script.src = 'https://cdn.carbonads.com/carbon.js?serve=CKYIKKJL&amp;placement=getbootstrapcom';
    // this.renderer.appendChild(adContainer, script);
  }

  getData() {
    this.service.getApi('getSuggestedLinks').subscribe({
      next: resp => {
        this.adScripts = resp.data;
        // const adContainer = this.el.nativeElement.querySelector('#ad-container');
        // this.adScripts.forEach(scriptSrc => {
        //   console.log(scriptSrc);
        //   const script = this.renderer.createElement('script');
        //   script.type = 'text/javascript';
        //   script.async = true;
        //   script.src = 'https://cdn.carbonads.com/carbon.js?serve=CKYIKKJL&amp;placement=getbootstrapcom';
        //   this.renderer.appendChild(adContainer, script);
        // });
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  loadAdScripts() {
    const adContainer = this.el.nativeElement.querySelector('#ad-container');
    this.adScripts.forEach(scriptSrc => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = scriptSrc;
      this.renderer.appendChild(adContainer, script);
    });
  }

}
