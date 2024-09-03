import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WordTranslationService} from '../../../../services/word-translation.service';

@Component({
  selector: 'app-bulk-create-word-translations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bulk-create-word-translations.component.html'
})
export class BulkCreateWordTranslationsComponent {

  enteredData = signal('');
  enteredTitle = signal('');
  enteredURL = signal('');

  constructor(private wordTranslationService: WordTranslationService) {
  }


  onSubmit() {
    let lessonRequest = {
      "lessonTitle": this.enteredTitle(),
      "lessonUrl": this.enteredURL(),
      "wordTranslationData":this.enteredData()
    }
      this.wordTranslationService.createWordTranslations(lessonRequest).subscribe(response => {
        console.log('Word translations created', response);
      });
  }
}
