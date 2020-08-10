import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-container',
  templateUrl: './container-component.html',
  styleUrls: ['./container-component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContainerComponent implements OnInit {
  displayModal: boolean = false;
  myform: FormGroup;
  msgs: Message[] = [];

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myform = new FormGroup({
      operationName: new FormControl('', Validators.required),
      logicalExpression: new FormControl('', Validators.required)
    });
  }

  refreshPage() {
    this.msgs = [];
    this.myform.reset();
  }

  handleClickEmit(e) {
    const { finalCondition } = e;
    this.myform.patchValue({
      logicalExpression: finalCondition
    });
    this.displayModal = false;
  }

  conditionBuilderClick() {
    this.displayModal = true;
  }

  onSubmit() {
    if (this.myform.valid) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: `The ${this.myform.value.operationName}`, detail: 'has been successfully created.' });
      this.myform.reset();
    }
  }
}
