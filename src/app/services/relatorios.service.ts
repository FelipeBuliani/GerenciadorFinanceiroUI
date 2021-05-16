import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from '../models/Relatorio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  url: string = 'api/Relatorios';

  constructor(private http: HttpClient) { }

  GetAll(minDate: string, maxDate: string ) : Observable<Relatorio>{
    return this.http.get<Relatorio>(`${this.url}/${minDate}/${maxDate}`);
  }
}
