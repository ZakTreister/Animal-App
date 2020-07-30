import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { CattleEvent } from 'src/@shared/models/cattle-event';
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


  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void { }

  public deleteRow(item: any) {
    this.deleteItem.emit(item)
  }

  public saveNewRow() {
    let values = this.group.value;
    this.addItem.emit(values);
    this.closeCell();
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

  public openCellEdit(item: CattleEvent, field: string) {
    this.idInEdit = item[this.dataKey];
    this.fieldInEdit = field;
    let group = this.fb.group({
      [this.dataKey]: this.fb.control(item[this.dataKey]),
      [field]: this.fb.control(item[field])
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
  }
}
