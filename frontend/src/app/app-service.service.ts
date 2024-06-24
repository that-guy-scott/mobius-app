import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor() {
  }


  submitJSON(url: string, json: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': this.getCookie('csrftoken')
      },
      body: JSON.stringify(json)
    });
  }

}
