import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  test = 'ws://pedago.univ-avignon.fr:3223';
  url2 = 'http://pedago.univ-avignon.fr:3223';

  // socket: SocketIOClient.Socket;

  constructor(private http: HttpClient) {

    // this.socket = io.connect(this.url2, {
    //   "transports": ["websocket"]
    // });
  }

  listen(eventName: string): any {

    // Web socket test
    // return this.socket;


    // Create subscriber
    // return new Observable((sub) => {

    //   // Listen to the endpoint
    //   this.socket.on(eventName, (data) => {

    //     // Update itself with the new data
    //     sub.next(data);
    //   })
    // });
  }

  emit(eventName: string, data: any): any {

    // Emit the data
    // this.socket.emit(eventName, data);
  }
}
