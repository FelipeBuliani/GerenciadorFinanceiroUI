import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receitas } from '../models/Receitas';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  url: string = 'api/Receitas';

  constructor(private http: HttpClient) { }

  GetAll() : Observable<Receitas[]>{
    return this.http.get<Receitas[]>(this.url);
  }

  GetById(id: number) : Observable<Receitas>{
    return this.http.get<Receitas>(`${this.url}/${id}`)
  }

  Insert(receita: Receitas) : Observable<any>{
    return this.http.post<Receitas>(this.url, receita, httpOptions);
  }

  Update(id: number, receita: Receitas) : Observable<any>{
    return this.http.put<Receitas>(`${this.url}/${id}`, receita, httpOptions);
  }

  Delete(id: number) : Observable<any>{
    return this.http.delete<number>(`${this.url}/${id}`, httpOptions)
  }
}
