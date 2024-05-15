import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  removeLoaderClass(): void {
    const loaderElement = document.querySelector('.ct_loader');
    if (loaderElement) {
      loaderElement.classList.remove('ct_loader');
    }
  }
}
