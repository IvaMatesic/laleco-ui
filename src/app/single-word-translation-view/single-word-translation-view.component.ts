import {Component, input} from '@angular/core';
import {WordTranslation} from '../models/word-translation.model';
import {TranslationMode} from '../models/translation-mode.enum';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-single-word-translation-view',
  standalone: true,
  imports: [
    NgClass, CommonModule
  ],
  templateUrl: './single-word-translation-view.component.html'
})
export class SingleWordTranslationViewComponent {
  wordTranslation = input<WordTranslation>();
  selectedMode = input<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  isCurrentWord = input<boolean>(true);
  protected readonly TranslationMode = TranslationMode;
  showSecondPart = input(false);

}
