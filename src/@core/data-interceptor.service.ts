import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import * as Aniamls from 'src/assets/animals.json';
import { AppResponse, Animal } from 'src/@shared/models/animals'
@Injectable({
  providedIn: 'root'
})
export class DataInterceptorService implements HttpInterceptor {
  private data: AppResponse;

  constructor() {
    this.data = Aniamls['default'];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (req.method) {
      case 'GET':
        return this.getAnimals(req.params);
      case 'PUT':
        return this.editAnimal(req.body);
      case 'POST':
        return this.addAnimal(req.body);
      case 'DELETE':
        return this.deleteAnimal(req.params);
      default:
        break;
    }
  }

  private deleteAnimal(params: HttpParams): Observable<HttpEvent<any>> {
    let animalIndex = this.data.result.findIndex(a => a.eventId == parseInt(params.get('eventId')));
    if (animalIndex > -1) {
      this.data.result.splice(animalIndex, 1);
      this.data.total--;
      return of(new HttpResponse({
        status: 200
      }))
    } else {
      return of(new HttpResponse({
        status: 400
      }))
    }
  }

  private addAnimal(body: Animal): Observable<HttpEvent<any>> {
    body.eventId = ++this.data.total;
    this.data.result.unshift(body);
    return of(new HttpResponse({
      status: 200,
      body
    }))
  }

  private editAnimal(body: Partial<Animal>): Observable<HttpEvent<any>> {
    let animalIndex = this.data.result.findIndex(a => a.eventId == body.eventId);
    if (animalIndex > -1) {
      this.data.result[animalIndex] = { ...this.data.result[animalIndex], ...body }
      return of(new HttpResponse({
        status: 200
      }))
    } else {
      return of(new HttpResponse({
        status: 400
      }))
    }
  }

  private getAnimals(params: any): Observable<HttpEvent<AppResponse>> {
    let body: AppResponse = {
      limit: 100,
      offset: 0,
      result: this.data.result.slice(0, 100),
      total: this.data.total
    }
    return of(new HttpResponse({
      status: 200,
      body
    }))
  }
}
