import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-completedservices',
  templateUrl: './completedservices.component.html',
  styleUrls: ['./completedservices.component.css']
})
export class CompletedservicesComponent implements OnInit {
  ngOnInit(): void { }


  userId
  garageId
  clientId
  userdata: AngularFirestoreDocument<any> = null;
  users: Observable<AngularFirestoreDocument[]>;
  garage: AngularFirestoreDocument<any> = null;
  // garage: AngularFirestoreDocument<any> = null;
  completed
  completedservice_data
  jobcardvar: Observable<AngularFirestoreDocument>;
  message
  action


  constructor(private _snackBar: MatSnackBar, private general: GeneralService, private router: Router, public db: AngularFirestore) {


    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
    this.garageId = jwt_decode(localStorage.getItem('access_token'))['garageId'];
    this.clientId = jwt_decode(localStorage.getItem('access_token'))['clientId'];

    // console.log(this.userId, 'user')
    // console.log(this.garageId, 'garage')
    // console.log(this.clientId, 'client')
    this.general.cmplServ_subject.subscribe((data) => {
      this.completedservice_data = JSON.parse(data);
    })


    // get realtime value changes from clientgarages 
    // this.garage = db.collection('/clientgarage').doc(this.clientId);
    // this.garage.valueChanges().subscribe(res => {  // subscribe to any changes in clentgarage db
    //   if (res.completedServices.length > 0) {  // checks if atleast one request is present and sets service request
    //     this.completed = res.completedServices
    //   }
    //   else {    //  NPSR ( no pending service requests )
    //     this.completed = "Npsr"
    //   }
    //   this.general.getongoingservicedata(this.completed)   // getting userdata for all the requests present in service request
    //     .subscribe((data) => {
    //       if (data['data'] == "npsr") {     // returns NPSR if service requests are empty
    //         this.requesteddata = null;
    //       }
    //       else {  // sets all the retrieved job data to request data
    //         this.requesteddata = data['data'];
    //         // console.log(data['data'], 'data')
    //       }
    //     })
    // });

  }

  printInvoice(ele) {

    // console.log(ele, "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
    const printContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        <style>
        .clearfix:after {
          content: "";
          display: table;
          clear: both;
        }
        
        a {
          color: #5D6975;
          text-decoration: underline;
        }
        
        body {
          position: relative;
          width: 21cm;  
          height: 29.7cm; 
          margin: 0 auto; 
          color: #001028;
          background: #FFFFFF; 
          font-family: Arial, sans-serif; 
          font-size: 12px; 
          font-family: Arial;
        }
        
        header {
          padding: 10px 0;
          margin-bottom: 30px;
        }
        
        #logo {
          text-align: center;
          margin-bottom: 10px;
        }
        
        #logo img {
          width: 90px;
        }

        .h1{
          color: #5D6975;
          font-size: 2.4em;
          line-height: 1.4em;
          font-weight: normal;
          text-align: center;
        }
        
        h1 {
          border-top: 1px solid  #5D6975;
          border-bottom: 1px solid  #5D6975;
          color: #5D6975;
          font-size: 2.4em;
          line-height: 1.4em;
          font-weight: normal;
          text-align: center;
          margin: 0 0 20px 0;
          background: url(dimension.png);
        }
        
        #project {
          float: left;
        }
        
        #project span {
          color: #5D6975;
          text-align: right;
          width: 52px;
          margin-right: 10px;
          display: inline-block;
          font-size: 0.8em;
        }
        
        #company {
          float: right;
          text-align: right;
        }
        
        #project div,
        #company div {
          white-space: nowrap;        
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 20px;
        }
        
        table tr:nth-child(2n-1) td {
          background: #F5F5F5;
        }
        
        table th,
        table td {
          text-align: center;
        }
        
        table th {
          padding: 5px 20px;
          color: #5D6975;
          border-bottom: 1px solid #C1CED9;
          white-space: nowrap;        
          font-weight: normal;
        }
        
        table .service,
        table .desc {
          text-align: left;
        }
        
        table td {
          padding: 20px;
          text-align: right;
        }
        
        table td.service,
        table td.desc {
          vertical-align: top;
        }
        
        table td.unit,
        table td.qty,
        table td.total {
          font-size: 1.2em;
        }
        
        table td.grand {
          border-top: 1px solid #5D6975;;
        }
        
        #notices .notice {
          color: #5D6975;
          font-size: 1.2em;
        }
        
        footer {
          color: #5D6975;
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #C1CED9;
          padding: 8px 0;
          text-align: center;
        }
        </style>
      </head>
      <body>
        <header class="clearfix">
          <div id="logo">
            <p class="h1">`+ ele.garage+` </p>
          </div>
          <h1>INVOICE `+ele.invoice +`</h1>
          <div id="company" class="clearfix">
            <div>Company Name</div>
            <div>455 Foggy Heights,<br /> AZ 85004, US</div>
            <div>(602) 519-0450</div>
            <div><a href="mailto:company@example.com">company@example.com</a></div>
          </div>
          <div id="project">
            <div><span>CLIENT</span> `+ele.vehicleOwner + ` </div>
            <div><span>ADDRESS</span> 796 Silver Harbour, TX 79273, US</div>
            <div><span>EMAIL</span> <a href="mailto:john@example.com">john@example.com</a></div>
            <div><span>Mobile no.</span> `+ ele.ownerMobileno +`</div>
            <div><span>In-DATE</span>`+ ele.inDate+`</div>
            <div><span>Out-DATE</span> `+ ele.outDate+`</div>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th class="service">SERVICE</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="service">Design</td>
                <td class="unit">$40.00</td>
                <td class="qty">26</td>
                <td class="total">$1,040.00</td>
              </tr>
              <tr>
                <td colspan="3">SUBTOTAL</td>
                <td class="total">₹`+ ele.cost+`</td>
              </tr>
              <tr>
                <td colspan="3">TAX 25%</td>
                <td class="total">₹1,300.00</td>
              </tr>
              <tr>
                <td colspan="3" class="grand total">GRAND TOTAL</td>
                <td class="grand total">₹6,500.00</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
          </div>
        </main>
        <footer>
          Invoice was created on a computer and is valid without the signature and seal.
        </footer>
      </body>
    </html>
    `
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  sendInvoice() {

  }
}
