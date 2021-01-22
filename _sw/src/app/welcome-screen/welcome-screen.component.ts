import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.sass']
})
export class WelcomeScreenComponent implements OnInit {

  public showSwogan = false;
  public showButton = false;

  ngOnInit(): void {
    setTimeout(() => this.showSwogan = true, 1000);
    setTimeout(() => this.showButton = true, 3000);
  }
}
