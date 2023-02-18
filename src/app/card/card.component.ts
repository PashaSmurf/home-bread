import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Bread, ESRecord} from "../slider/slider.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  bread: any = null;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get<any>('http://62.108.34.98:2200/test_index_7/_doc/' + this.router.url.split('?id=')[1]).subscribe(response => {
      this.bread = response._source as Bread;
    });
  }

}
