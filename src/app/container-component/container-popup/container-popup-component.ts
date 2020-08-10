import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-container-popup',
  templateUrl: './container-popup-component.html',
  styleUrls: ['./container-popup-component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContainerPopupComponent implements OnInit {
  @Input() displayModal: boolean = false;
  @Output() handleClickEmit: EventEmitter<any> = new EventEmitter<any>();
  conditionBuildForm: FormGroup;
  finalCondition: string = '';

  constructor(private fb: FormBuilder, private service: SharedService) { }

  ngOnInit() {
    if (!this.conditionBuildForm) {
      this.conditionBuildForm = this.createRuleSet();
      this.service.setFormUpdate(this.conditionBuildForm);
    }

    this.service.getFormUpdate().subscribe(res => {
      this.finalCondition = '';
      const { formStatus } = res;
      if (formStatus) {
        this.conditionBuildForm = this.createRuleSet();
      }
      this.getQueryBuilderRule(this.conditionBuildForm.value);
    });
  }

  getQueryBuilderRule(result) {
    if (result.rules && result.rules.length && result.conditionOperator) {
      this.finalCondition = this.service.handleGroup(result, '');
    }
  }

  createRuleSet() {
    return this.fb.group({
      conditionOperator: new FormControl('And', Validators.required),
      rules: this.fb.array([])
    });
  }

  handleClick(type) {
    this.handleClickEmit.emit({ type, finalCondition: this.finalCondition });
  }

  onShow() {
    this.finalCondition = '';
    this.conditionBuildForm = this.createRuleSet();
    // this.conditionBuildForm.reset();
    // this.service.handleGroup(this.conditionBuildForm.value, '');
  }
}
