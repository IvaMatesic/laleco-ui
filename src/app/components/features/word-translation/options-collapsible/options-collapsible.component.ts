import {Component, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {TranslationMode} from '../../../../models/translation-mode.enum';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FetchMode} from '../../../../models/fetch-mode.enum';

@Component({
  selector: 'app-options-collapsible',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './options-collapsible.component.html',
  styles: ``
})
export class OptionsCollapsibleComponent {
  isOpen = signal(false);
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  protected readonly TranslationMode = TranslationMode;
  protected readonly FetchMode = FetchMode;
  translationModeInput = input<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  fetchModeInput = input<FetchMode>(FetchMode.ALL);
  translationModeChanged = output<TranslationMode>();
  fetchModeChanged = output<FetchMode>();
  numberOfLessonsChanged = output<number>();

  onInputNumberOfLessonsChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);
    if (!isNaN(value)) {
      this.numberOfLessonsChanged.emit(value);
    }
  }
}
