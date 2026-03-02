// ─── Toast notification system ───────────────────────────────────────────────

let toastContainer: HTMLElement | null = null;

function ensureContainer(): HTMLElement {
  if (toastContainer && document.body.contains(toastContainer)) {
    return toastContainer;
  }
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);
  return toastContainer;
}

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

const TOAST_ICONS: Record<ToastType, string> = {
  success: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
  error: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  info: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  warning: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>`,
};

export function showToast(options: ToastOptions): void {
  const container = ensureContainer();
  const { message, type = "info", duration = 3000, action } = options;

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${TOAST_ICONS[type]}</span>
    <span class="toast__message">${escHtml(message)}</span>
    ${action ? `<button class="toast__action">${escHtml(action.label)}</button>` : ""}
    <button class="toast__close" aria-label="Close">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  // Event handlers
  const dismiss = (): void => {
    toast.classList.add("toast--exit");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector(".toast__close")?.addEventListener("click", dismiss);

  if (action) {
    toast.querySelector(".toast__action")?.addEventListener("click", () => {
      action.onClick();
      dismiss();
    });
  }

  container.appendChild(toast);

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
