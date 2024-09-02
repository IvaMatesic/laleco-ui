import { Routes } from '@angular/router';
import {HomepageComponent} from './components/features/homepage/homepage.component';
import {
  BulkCreateWordTranslationsComponent
} from './components/features/word-translation/bulk-create-word-translations/bulk-create-word-translations.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'upload', component: BulkCreateWordTranslationsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
