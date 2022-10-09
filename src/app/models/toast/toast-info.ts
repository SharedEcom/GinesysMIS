import { ToastTypes } from "./toast-types";

export interface ToastInfo {
    title: string;
    content: string;
    show?: boolean;
    type?: ToastTypes;
    progressWidth?: string;
}