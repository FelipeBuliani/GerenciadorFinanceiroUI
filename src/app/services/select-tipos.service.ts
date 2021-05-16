import { Injectable } from '@angular/core';
import { Tipo } from '../models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class SelectTiposService {

  constructor() { }

  tipos: Tipo[] = [{valor: 0, exibicao: "Fixa"}, {valor: 1, exibicao: "Esporadica"}]
    
    ObterTipos() : Tipo[]{
        return this.tipos;
    }
}
