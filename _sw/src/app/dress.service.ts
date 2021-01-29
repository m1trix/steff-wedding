import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Dress {
  id: number;
  name: string;
  description: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DressService {

  private dresses: Dress[] | undefined;

  constructor(private client: HttpClient) { }

  public getDresses(): Observable<Dress[]> {
    if (this.dresses) {
      return of(this.dresses);
    }

    let dresses$ = this.client.get<Dress[]>('/api/v1/dresses');
    dresses$.forEach(dresses => this.dresses = dresses);
    return dresses$;
  }

  public getDress(id: number): Observable<Dress | undefined> {
    return this.getDresses().pipe(
      map(dresses => dresses.find(dress => dress.id === id))
    );
  }
}
