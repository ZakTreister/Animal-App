import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {  Observable, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AnimalService } from 'src/@shared/services/animal.service';
import { Animal } from 'src/@shared/models/animals';
@Component({
  selector: 'app-cattle',
  templateUrl: './cattle.component.html',
  styleUrls: ['./cattle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CattleComponent implements OnInit {
  private getData: ReplaySubject<any> = new ReplaySubject<any>(1);
  public cattleEvents$: Observable<Animal[]> = this.getData.pipe(switchMap(evt => this.animalService.getAminals().pipe(map(x => x.result))))
  public columns: any[] = [
    { field: 'eventId', header: 'Event Id', editable: false },
    { field: 'cowId', header: 'Cow Id' },
    { field: 'animalId', header: 'Animal Id' },
    { field: 'healthIndex', header: 'Health Index' },
    { field: 'endDate', header: 'End Date' },
    { field: 'minValueDateTime', header: 'Min Value Date Time' },
    { field: 'type', header: 'Type' },
    { field: 'deletable', header: 'Deletable' },
    { field: 'lactationNumber', header: 'Lactation Number' },
    { field: 'daysInLactation', header: 'Days In Lactation' },
    { field: 'ageInDays', header: 'Age In Days' },
    { field: 'startDateTime', header: 'Start Date Time' },
    { field: 'reportingDateTime', header: 'Reporting Date Time' },
    { field: 'alertType', header: 'Alert Type' },
    { field: 'duration', header: 'Duration' },
    { field: 'originalStartDateTime', header: 'Original Start Date Time' },
    { field: 'endDateTime', header: 'End Date Time' },
    { field: 'daysInPregnancy', header: 'Days In Pregnancy' },
    { field: 'heatIndexPeak', header: 'Heat Index Peak' },
    { field: 'newGroupId', header: 'New Group Id' },
    { field: 'newGroupName', header: 'New Group Name' },
    { field: 'currentGroupId', header: 'Current Group Id' },
    { field: 'currentGroupName', header: 'Current Group Name' },
    { field: 'destinationGroup', header: 'Destination Group' },
    { field: 'destinationGroupName', header: 'Destination Group Name' },
    { field: 'calvingEase', header: 'Calving Ease' },
    { field: 'oldLactationNumber', header: 'Old Lactation Number' },
    { field: 'newborns', header: 'Newborns' },
    { field: 'cowEntryStatus', header: 'Cow Entry Status' },
    { field: 'birthDateCalculated', header: 'Birth Date Calculated' },
    { field: 'sire', header: 'Sire' },
    { field: 'breedingNumber', header: 'Breeding Number' },
    { field: 'isOutOfBreedingWindow', header: 'Is Out Of Breeding Window' },
    { field: 'interval', header: 'Interval' },
  ]

  constructor(private animalService: AnimalService) { }
  
  ngOnInit(): void {
    this.getData.next();
  }

  public addCattleEvent(evt: Animal) {
    this.animalService.addAnimal(evt).subscribe(res => this.getData.next())
  }

  public deleteCattleEvent(evt: Animal) {
    this.animalService.deleteAnimal(evt.eventId).subscribe(res => this.getData.next())
  }

  public updateCattleEvent(evt: Animal) {
    this.animalService.editAnimal(evt).subscribe(res => this.getData.next())
  }

}
