import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  readonly url: string = "ws://127.0.0.1:8000/ws/socket-server";
  readonly new_url = 'ws://127.0.0.1:8000/ws/socket-server';
  chatSocket = new WebSocket(this.new_url);

  constructor() {
    // this.socket = io(this.url);
    this.chatSocket;
  }

  listen() {
    // return new Observable((subscriber) => {
    //   this.socket.on((data: any) => {
    //     subscriber.next(data);
    //   })
    // });
    this.chatSocket.onmessage = function (e) {
      let data = JSON.parse(e.data);
      console.log('Data: ', data);
    }
    console.log("Why");
    // this.chatSocket.send(JSON.stringify({
    //   "message": "data"
    // }));
  }

  // emit(eventName: string, data: any) {
  //   // this; this.socket.emit(eventName, data)
  //   this.chatSocket.send(JSON.stringify({
  //     "event": eventName,
  //     "message": data
  //   }))
  // }

  emit(data: any) {
    this.chatSocket.send(JSON.stringify({
      "message": data
    }))
  }

}
