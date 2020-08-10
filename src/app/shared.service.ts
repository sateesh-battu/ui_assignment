import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private formOberver: BehaviorSubject<any> = new BehaviorSubject(null);
  dropDownData = [];
  constructor() {
    this.dropDownData = [
        {
          type: 'dropdown',
          htmlFor: 'conditionType',
          displayLabelName: 'Type',
          styleClass: 'conditional-comp--type',
          ngModel: 'selectedConditionType',
          inputId: 'conditionType',
          dropdownIcon: 'fas fa-caret-down',
          name: 'conditionType',
          optionList: [{ label: 'Status dependencies', value: 'Status dependencies' },
          { label: 'Exit code dependencies', value: 'Exit code dependencies' }],
      },
      {
          type: 'dropdown',
          htmlFor: 'conditionSubType',
          displayLabelName: 'Sub type',
          styleClass: 'conditional-comp--subType',
          ngModel: 'selectedConditionSubType',
          inputId: 'conditionSubType',
          dropdownIcon: 'fas fa-caret-down',
          name: 'conditionSubType',
          optionList: [{ label: 'None', value: 'None' },
          { label: 'Look-back', value: 'Look-back' }]
      },
      {
          type: 'dropdown',
          htmlFor: 'conditionStatus',
          displayLabelName: 'Status',
          styleClass: 'conditional-comp--status',
          ngModel: 'selectedConditionStatus',
          inputId: 'conditionStatus',
          dropdownIcon: 'fas fa-caret-down',
          name: 'conditionStatus',
          optionList: [{ label: 'Done', value: 'done' },
          { label: 'Exit code', value: 'exitcode' },
          { label: 'Failure', value: 'failure' },
          { label: 'Not running', value: 'notruning' },
          { label: 'Success', value: 'success' },
          { label: 'Terminated', value: 'terminated' }]
      }
    ];
  }

  getFormUpdate(): Observable<any> {
    return this.formOberver.asObservable();
  }

  setFormUpdate(profile: any) {
    this.formOberver.next(profile);
  }

  handleGroup(group, condStr) {
    group && group.rules &&group.rules.forEach(rule => {
      if (rule.type === 'group') {
        const groupRule = this.handleGroup(rule, '');
        if (groupRule.length) {
          condStr = (condStr.length ? (condStr + group.conditionOperator) : '') + ' (' + this.handleGroup(rule, '') + ')';
        }
      } else if (rule.type === 'condition') {
        condStr = (condStr.length ? (condStr + group.conditionOperator) : '') + ' (' + this.getConditionString(rule) + ') ';
      }
      else if (rule.rules && rule.rules.length === 0) {
        return false;
      }
    });
    return condStr;
  }

  getConditionString(rule) {
    let lookBackValues = '';
    let exitValues = '';
    if (rule.operater && rule.value) {
      if (rule.conditionSubType === 'Look-back') {
        lookBackValues = `,${rule.lookBackHours}: ${rule.lookBackMints}`;
      }
      if (rule.conditionType === 'Exit code dependencies') {
        exitValues = ` ${rule.operater} ${rule.value}`;
      }
      return `${rule.conditionStatus} ( ${rule.operationName} ${lookBackValues}) ${exitValues}`;
    } else {
      return `${rule.conditionStatus} ( ${rule.operationName} ),${rule.lookBackHours}: ${rule.lookBackMints}`;
    }
  }
}
