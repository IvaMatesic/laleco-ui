import {Component, HostListener, signal} from '@angular/core';
import {WordTranslationService} from '../services/word-translation.service';
import {WordTranslation} from '../models/word-translation.model';
import {
  SingleWordTranslationViewComponent
} from '../single-word-translation-view/single-word-translation-view.component';
import {FormsModule} from '@angular/forms';
import {TranslationMode} from '../models/translation-mode.enum';
import {CommonModule, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-word-translation-list',
  standalone: true,
  imports: [
    SingleWordTranslationViewComponent,
    FormsModule,
    SlicePipe,
    CommonModule
  ],
  templateUrl: './word-translation-list.component.html',
  styleUrl: './word-translation-list.component.css'
})
export class WordTranslationListComponent {

  translationList = signal<WordTranslation[]>([]);
  displayedList = signal<WordTranslation[]>([]);
  selectedMode = signal<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  currentWordIndex = signal(1);
  isLastWord = signal(false);
  areTranslationsFetched = signal(false);
  showSecondPart = signal(false);

  protected readonly TranslationMode = TranslationMode;

  constructor(private wordTranslationService: WordTranslationService) {
  }

  fetchTranslationsClicked() {
    this.wordTranslationService.getAllTranslations().subscribe(response => {
      this.translationList.set(response)
      this.displayedList.set(this.translationList().slice(0, 1));
      this.areTranslationsFetched.set(true);
    })
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    if (event.key === 'ArrowRight') {
      this.handleNextClick()
    }
  }

  goToNextWord() {
    if (this.currentWordIndex() < this.translationList().length) {
      this.displayedList().unshift(this.translationList()[this.currentWordIndex()]);
      this.currentWordIndex.set(this.currentWordIndex() + 1);
      this.showSecondPart.set(false);
    } else {
      this.isLastWord.set(true);
    }
  }

  handleNextClick() {
    if (this.showSecondPart() && !this.isLastWord())
      this.goToNextWord();
    else
      this.showSecondPart.set(true);
  }
}
