import {Component} from '@angular/core';
import {
  BulkCreateWordTranslationsComponent
} from '../word-translation/bulk-create-word-translations/bulk-create-word-translations.component';
import {WordTranslationListComponent} from '../word-translation/word-translation-list/word-translation-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BulkCreateWordTranslationsComponent,
    WordTranslationListComponent
  ],
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

}
