import {Injectable} from '@angular/core';
import {Toast} from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

  createToastMessage(message: string, type: string) {

    // text-mobius-navy
    // Create the outer div for the toast
    const toastDiv = document.createElement('div');
    // toastDiv.classList.add('toast', 'align-items-center', `text-bg-${type}`, 'border-0');
    toastDiv.classList.add('toast', 'align-items-center', `text-bg-mobius-${type}`, 'border-0');
    toastDiv.setAttribute('role', 'alert');
    toastDiv.setAttribute('aria-live', 'assertive');
    toastDiv.setAttribute('aria-atomic', 'true');

    // Create the inner div for the toast body
    const toastBodyDiv = document.createElement('div');
    toastBodyDiv.classList.add('d-flex');

    // Create the div for the toast content
    const toastContentDiv = document.createElement('div');
    toastContentDiv.classList.add('toast-body');
    toastContentDiv.textContent = message;

    // Create the button for the close action
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close', 'btn-close-white', 'me-2', 'm-auto');
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    // Append the toast content and close button to the inner div
    toastBodyDiv.appendChild(toastContentDiv);
    toastBodyDiv.appendChild(closeButton);

    // Append the inner div to the outer div
    toastDiv.appendChild(toastBodyDiv);

    // Append the toast to the toast container
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
      toastContainer.appendChild(toastDiv);
    } else {
      console.error('Toast container not found!');
      return;
    }

    // Initialize and show the toast using Bootstrap's toast JavaScript plugin
    const toast = new Toast(toastDiv);
    toast.show();
  }

}
