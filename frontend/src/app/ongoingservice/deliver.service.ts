import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  count
  constructor(private http: HttpClient, private general: GeneralService) {
    
  }

  // respected serviceid is put in completed service in db
  deliver(keydata, clientId, garageId) {
    // console.log("inside deliver")
    this.general.cmplServ_subject.subscribe((data) => {
      if(JSON.parse(data) != null ){
      this.count = JSON.parse(data).length
      // console.log(typeof this.count)
      }
      else{
        this.count = 0
        // console.log(this.count)
      }
    })
    
    return this.http.post<any>(environment.serverlink + "/deliver", { keydata: keydata, clientId: clientId, garageId: garageId, count: this.count })
    return this.http.post<any>("http://localhost:5000/deliver", { keydata: keydata, clientId: clientId, garageId: garageId, count: this.count })
  }
 
}
