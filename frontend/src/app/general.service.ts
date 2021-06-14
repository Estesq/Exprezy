import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class GeneralService {
  garage: AngularFirestoreDocument<any> = null;

  garageId
  clientId

  serviceRequests_data
  acceptedservices_data
  ongoingservices_data
  completedservices_data

  serviceRequests
  acceptedservices
  ongoingservices
  completedservices

  constructor(private http: HttpClient, public db: AngularFirestore) {

    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];

    this.garage = db.collection('/clientgarage').doc(this.clientId);
    this.garage.valueChanges().subscribe(res => {    // subscribe to any changes in clentgarage db
      if (res.serviceRequests != this.serviceRequests) {       // checks if atleast one request is present and sets service request
        this.serviceRequests = res.serviceRequests
        if (this.serviceRequests.length == 0 || this.serviceRequests == null) {   // returns NPSR if service requests are empty
          this.serviceRequests_data = null;
          localStorage.setItem('servReq', this.serviceRequests_data)
          this.servReq_subject.next(localStorage.getItem('servReq'))
        } else {
          this.getuserdata(this.serviceRequests)   // getting userdata for all the requests present in service request
            .subscribe((data) => {
              this.serviceRequests_data = data['data'];   // sets all the retrieved job data to request data
              localStorage.setItem('servReq', JSON.stringify(this.serviceRequests_data))
              this.servReq_subject.next(localStorage.getItem('servReq'))
            })
        }
      }

      if (res.acceptedServices != this.acceptedservices) {       // checks if atleast one request is present and sets service request
        this.acceptedservices = res.acceptedServices

        if (this.acceptedservices.length == 0 || this.acceptedservices == null) {   // returns NPSR if service requests are empty
          this.acceptedservices_data = null;
          localStorage.setItem('accServ', this.acceptedservices_data)
          this.accServ_subject.next(localStorage.getItem('accServ'))
        }
        else {
          this.getuserdata(this.acceptedservices)   // getting userdata for all the requests present in service request
            .subscribe((data) => {
              this.acceptedservices_data = data['data'];   // sets all the retrieved job data to request data
              localStorage.setItem('accServ', JSON.stringify(this.acceptedservices_data))
              this.accServ_subject.next(localStorage.getItem('accServ'))
            })
        }
      }

      if (res.ongoingServices != this.ongoingservices) {       // checks if atleast one request is present and sets service request
        this.ongoingservices = res.ongoingServices
        if (this.ongoingservices.length == 0 || this.ongoingservices == null) {   // returns NPSR if service requests are empty
          this.ongoingservices_data = null;
          localStorage.setItem('ongServ', this.ongoingservices_data)
          this.ongServ_subject.next(localStorage.getItem('ongServ'))
        } else {
          this.getongoingservicedata(this.ongoingservices)  // getting userdata for all the requests present in service request
            .subscribe((data) => {
              this.ongoingservices_data = data['data'];   // sets all the retrieved job data to request data
              localStorage.setItem('ongServ', JSON.stringify(this.ongoingservices_data))
              this.ongServ_subject.next(localStorage.getItem('ongServ'))
            })
        }
      }

      if (res.completedServices != this.completedservices) {       // checks if atleast one request is present and sets service request
        this.completedservices = res.completedServices
        if (this.completedservices.length == 0 || this.completedservices == null) {   // returns NPSR if service requests are empty
          this.completedservices_data = null;
          localStorage.setItem('cmplServ', this.completedservices_data)
          this.cmplServ_subject.next(localStorage.getItem('cmplServ'))
        }
         else {
          this.getongoingservicedata(this.completedservices)  // getting userdata for all the requests present in service request
            .subscribe((data) => {
              this.completedservices_data = data['data'];   // sets all the retrieved job data to request data
              this.completedservices_data.sort((a,b)=>{
                return a.serviceId == b.serviceId ? 0 : (a.serviceId < b.serviceId) || -1;
                })
              localStorage.setItem('cmplServ', JSON.stringify(this.completedservices_data))
              this.cmplServ_subject.next(localStorage.getItem('cmplServ'))
            })
        }
      }
    });
  }

  servReq_subject = new BehaviorSubject(null);
  accServ_subject = new BehaviorSubject(null);
  ongServ_subject = new BehaviorSubject(null); 
  cmplServ_subject = new BehaviorSubject(null);

  getuserdata(serviceRequest) {
    return this.http.post<any>( environment.serverlink + "/getuserdata", { serviceRequest: serviceRequest })
    // return this.http.post<any>("http://localhost:5000/getuserdata", { serviceRequest: serviceRequest })
  }

  getongoingservicedata(ongoingservicedata) {
    return this.http.post<any>(environment.serverlink + "/getongoingservicedata", { ongoingservicedata: ongoingservicedata })
    // return this.http.post<any>("http://localhost:5000/getongoingservicedata", { ongoingservicedata: ongoingservicedata })
  }

  jobupdate(message, outdate1, item, serviceId, clientId) {
    return this.http.post<any>(environment.serverlink + "/jobupdate", { message: message, outdate: outdate1, item: item, serviceId: serviceId, clientId: clientId })
    // return this.http.post<any>("http://localhost:5000/jobupdate", { message: message, outdate: outdate1, item: item, serviceId: serviceId, clientId: clientId })
  }

}