import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dress, DressService } from 'src/app/dress.service';

@Component({
  selector: 'app-dresses',
  templateUrl: './dresses.component.html',
  styleUrls: ['./dresses.component.sass']
})
export class DressesComponent {

  public dresses$: Observable<Dress[]>;
  public hoverIndex = -1;

  constructor(private service: DressService) {
    this.dresses$ = this.service.getDresses();
  }
}
