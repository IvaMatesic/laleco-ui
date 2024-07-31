import {Component, signal} from '@angular/core';
import {WordTranslationService} from '../services/word-translation.service';
import {WordTranslation} from '../models/word-translation.model';
import {
  SingleWordTranslationViewComponent
} from '../single-word-translation-view/single-word-translation-view.component';
import {FormsModule} from '@angular/forms';
import {TranslationMode} from '../models/translation-mode.enum';

@Component({
  selector: 'app-word-translation-list',
  standalone: true,
  imports: [
    SingleWordTranslationViewComponent,
    FormsModule
  ],
  templateUrl: './word-translation-list.component.html',
  styleUrl: './word-translation-list.component.css'
})
export class WordTranslationListComponent {

  translationList = signal<WordTranslation[] | undefined>(undefined);
  selectedMode = signal<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);

  constructor(private wordTranslationService: WordTranslationService) {
  }

  fetchTranslationsClicked() {
    this.wordTranslationService.getAllTranslations().subscribe(response => this.translationList.set(response))
  }

  protected readonly TranslationMode = TranslationMode;
}
