import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/models/Tipo';
import { ReceitasService } from 'src/app/services/receitas.service';
import { SelectTiposService } from 'src/app/services/select-tipos.service';

@Component({
  selector: 'app-adicionar-receita',
  templateUrl: './adicionar-receita.component.html',
  styleUrls: ['./adicionar-receita.component.css']
})
export class AdicionarReceitaComponent implements OnInit {
  formulario: any;
  erros: string[];
  tipos: Tipo[]; 

  constructor(private receitasService: ReceitasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private selectTiposService: SelectTiposService) { }

  ngOnInit(): void {
    this.erros = [];
    this.tipos = this.selectTiposService.ObterTipos();
    
    this.formulario = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      valor: new FormControl(null, [Validators.required]),
      referencia: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required])
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario() : void{
    const receita = this.formulario.value;
    this.receitasService.Insert(receita).subscribe(resultado => {
      this.router.navigate(['receitas/listagemreceitas'])
      this.snackBar.open(resultado.messagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    (err) => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo)){
            this.erros.push(err.error.errors[campo])
          };
        };
      };
    });
  }

  VoltarListagem() : void{
    this.router.navigate(['receitas/listagemreceitas'])
  }
}
