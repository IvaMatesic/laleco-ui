import {Component} from '@angular/core';
import {
  BulkCreateWordTranslationsComponent
} from '../bulk-create-word-translations/bulk-create-word-translations.component';
import {WordTranslationListComponent} from '../word-translation-list/word-translation-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BulkCreateWordTranslationsComponent,
    WordTranslationListComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
