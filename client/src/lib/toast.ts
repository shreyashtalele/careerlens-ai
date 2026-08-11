import { toast as sonnerToast } from "sonner";

export interface ToastOptions {
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  id?: string;
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      id: options?.id,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, {
      duration: options?.duration || 4000,
      position: options?.position || "top-right",
      id: options?.id,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      id: options?.id,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      id: options?.id,
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ): void => {
    sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  dismiss: (id?: string | number) => {
    if (id !== undefined) {
      sonnerToast.dismiss(id);
    } else {
      sonnerToast.dismiss();
    }
  },

  loading: (message: string): string | number => {
    return sonnerToast.loading(message);
  },
};
