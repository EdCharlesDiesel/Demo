import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Will } from '../will/will';
import { of } from 'rxjs';
import { WillTrackerError } from './will-tracker-error';


@Injectable()
export class MasterDataService{
  wills: Will[]; 



  constructor( private httpClient: HttpClient) { }

getWills(): Observable<Will[]> {
  const baseUrl = `/api/wills`;
    return this.httpClient.get<Will[]>(baseUrl)
    .pipe(catchError(this.handleError<Will[]>('getWills',[])));
}

getWill(willId: string): Observable<Will> {
  const baseUrl = `/api/wills/${willId}`;

    return this.httpClient.get<Will>(baseUrl)
    .pipe(catchError(this.handleError<Will>('getWill'))); 
}

PostWill(willId: string): Observable<Will> {
  const baseUrl = `/api/wills/${willId}`;
  const headerOptions = { headers: new HttpHeaders({'Content-Type': '/application/json',
                                                    'zxczxczxc':'zxczxc',
                                                  'c':'zxczxczxc'})};
    return this.httpClient.post<Will>(baseUrl,headerOptions)
    .pipe(catchError(this.handleError<Will>('getWill'))); 
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  }
} 

getAllWills(): Observable<Will[] | WillTrackerError> {
  let getHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });
  console.log('Getting all wills from the server');
  return this.httpClient.get<Will[]>('http://localhost:3000/api/wills', {
    headers: getHeaders
  }).pipe(
    catchError(err=>this.handleHttpError(err))
  );
}

getWillById(id: number): Observable<Will> {

  let getHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });
  return this.httpClient.get<Will>(`http://localhost:3000/api/wills/${id}`, {
    headers: getHeaders
  })
}

// getOldWillById(id: number): Observable<OldWill> {
//   return this.httpClient.get<Will>(`http://localhost:3000/api/wills/${id}`)
//   .pipe(map(b => <OldWill>{
//     willTitle: b.title,
//     year: b.publicationYear
//   }), tap(
//     classicWill => console.log(classicWill)
//   ));
// }

addWill(newWill: Will): Observable<Will> {
  return this.httpClient.post<Will>(`http://localhost:3000/api/wills/`, newWill, {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  });
}

updateWill(updateWill: Will): Observable<void> {
  return this.httpClient.put<void>(`http://localhost:3000/api/wills/${updateWill.id}`, updateWill, {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  });
}

deleteWill(willID: number): Observable<void> {
  return this.httpClient.delete<void>(`http://localhost:3000/api/wills/${willID}`,)
}



private handleHttpError(error: HttpErrorResponse): Observable<WillTrackerError> {
  let dataError = new WillTrackerError();
  dataError.errorNumber = 100;
  dataError.message = error.statusText;
  dataError.friendlyMessage = 'An error occured retrieving data';
  return throwError(dataError);
}
}
