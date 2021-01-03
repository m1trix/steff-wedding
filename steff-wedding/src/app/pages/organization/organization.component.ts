import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { StickService } from 'src/app/stick.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent implements AfterViewInit {

  @ViewChild('picture') pictureRef: ElementRef<HTMLElement> = undefined as unknown as ElementRef;
  @ViewChild('dialog') dialog: DialogComponent | undefined;

  public group = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, Validators.required)
  });

  // TODO: scrollIntoView center/nearest depending on window.matchMedia()
  public errorMessage: string | undefined;
  public successMessage: string | undefined;

  constructor(
    private stickService: StickService,
    private httpClient: HttpClient,
    private detector: ChangeDetectorRef
  ) { }

  /** @override */
  public ngAfterViewInit() {
    this.stickService.register(
      'organize-picture',
      this.pictureRef.nativeElement,
      [],
      '(min-width: 481px)'
    );
  }

  public onSubmit(event: Event) {
    if (this.group.invalid) {
      this.errorMessage = 'Моля, полълнете всички полета!';
      this.detector.markForCheck();
      return;
    }

    this.errorMessage = undefined;
    const data = new FormData();
    data.append('name', this.group.value.name);
    data.append('email', this.group.value.email);
    data.append('message', this.group.value.message);

    this.httpClient.post('https://formspree.io/f/xvovveoy', data, {
      headers: {
        'Accept': 'application/json'
      }
    }).subscribe({
      complete: () => {
        this.successMessage = 'Запитването беше изпратено успешно!';
        setTimeout(() => {
          this.successMessage = undefined;
          this.detector.markForCheck();
          this.dialog?.close();
        }, 3000);
        this.detector.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Възникна грешка при изпращаненето. Опитайте отново или ръчно изпратете запитване';
        this.detector.markForCheck();
      }
    })
  }
}
