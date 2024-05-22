import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SafeHtmlPipe } from "../../helper/safe-html.pipe";

@Component({
    selector: 'app-share-link',
    standalone: true,
    templateUrl: './share-link.component.html',
    styleUrls: ['./share-link.component.css'],
    imports: [CommonModule, SafeHtmlPipe]
})
export class ShareLinkComponent {
  content!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.content = decodeURIComponent(params['content'] || '');
      console.log(this.content);
    });
  }
}
