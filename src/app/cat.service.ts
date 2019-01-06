import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface ICatFact {
  status: string;
  message: string;
}

@Injectable({
  providedIn: "root"
})
export class CatService {
  public url: string = `https://dog.ceo/api/breeds/image/random`;

  constructor(private http: HttpClient) {}

  getCatsFacts(): Observable<ICatFact> {
    return this.http.get<ICatFact>(this.url).pipe(
      tap(_ => console.log(`get facts`)),
      catchError(this.handleError<any>(`get facts`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
