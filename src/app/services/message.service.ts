import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message: String;
  public success: boolean = false;

  constructor() { }

  setMessageTimeout(newMessage: string, timeout: number, success?:boolean) {
    this.message = newMessage;
    if (timeout > 0) {
      setTimeout(() => {
        this.message = null;
      }, timeout);
    }
    this.success = success;
  }

  setMessage(newMessage:string, success?:boolean) {
    this.message = newMessage;
    this.success = success;
  }

  clearMessage() {
    this.message = null;
  }
}
