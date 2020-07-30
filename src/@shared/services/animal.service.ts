import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse, Animal } from 'src/@shared/models/animals';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


  constructor(private http: HttpClient) { }

  public getAminals(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`GetAnimals`)
  }

  public deleteAnimal(eventId: number) {
    let params = { eventId: `${eventId}` };
    return this.http.delete<any>('DeleteAnimal', { params })
  }

  public addAnimal(values: any) {
    return this.http.post('AddAniaml', values);
  }

  public editAnimal(values: Partial<Animal>) {
    return this.http.put('UpdateAnimal', values)
  }
}
