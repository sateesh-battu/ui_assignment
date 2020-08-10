import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown-component.html'
})
export class DropdownComponent {
  @Input() data: any;
  @Input() arrIndex: any;
  @Input() form: FormGroup;
  @Output() updateConditionRow: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: SharedService) {
  }
  get control() {
    const fldName = this.data.name
    return this.form.controls[fldName];
  }

  // ngOnInit() {
  // }

  handleStatusChange(e, item) {
    if (item.name === 'conditionType') {
      let value = 'done';
      if (e && e.value === 'Exit code dependencies') {
        value = 'exitcode';
      }
      this.form.patchValue({
        conditionStatus: value
      });
    }
    this.service.setFormUpdate(this.form);
  }
  checkdisableStatus(val, frm) {
    if (val.name === 'conditionStatus') {
      return frm.value.conditionType === "Exit code dependencies";
    }
    return false;
  }
}
