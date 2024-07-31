import {Component, input, output} from '@angular/core';
import {WordTranslation} from '../models/word-translation.model';
import {TranslationMode} from '../models/translation-mode.enum';

@Component({
  selector: 'app-single-word-translation-view',
  standalone: true,
  imports: [],
  templateUrl: './single-word-translation-view.component.html',
  styleUrl: './single-word-translation-view.component.css'
})
export class SingleWordTranslationViewComponent {
  wordTranslation = input<WordTranslation>();
  selectedMode=input<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  isLastWord = input<boolean>(true);
  protected readonly TranslationMode = TranslationMode;

  nextWordClicked = output<void>();
}
