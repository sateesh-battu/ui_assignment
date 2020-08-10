import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-condition-builder',
  templateUrl: './condition-builder.component.html',
  styleUrls: ['./condition-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConditionBuilderComponent implements OnInit {

  operatorList: any[] = [
    { label: 'And', value: 'And' },
    { label: 'Or', value: 'Or' }
  ];
  @Input() conditionBuildForm: FormGroup;
  @Input() formIndex: number;
  rules: FormArray;
  parentFlag: boolean = false;
  condition: string;
  showPreviewExp: boolean = false;

  constructor(private service: SharedService, private fb: FormBuilder) { }

  get rulesArray() {
    // let subForm:any =this.conditionBuildForm.get('rules');
    const subForm: any = this.conditionBuildForm.controls.rules || {};
    return subForm.controls;
  }

  ngOnInit() {
    if (!this.conditionBuildForm) {
      this.parentFlag = true;
      this.conditionBuildForm = this.createRuleSet();
      this.updateExpression();
    }
    const rules = this.conditionBuildForm.controls['rules'].value;
    if (rules.length === 0) {
      this.getConditionSelectControl.disable();
    }
  }

  get getConditionSelectControl() {
    return this.conditionBuildForm.controls['conditionOperator'];
  }

  updateExpression() {
    this.condition = this.service.handleGroup(this.conditionBuildForm.value, '');
    this.service.setFormUpdate(this.conditionBuildForm);
  }

  createRuleSet() {
    return this.fb.group({
      conditionOperator: new FormControl('And', Validators.required),
      type: new FormControl('group'),
      rules: this.fb.array([])
    });
  }

  changeCond() {
    this.updateExpression();
  }
  addCondition() {
    this.conditionBuildForm.addControl('rules', this.fb.array([]));
    (this.conditionBuildForm.controls['rules'] as FormArray).push(this.createRule());
    // this.service.setFormUpdate(this.conditionBuildForm);
    this.getConditionSelectControl.enable();
    this.updateExpression();
  }

  addGroup() {
    this.conditionBuildForm.addControl('rules', this.fb.array([]));
    (this.conditionBuildForm.controls['rules'] as FormArray).push(this.createRuleSet());
    // this.conditionBuildForm = this.createRuleSet();
    this.updateExpression();
  }

  removeForm(i) {
    if (!i) {
      this.conditionBuildForm = this.createRuleSet();
      this.service.setFormUpdate({form: this.conditionBuildForm, formStatus:true});
    }
    const control = this.conditionBuildForm && this.conditionBuildForm.parent as FormArray;
    control && control.removeAt(i);
    const rules = this.conditionBuildForm.controls['rules'].value;
    if (rules.length === 0) {
      this.getConditionSelectControl.disable();
    }
    this.updateExpression();
  }

  createRule() {
    const queryForm = this.fb.group({
      conditionType: new FormControl('Status dependencies'),
      conditionSubType: new FormControl('None'),
      conditionStatus: new FormControl('done'),
      operationName: new FormControl('sample_operA',  [Validators.required, Validators.minLength(2), 
        Validators.maxLength(5)]),
      lookBackHours: new FormControl('01', [Validators.required, Validators.minLength(1), Validators.maxLength(9999)]),
      lookBackMints: new FormControl('01', [Validators.required, Validators.minLength(1), Validators.maxLength(59)]),
      operater: new FormControl('<=', Validators.required),
      value: new FormControl('0', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
      type: new FormControl('condition')
    });
    return queryForm;
  }

  updateConditionRow(e) {
    if (e && e.type === 'add') {
      const arr = (this.conditionBuildForm.controls['rules'] as FormArray);
      arr.insert(e.arrayIndex + 1, this.createRule());
    } else {
      const ele = (this.conditionBuildForm.controls['rules'] as FormArray);
      ele.removeAt(e.arrayIndex);
    }
    this.updateExpression();
  }

  onOpenClose(mode, conditionBuildForm) {
    if (mode === 'open') {
      this.showPreviewExp = false;
    } else {
      this.showPreviewExp = true;
      this.condition = this.service.handleGroup(conditionBuildForm.value, '');
    }
  }
}
