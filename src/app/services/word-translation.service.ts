import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WordTranslation} from '../models/word-translation.model'; // Assume you have a model for WordTranslation
import {environment} from '../../environments/environment.development';
import {LessonRequest} from '../models/lesson-request.model';
import {Lesson} from '../models/lesson.model';
import {FetchMode} from '../models/fetch-mode.enum';
import {HardWord} from '../models/hard-word.model'; // Ensure your environment file has the API URL

@Injectable({
  providedIn: 'root'
})
export class WordTranslationService {
  private apiUrl = `${environment.apiUrl}/translation`;

  constructor(private http: HttpClient) { }

  getAllTranslations(filterBy: FetchMode, numberOfLessons: number): Observable<WordTranslation[]> {
    let params = new HttpParams();

    if (filterBy == FetchMode.LATEST_LESSONS) {
      params = params.set('filterBy', 'latestLesson');
      params = params.set('numberOfLessons', numberOfLessons.toString());
    }
    else if(filterBy == FetchMode.HARD_WORDS){
      params = params.set('filterBy', 'hardWords');
    }

    return this.http.get<WordTranslation[]>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError<WordTranslation[]>('getAllTranslations', []))
      );
  }

  createDefaultTranslations(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create/default-translations`, {})
      .pipe(
        catchError(this.handleError<void>('createDefaultTranslations'))
      );
  }

  createWordTranslations(data: LessonRequest): Observable<Lesson|string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<Lesson>(`${this.apiUrl}/create/bulk`, data, { headers })
      .pipe(
         catchError(this.handleError<string>('createWordTranslations'))
      );
  }

  saveHardWords(hardWords: HardWord[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put<HardWord[]>(`${this.apiUrl}/set-hard`, hardWords, { headers })
      .pipe(
        catchError(this.handleError<string>('saveHardWords'))
      );
  }

  deleteAllWordTranslations(): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete-all`)
      .pipe(
        catchError(this.handleError<string>('deleteAllWordTranslations'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
