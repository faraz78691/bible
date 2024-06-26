import { Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";
import { MainComponent } from "./main.component";
import { PastDiaryComponent } from "../past-diary/past-diary.component";
import { BibleBooksComponent } from "../bible-books/bible-books.component";
import { MemberAreaComponent } from "../member-area/member-area.component";
import { SuggestedSitesComponent } from "../suggested-sites/suggested-sites.component";
import { BibleChapterComponent } from "../bible-chapter/bible-chapter.component";
import { AuthGuard } from "src/app/guard/auth.guard";
import { MyProfileComponent } from "../my-profile/my-profile.component";
import { TermsConditionComponent } from "../terms-condition/terms-condition.component";
import { CustomizeComponent } from "../customize/customize.component";

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
            path: 'home',  canActivate: [AuthGuard],
            component: HomeComponent
        },
        {
            path: 'past_daily', canActivate: [AuthGuard],
            component: PastDiaryComponent
        },
        {
            path: 'bible_books', canActivate: [AuthGuard],
            component: BibleBooksComponent
        },
        {
            path: 'member_area', canActivate: [AuthGuard],
            component: MemberAreaComponent
        },
        {
            path: 'suggested_bible', canActivate: [AuthGuard],
            component: SuggestedSitesComponent
        },
        {
            path: 'bible_chapter/:chapter', canActivate: [AuthGuard],
            component: BibleChapterComponent
        },
        {
            path: 'my_profile', canActivate: [AuthGuard],
            component: MyProfileComponent
        },
        {
            path: 'customize', canActivate: [AuthGuard],
            component: CustomizeComponent
        },
        {
            path: 'terms-condition', canActivate: [AuthGuard],
            component: TermsConditionComponent
        },
    ]
 }
];

