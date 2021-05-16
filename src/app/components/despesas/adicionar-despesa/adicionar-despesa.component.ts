import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/models/Tipo';
import { DespesasService } from 'src/app/services/despesas.service';
import { SelectTiposService } from 'src/app/services/select-tipos.service';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  formulario: any;
  erros: string[];
  tipos: Tipo[]; 
  disabled = true;

  constructor(private despesasService: DespesasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private selectTiposService: SelectTiposService) { }

  ngOnInit(): void {
    this.erros = [];
    this.tipos = this.selectTiposService.ObterTipos();
    
    this.formulario = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      valor: new FormControl(null, [Validators.required]),
      referencia: new FormControl({value: null, disabled: this.disabled}),
      tipo: new FormControl(null, [Validators.required])
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario() : void{
    const despesa = this.formulario.value;
    this.despesasService.Insert(despesa).subscribe(resultado => {
      this.router.navigate(['despesas/listagemdespesas'])
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
    this.router.navigate(['despesas/listagemdespesas'])
  }

  ValidaReferencia(tipo: number) : void {
    if(tipo === 1){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    const despesa = this.formulario.value;
      this.formulario = new FormGroup({
        descricao: new FormControl(despesa.descricao, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
        valor: new FormControl(despesa.valor, [Validators.required]),
        referencia: new FormControl({value: despesa.referencia, disabled: this.disabled}),
        tipo: new FormControl(despesa.tipo, [Validators.required])
    });
  }
}
