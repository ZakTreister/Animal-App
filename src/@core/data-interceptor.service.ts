import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import * as CattleEvents from 'src/assets/animals.json';
import { AppResponse, CattleEvent } from 'src/@shared/models/cattle-event'
@Injectable({
  providedIn: 'root'
})
export class DataInterceptorService implements HttpInterceptor {
  private _data: AppResponse;

  constructor() {
    this._data = CattleEvents['default'];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (req.method) {
      case 'GET':
        return this.getCattleEvents(req.params);
      case 'PUT':
        return this.editCattleEvent(req.body);
      case 'POST':
        return this.addCattleEvent(req.body);
      case 'DELETE':
        return this.deleteCattleEvent(req.params);
      default:
        return throwError(new HttpResponse({
          status: 400
        }))
        break;
    }
  }

  private deleteCattleEvent(params: HttpParams): Observable<HttpEvent<any>> {
    let eventIndex = this._data.result.findIndex(a => a.eventId == parseInt(params.get('eventId')));
    if (eventIndex > -1) {
      this._data.result.splice(eventIndex, 1);
      this._data.total--;
      return of(new HttpResponse({
        status: 200
      }))
    } else {
      return throwError(new HttpResponse({
        status: 400
      }))
    }
  }

  private addCattleEvent(body: CattleEvent): Observable<HttpEvent<any>> {
    body.eventId = ++this._data.total;
    this._data.result.unshift(body);
    return of(new HttpResponse({
      status: 200,
      body
    }))
  }

  private editCattleEvent(body: Partial<CattleEvent>): Observable<HttpEvent<any>> {
    let eventIndex = this._data.result.findIndex(a => a.eventId == body.eventId);
    if (eventIndex > -1) {
      this._data.result[eventIndex] = { ...this._data.result[eventIndex], ...body }
      return of(new HttpResponse({
        status: 200
      }))
    } else {
      return throwError(new HttpResponse({
        status: 400
      }))
    }
  }

  private getCattleEvents(params: any): Observable<HttpEvent<AppResponse>> {
    let body: AppResponse = {
      limit: 100,
      offset: 0,
      result: this._data.result.slice(0, 100),
      total: this._data.total
    }
    return of(new HttpResponse({
      status: 200, body
    }))
  }
}
