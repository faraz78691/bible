import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,AppComponent,
    AppRoutingModule,CKEditorModule,HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
