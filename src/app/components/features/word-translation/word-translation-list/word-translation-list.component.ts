import {Component, HostListener, signal} from '@angular/core';
import {WordTranslationService} from '../../../../services/word-translation.service';
import {WordTranslation} from '../../../../models/word-translation.model';
import {
  SingleWordTranslationViewComponent
} from '../single-word-translation-view/single-word-translation-view.component';
import {FormsModule} from '@angular/forms';
import {TranslationMode} from '../../../../models/translation-mode.enum';
import {CommonModule, SlicePipe} from '@angular/common';
import {OptionsCollapsibleComponent} from '../options-collapsible/options-collapsible.component';
import {FetchMode} from '../../../../models/fetch-mode.enum';
import {HardWord} from '../../../../models/hard-word.model';
import {FilterByIdPipe} from '../../../../pipes/filter-by-id.pipe';

@Component({
  selector: 'app-word-translation-list',
  standalone: true,
  imports: [
    SingleWordTranslationViewComponent,
    FormsModule,
    SlicePipe,
    CommonModule,
    OptionsCollapsibleComponent,
    FilterByIdPipe
  ],
  templateUrl: './word-translation-list.component.html'
})
export class WordTranslationListComponent {

  translationList = signal<WordTranslation[]>([]);
  displayedList = signal<WordTranslation[]>([]);
  selectedTranslateMode = signal<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  selectedFetchMode = signal<FetchMode>(FetchMode.LATEST_LESSONS);
  currentWordIndex = signal(1);
  isLastWord = signal(false);
  areTranslationsFetched = signal(false);
  showSecondPart = signal(false);
  numberOfLessons = signal(1);
  showFetchAgain = signal(false);
  changedHardWords = signal<HardWord[]>([]);

  protected readonly TranslationMode = TranslationMode;

  constructor(private wordTranslationService: WordTranslationService) {
  }

  fetchTranslationsClicked() {
    this.wordTranslationService.getAllTranslations(this.selectedFetchMode(), this.numberOfLessons()).subscribe(response => {
      this.setListsWithNewData(response);
    })
  }

  setListsWithNewData(data: WordTranslation[]) {
    this.translationList.set(data)
    this.displayedList.set(this.translationList().slice(0, 1));
    this.resetVariables();
  }

  resetVariables() {
    this.areTranslationsFetched.set(true);
    this.showFetchAgain.set(false);
    this.currentWordIndex.set(1);
    this.isLastWord.set(false);
    this.showSecondPart.set(false);
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

  changeTranslationMode(mode: TranslationMode) {
    this.selectedTranslateMode.set(mode);
  }

  changeFetchMode(fetchMode: FetchMode) {
    this.selectedFetchMode.set(fetchMode);
    this.showFetchAgain.set(true);
  }

  changeNumberOfLessons(numberOfLessons: number) {
    this.numberOfLessons.set(numberOfLessons);
    this.showFetchAgain.set(true);
  }

  handleRepeatClick() {
    this.setListsWithNewData(this.shuffleArray(this.displayedList()))
    this.changedHardWords.set([]);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  saveHardWords(){
    this.wordTranslationService.saveHardWords(this.changedHardWords()).subscribe(response => {
      console.log('Hard words updated', response);
    });
    this.updateWordListWithNewHardWords();
  }

  updateWordListWithNewHardWords(){
    for (let i = 0; i < this.changedHardWords().length; i++) {
      let id = this.changedHardWords()[i].id;
      this.translationList().filter(word => word.id == id)[0].hard = this.changedHardWords()[i].hard;
    }
    this.changedHardWords.set([]);
  }

  changeHardWordsFunction(word: WordTranslation | undefined) {
    if (word != undefined) {
      const exists = this.changedHardWords().some(item => item.id === word.id);
      if (exists) {
        this.changedHardWords.update(values => {
          return [...values.filter(item => item.id !== word.id)];
        });
      } else {
        this.changedHardWords.update(values => {
          return [...values, {id: word.id, hard: !word.hard}];
        });
      }
    }
  }
}
