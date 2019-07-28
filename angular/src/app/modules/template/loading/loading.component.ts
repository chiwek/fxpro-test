import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api/api.service";

@Component({
  selector: 'app-template-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

}
