import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Will } from './will';

@Injectable({
  providedIn: 'root'
})
export class WillService {

  private willsUrl = 'api/wills';

  constructor(private http: HttpClient) { }

  getWills(): Observable<Will[]> {
    return this.http.get<Will[]>(this.willsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWill(id: number): Observable<Will> {
    if (id === 0) {
      return of(this.initializeWill());
    }
    const url = `${this.willsUrl}/${id}`;
    return this.http.get<Will>(url)
      .pipe(
        tap(data => console.log('getWill: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createWill(will: Will): Observable<Will> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    will.id = null;
    return this.http.post<Will>(this.willsUrl, will, { headers })
      .pipe(
        tap(data => console.log('createWill: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteWill(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.willsUrl}/${id}`;
    return this.http.delete<Will>(url, { headers })
      .pipe(
        tap(data => console.log('deleteWill: ' + id)),
        catchError(this.handleError)
      );
  }

  updateWill(will: Will): Observable<Will> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.willsUrl}/${will.id}`;
    return this.http.put<Will>(url, will, { headers })
      .pipe(
        tap(() => console.log('updateWill: ' + will.id)),
        // Return the will on an update
        map(() => will),
        catchError(this.handleError)
      );
  }

  // postEpp(participant: Participants):Observable<Will>{
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.willsUrl}/${will.id}`;
  //   return this.http.put<Will>(url, will, { headers })
  //     .pipe(
  //       tap(() => console.log('updateWill: ' + will.id)),
  //       // Return the will on an update
  //       map(() => will),
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeWill(): Will {
    //Return an initialized object
    return {
      id: 0,
      willNumber:'',
      birthDate: new Date(Date.now()),
      clientCode:  '',
      initials: '',
      surname:'',
      gender:'',
      idNumber:'',
      maritalStatus:'',
      postlAddrLine1:'',
      postlSuburb:'',
      noOfJointPartcpnt:'',
      participants:[''],
      
      firstEpp:true,
      secondEpp:true
      
    };
  }
  
}
