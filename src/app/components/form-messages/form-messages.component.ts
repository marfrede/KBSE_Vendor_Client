import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'control-messages',
  templateUrl: './form-messages.component.html'
})
export class FormMessagesComponent implements OnInit {
  message: string;
  @Input() input: string;
  @Input() inputLabel: string;
  @Input() form: FormGroup
  constructor() {}

  ngOnInit() {
  }

  public logErrors(){
    console.log("error with user input: " + this.input,this.form.get(this.input).errors);
  }
}
