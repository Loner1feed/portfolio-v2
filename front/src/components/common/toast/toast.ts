export interface ToastMessage {
  type: string;
  message: string;
}

class Toast {
  private callback: ((message: ToastMessage) => void) | null | undefined;

  public registerCallback(
    cb: ((message: ToastMessage) => void) | null | undefined,
  ) {
    this.callback = cb;
  }

  private showToast(type: string, message: string) {
    if (this.callback) {
      this.callback({ type, message });
    }
  }

  public error(message: string) {
    this.showToast('error', message);
  }

  public info(message: string) {
    this.showToast('info', message);
  }

  // Add more methods for success, warning as per need
}

export const toast = new Toast();
