import { Injectable, TemplateRef } from '@angular/core';
import { ToastInfo } from '../../models/toast/toast-info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = []

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
