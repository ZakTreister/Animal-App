import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AnimalService } from 'src/@shared/services/animal.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Animal } from 'src/@shared/models/animals';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  private getData: ReplaySubject<any> = new ReplaySubject<any>(1);
  public animals$: Observable<Animal[]> = this.getData.pipe(switchMap(evt => this.animalService.getAminals().pipe(map(x => x.result))))
  public columns: any[] = [
    { field: 'eventId', header: 'Eevent Id', editable: false },
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

  public group: FormGroup;
  public editGroup: FormGroup;
  public fieldInEdit: string;
  public idInEdit: number;


  constructor(private animalService: AnimalService,
    private fb: FormBuilder,
    private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData.next();
  }

  public delete(animal: Animal) {
    this.animalService.deleteAnimal(animal.eventId).subscribe(() => this.getData.next())
  }

  public saveNewRow() {
    let values = this.group.value;
    this.group = null;
    this.animalService.addAnimal(values).subscribe(() => this.getData.next())
  }

  public openAddRow() {
    let group = this.fb.group({});
    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      if (col.editable != false) {
        group.addControl(col.field, this.fb.control(''))
      }
    }
    this.group = group;
  }

  public closeNewRow() {
    this.group = null;
  }

  openCellEdit(animal: Animal, field: string) {
    this.idInEdit = animal.eventId;
    this.fieldInEdit = field;
    let group = this.fb.group({
      'eventId': this.fb.control(animal.eventId),
      [field]: this.fb.control(animal[field])
    })
    this.editGroup = group;
  }
  public saveCell() {
    let editedVal = this.editGroup.value;
    this.animalService.editAnimal(editedVal).subscribe(() => this.getData.next());
    this.closeCell();
  }

  public closeCell() {
    this.idInEdit = null;
    this.fieldInEdit = '';
    this.editGroup = null;
    this.cd.markForCheck()
  }
}
