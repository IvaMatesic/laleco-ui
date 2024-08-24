import { Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {
  BulkCreateWordTranslationsComponent
} from './bulk-create-word-translations/bulk-create-word-translations.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'upload', component: BulkCreateWordTranslationsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomepageComponent },
];

// export const routes: Routes = [
//   { path: '', component: HomepageComponent, pathMatch: 'full' },
//   { path: '1', component: BulkCreateWordTranslationsComponent },
//   { path: '1/top100/:name', component: HomepageComponent },
//   { path: 'home', component: HomepageComponent },
//   { path: '2/:viewType', component: HomepageComponent },
//   { path: '**', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomepageComponent },
//   { path: 'upload', component: BulkCreateWordTranslationsComponent },
//   { path: '',   redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', component: HomepageComponent },
// ];
