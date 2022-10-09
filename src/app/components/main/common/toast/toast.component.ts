import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastTypes } from 'src/app/models/toast/toast-types';
import { ToastService } from '../../../../services/common/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          left: '40%',
          top: '-400px',
        })
      ),
      state(
        'open',
        style({
          left: '40%',
          top: '40px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {

  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  progressInterval: any;
  toastClass !: string;

  constructor(public toastService: ToastService) {

    this.toastService.open.subscribe((data) => {
      if (data.show) {
        this.countDown();
      }
    });

   }

  ngOnInit(): void {
  }

  countDown() {
    this.progressBar.nativeElement.style.width =
      this.toastService.data.progressWidth;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.toastService.data.progressWidth = String(width - 2);
      this.progressBar.nativeElement.style.width =
        this.toastService.data.progressWidth + '%';
    }, 150);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }

  checkToastType(type: ToastTypes) {
    if (ToastTypes[type] === ToastTypes.success.toString()) {
      this.toastClass = 'success'
    } else if (ToastTypes[type] === ToastTypes.error.toString()) {
      this.toastClass = 'danger'
    } else if (ToastTypes[type] === ToastTypes.info.toString()) {
      this.toastClass = 'info'
    } else {
      this.toastClass = 'warn'
    }
  }

}
