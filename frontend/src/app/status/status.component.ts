import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  ngOnInit(): void { }

  playerName: string;
  constructor(public general: GeneralService) { }

submit(yn){

}

}
