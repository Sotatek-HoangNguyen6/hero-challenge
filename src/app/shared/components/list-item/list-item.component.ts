import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() items: any;
  @Output() onClickItem = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
