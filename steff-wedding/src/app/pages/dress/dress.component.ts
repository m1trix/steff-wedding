import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Dress, DressService } from 'src/app/dress.service';
import { mergeMap } from 'rxjs/operators';

const RATIO = 16 / 9;

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.sass']
})
export class DressComponent {

  public dress$: Observable<Dress | undefined>;

  constructor(private route: ActivatedRoute, private service: DressService) {
    this.dress$ = route.params.pipe(
      mergeMap(params => service.getDress(+params.id))
    );
  }
}
