import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="input-group mb-3" [formGroup]="group">
    <input type="text" class="form-control" [formControlName]="name">
    <div class="input-group-append">
      <span class="input-group-text" (click)="save()">
        <i class="far fa-save"></i>
      </span>
      <span class="input-group-text">
        <i class="far fa-window-close"></i>
      </span>
    </div>
  </div>
  `
})
export class InputComponent {

  @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
  public group: FormGroup;
  public name: string;

  constructor() { }

  public save() {
    this.onSave.emit(this.group.value)
  }

}
