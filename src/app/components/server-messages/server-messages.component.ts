import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-messages',
  templateUrl: './server-messages.component.html',
  styleUrls: ['./server-messages.component.scss']
})
export class ServerMessagesComponent implements OnInit {

  @Input() inputLabel:string;

  constructor() { }

  ngOnInit() {
  }

}
