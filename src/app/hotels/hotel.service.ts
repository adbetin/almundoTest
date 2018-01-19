import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HotelService {

  private hotelsUrl = '/api/hotels';

    constructor (private http: Http) {}

    // get("/api/hotels")
    gethotels(): Promise<void | Hotel[]> {
      return this.http.get(this.hotelsUrl)
                 .toPromise()
                 .then(response => response.json() as Hotel[])
                 .catch(this.handleError);
    }

    // post("/api/hotels")
    createhotel(newhotel: Hotel): Promise<void | Hotel> {
      return this.http.post(this.hotelsUrl, newhotel)
                 .toPromise()
                 .then(response => response.json() as Hotel)
                 .catch(this.handleError);
    }

    // get("/api/hotels/:id") endpoint not used by Angular app

    // delete("/api/hotels/:id")
    deletehotel(delhotelId: String): Promise<void | String> {
      return this.http.delete(this.hotelsUrl + '/' + delhotelId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/hotels/:id")
    updatehotel(puthotel: Hotel): Promise<void | Hotel> {
      var putUrl = this.hotelsUrl + '/' + puthotel._id;
      return this.http.put(putUrl, puthotel)
                 .toPromise()
                 .then(response => response.json() as Hotel)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }

}
