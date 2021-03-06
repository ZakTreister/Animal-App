import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse, CattleEvent } from 'src/@shared/models/cattle-event';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


  constructor(private http: HttpClient) { }

  public getCattleEvents(): Observable<AppResponse<CattleEvent>> {
    return this.http.get<AppResponse<CattleEvent>>(`GetCattleEvents`)
  }

  public deleteCattleEvents(eventId: number) {
    let params = { eventId: `${eventId}` };
    return this.http.delete<any>('DeleteCattleEvent', { params })
  }

  public addCattleEvents(values: any) {
    return this.http.post('AddCattleEvent', values);
  }

  public editCattleEvents(values: Partial<CattleEvent>) {
    return this.http.put('UpdateCattleEvent', values)
  }
}
