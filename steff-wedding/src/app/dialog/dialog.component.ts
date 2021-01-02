import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {

  @Input() public title: string = '';
  @Input() public confirm: string | undefined;
  @Input() public cancel: string = 'Затвори';
  @Output() public confirmed = new EventEmitter<void>();

  public isOpen = false;

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  public onConfirm() {
    this.confirmed.emit();
  }
}
