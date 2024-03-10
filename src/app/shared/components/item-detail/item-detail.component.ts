import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  @Input() item: any;
  @Input() isHero = false;
  @Output() emitAddWeapon = new EventEmitter();
  @Output() emitAddArmor = new EventEmitter();
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
