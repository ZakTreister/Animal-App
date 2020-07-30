import { Directive, ViewContainerRef, Input, ViewChild, TemplateRef, ContentChildren, Query, QueryList, ContentChild, AfterViewInit, ViewRef, ElementRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Directive({
  selector: '[appInput]',
  host: {
    '(click)': 'openEdit()'
  }
})
export class InputDirective implements AfterViewInit {
  private _editOpen: boolean = false;
  @ContentChild(TemplateRef) public template: TemplateRef<any>;
  @Input('appInput') public value: any;
  @Input() public name: string;

  constructor(private containerRef: ViewContainerRef,
    private viewRef:ElementRef) {
  }
  ngAfterViewInit(): void {
  }

  openEdit() {
    if (!this._editOpen) {
      this.containerRef.clear();

    }
  }
}
