import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() public addItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateItem: EventEmitter<any> = new EventEmitter<any>();

  @Input() public columns: any[];
  @Input() public items: any[];
  @Input() public dataKey: string;


  public group: FormGroup;
  public editGroup: FormGroup;

  public fieldInEdit: string;
  public idInEdit: number;


  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  public deleteRow(item: any) {
    this.deleteItem.emit(item)
  }

  public saveNewRow() {
    let values = this.group.value;
    this.group = null;
    this.addItem.emit(values);
  }

  public openAddRow() {
    if (!this.group) {
      let group = this.fb.group({});
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        if (col.editable != false) {
          group.addControl(col.field, this.fb.control(''))
        }
      }
      this.group = group;
    }
  }

  public closeNewRow() {
    this.group = null;
  }

  openCellEdit(animal: Animal, field: string) {
    this.idInEdit = animal.eventId;
    this.fieldInEdit = field;
    let group = this.fb.group({
      [this.dataKey]: this.fb.control(animal.eventId),
      [field]: this.fb.control(animal[field])
    })
    this.editGroup = group;
  }
  public saveCell() {
    let editedVal = this.editGroup.value;
    this.updateItem.emit(editedVal);
    this.closeCell();
  }

  public closeCell() {
    this.idInEdit = null;
    this.fieldInEdit = '';
    this.editGroup = null;
    this.cd.markForCheck()
  }
}
