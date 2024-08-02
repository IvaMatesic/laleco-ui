import {Component, HostListener, input, output, signal} from '@angular/core';
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
  protected showSecondPart = signal(false);

  nextWordClicked = output<void>();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' && this.isLastWord()) {
      console.log('emit next word:'+event.key)
      this.handleNextClick()
    }
  }

  handleNextClick(){
    if(this.showSecondPart())
      this.nextWordClicked.emit()
    else
      this.showSecondPart.set(true);
  }
}
