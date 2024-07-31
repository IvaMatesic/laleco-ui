import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WordTranslationService} from '../services/word-translation.service';

@Component({
  selector: 'app-bulk-create-word-translations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bulk-create-word-translations.component.html',
  styleUrl: './bulk-create-word-translations.component.css'
})
export class BulkCreateWordTranslationsComponent {

  enteredData = signal('');

  constructor(private wordTranslationService: WordTranslationService) {
  }


  onSubmit() {
    this.wordTranslationService.createWordTranslations(this.enteredData()).subscribe(response => {
      console.log('Word translations created', response);
    });
  }
}
