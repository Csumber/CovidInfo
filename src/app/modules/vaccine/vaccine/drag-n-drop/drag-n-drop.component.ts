import {Component, ElementRef, forwardRef, Inject, Input, OnDestroy, Optional, Self,} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors,} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: forwardRef(() => DragNDropComponent),
  }
  ],
})
export class DragNDropComponent implements ControlValueAccessor, MatFormFieldControl<string[]>, OnDestroy {

  static nextId = 0;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'app-drag-n-drop';
  id = `app-drag-n-drop-${DragNDropComponent.nextId++}`;
  @Input() optionsName = 'Options';
  @Input() selectedName = 'Selected';
  @Input() options: string[] = [];
  selected: string[] = [];
  private thePlaceholder = '';
  private isRequired = false;
  private isDisabled = false;

  constructor(
    private theFocusMonitor: FocusMonitor,
    private theElementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public theFormField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {

    this.selected = [];

    theFocusMonitor.monitor(theElementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.ngControl.valueAccessor = this;

  }

  get empty(): boolean {
    return !this.selected || this.selected.length < 0;
  }

  @Input()
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this.thePlaceholder;
  }

  set placeholder(value: string) {
    this.thePlaceholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this.isRequired;
  }

  set required(value: boolean) {
    this.isRequired = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get value(): string[] | null {
    if (this.selected) {
      return this.selected.slice();
    }
    return null;
  }

  set value(tel: string[] | null) {
    if (tel) {
      this.selected = tel;
    } else {
      this.selected = [];
    }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return !!this.selected;
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.theFocusMonitor.stopMonitoring(this.theElementRef);
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.theElementRef.nativeElement.querySelector('.example-tel-input-container');
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(): void {
    this.onTouched();
  }

  writeValue(tel: string[] | null): void {
    if (tel) {
      for (const s of tel) {
        this.options = this.options.filter(obj => obj !== s);
      }
    }
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ////////////////////////////////////////////////////////////////////////////////////

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.onChange(this.selected);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
