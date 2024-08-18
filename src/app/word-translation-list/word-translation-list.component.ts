import {Component, HostListener, signal} from '@angular/core';
import {WordTranslationService} from '../services/word-translation.service';
import {WordTranslation} from '../models/word-translation.model';
import {
  SingleWordTranslationViewComponent
} from '../single-word-translation-view/single-word-translation-view.component';
import {FormsModule} from '@angular/forms';
import {TranslationMode} from '../models/translation-mode.enum';
import {SlicePipe} from '@angular/common';
import {SliceArrayPipe} from '../pipes/slice-array.pipe';

@Component({
  selector: 'app-word-translation-list',
  standalone: true,
  imports: [
    SingleWordTranslationViewComponent,
    FormsModule,
    SlicePipe,
    SliceArrayPipe
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


  constructor(private wordTranslationService: WordTranslationService) {
  }

  fetchTranslationsClicked() {
    this.wordTranslationService.getAllTranslations().subscribe(response => {
      this.translationList.set(response)
      this.displayedList.set(this.translationList().slice(0, 1))
    })
  }

  protected readonly TranslationMode = TranslationMode;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ( event.key === 'Enter') {
      event.preventDefault();
    }
  }

  goToNextWord() {
    if(this.currentWordIndex() < this.translationList().length) {
      this.displayedList().unshift(this.translationList()[this.currentWordIndex()]);
      this.currentWordIndex.set(this.currentWordIndex() + 1);
    }else{
      this.isLastWord.set(true);
    }
  }
}
