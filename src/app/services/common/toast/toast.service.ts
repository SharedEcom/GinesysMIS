import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastInfo } from 'src/app/models/toast/toast-info';
import { ToastTypes } from 'src/app/models/toast/toast-types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  data!: ToastInfo;
  public open = new Subject<ToastInfo>();

  constructor() { }

  initiate(data: ToastInfo) {
    if (data.type) {
      // this.data.type = ToastTypes.error;
      // console.log(ToastTypes[data.type])
    }
    this.data = { ...data, show: true, progressWidth: '100%' };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }

  showToaster(data:any, toastType: ToastTypes) {
    this.initiate({
      title: data.serviceMessage.type,
      content: data.serviceMessage.message,
      show: true,
      type: toastType
    });
  }
}
