import {Component, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {TranslationMode} from '../models/translation-mode.enum';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  selectedMode = input<TranslationMode>(TranslationMode.TRANSLATION_TO_FOREIGN_WORD);
  translationModeChanged = output<TranslationMode>();

}
