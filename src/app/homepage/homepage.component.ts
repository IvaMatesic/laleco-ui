import {Component} from '@angular/core';
import {
  BulkCreateWordTranslationsComponent
} from '../bulk-create-word-translations/bulk-create-word-translations.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BulkCreateWordTranslationsComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
