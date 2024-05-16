import { Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";
import { MainComponent } from "./main.component";
import { PastDiaryComponent } from "../past-diary/past-diary.component";
import { BibleBooksComponent } from "../bible-books/bible-books.component";
import { MemberAreaComponent } from "../member-area/member-area.component";
import { SuggestedSitesComponent } from "../suggested-sites/suggested-sites.component";
import { BibleChapterComponent } from "../bible-chapter/bible-chapter.component";

export const  MAIN_ROUTES: Routes = [
 {
    path: '',
    component : MainComponent,
    children:[
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
        },
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'past_daily',
            component: PastDiaryComponent
        },
        {
            path: 'bible_books',
            component: BibleBooksComponent
        },
        {
            path: 'member_area',
            component: MemberAreaComponent
        },
        {
            path: 'suggested_bible',
            component: SuggestedSitesComponent
        },
        {
            path: 'bible_chapter',
            component: BibleChapterComponent
        }
    ]
 }
];

