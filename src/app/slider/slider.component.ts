import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


export interface Bread {
  id: string;
  title: string;
  short_description: string;
  image_path: string;
  metadata: any;
}

export interface ESRecord {
  _id: string;
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
    this.http.post<any>('http://78.111.73.205:2200/test_index_7/_search', body).subscribe(response => {
      this.total = response.hits.total.value;
      let arr = response.hits.hits as Array<ESRecord>;
      this.testData = arr.map(record => {
        return {...record._source, ...{id: record._id}};
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
