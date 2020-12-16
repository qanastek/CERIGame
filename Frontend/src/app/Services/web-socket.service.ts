import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  url2 = 'http://pedago.univ-avignon.fr:3223';

  socket: SocketIOClient.Socket;

  constructor() {

    this.socket = io.connect(this.url2, {
      "transports": ["websocket"]
    });
  }

  listen(eventName: string): Observable<any> {

    console.log(`eventName: ${eventName}`);

    // Web socket test
    // return this.socket;

    // Create subscriber
    return new Observable((sub) => {

      console.log(`${eventName} -----`);

      // Listen to the endpoint
      this.socket.on(eventName, (data) => {

        // Update itself with the new data
        sub.next(data);
      })
    });
  }

  emit(eventName: string, data: any): any {

    // Emit the data
    this.socket.emit(eventName, data);
  }
}
