import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    

  ],
  imports: [
    BrowserModule,AppComponent,
    AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
