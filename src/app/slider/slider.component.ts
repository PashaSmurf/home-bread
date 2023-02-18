import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  testData: any = [
    {
      title: 'Хлеб черный',
      short_description: 'латдйтатадуцтацуцацуа',
      image_path: ''
    },
    {
      title: 'Хлеб белый',
      short_description: 'латдйтатадуцтацуцацуа',
      image_path: ''
    },
    {
      title: 'Булочка ржаная',
      short_description: 'латдйтатадуцтацуцацуа',
      image_path: ''
    },
    {
      title: 'Булочка с маком',
      short_description: 'латдйтатадуцтацуцацуа',
      image_path: ''
    }
  ]

  ngOnInit(): void {
  }

}
