import {WordTranslation} from './word-translation.model';

export interface Lesson {
  id: number;
  title: string;
  url: string;
  dateCreated: Date;
  wordTranslations: WordTranslation[];
}
