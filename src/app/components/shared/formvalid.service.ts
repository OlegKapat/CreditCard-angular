import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormvalidService {

  constructor() { }
  status(status):Observable<boolean>{
      return status;
 }

}

