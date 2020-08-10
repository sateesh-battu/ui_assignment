import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-condition-builder-form',
  templateUrl: './condition-builder-form.component.html'
})
export class ConditionBuilderFormComponent {
  operationName: any[] = [];
  operationNameList: any[] = [];
  childNodes: any;
  dropDownList: any[] = [];

  @Input() form: FormGroup;
  @Input() arrayIndex: number;
  @Output() updateConditionRow: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: SharedService) {
    this.operationNameList = ['sample_operA', 'sample_operB', 'sample_operC', 'sample_operD'];
    this.dropDownList = service.dropDownData;
  }

  get childNodeControls() {
    const data: any = this.form.controls['children'] || {};
    return data ? data.controls : null;
  }

  // ngOnInit() {
  // }

  filterOperationName(event) {
    this.operationName = [];
    for (let i = 0; i < this.operationNameList.length; i++) {
      const item = this.operationNameList[i];
      if (item.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.operationName.push(item);
      }
    }
  }

  addRemoveRow(type, form, arrayIndex) {
    this.updateConditionRow.emit({ type, arrayIndex });
  }

  updateExpression() {
    this.service.setFormUpdate(this.form);
  }
  
}
