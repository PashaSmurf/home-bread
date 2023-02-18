import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


export interface Bread {
  title: string;
  short_description: string;
  image_path: string;
}

export interface Resp {
  _source: Bread;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  testData: Array<Bread> = []
  size: number = 9;
  page: number = 0;
  total: number = 0;
  query: string = '';

  ngOnInit(): void {
    this.getESRecords();
  }

  getESRecords() {
    let body: any = {
      from: (this.page * this.size),
      size: this.size
    }
    if (this.query) {
      body.query = {
        "match": {
          "title": this.query
        }
      }
    }
    console.log(body);
    this.http.post<any>('http://62.108.34.98:2200/prod_index_2/_search', body).subscribe(response => {
      this.total = response.hits.total.value;
      let arr = response.hits.hits as Array<Resp>;
      this.testData = arr.map(record => {
        return record._source;
      });
    });
  }

  nextPage() {
    this.page += 1;
    this.getESRecords();
  }

  previousPage() {
    this.page -= 1;
    this.getESRecords();
  }

  search(event: any) {
    this.query = event.target.value;
    this.testData = []
    this.page = 0;
    this.getESRecords()
  }

}
