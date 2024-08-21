import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WordTranslation } from '../models/word-translation.model'; // Assume you have a model for WordTranslation
import { environment } from '../../environments/environment.development';
import {LessonRequest} from '../models/lesson-request.model';
import {Lesson} from '../models/lesson.model'; // Ensure your environment file has the API URL

@Injectable({
  providedIn: 'root'
})
export class WordTranslationService {
  private apiUrl = `${environment.apiUrl}/translation`;

  constructor(private http: HttpClient) { }

  getAllTranslations(): Observable<WordTranslation[]> {
    return this.http.get<WordTranslation[]>(this.apiUrl)
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
