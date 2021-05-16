import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Despesas } from 'src/app/models/Despesas';
import { Tipo } from 'src/app/models/Tipo';
import { DespesasService } from 'src/app/services/despesas.service';
import { SelectTiposService } from 'src/app/services/select-tipos.service';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit {

  formulario: any;
  erros: string[];
  tipos: Tipo[];
  id: number;
  descricao: string;
  despesa: Observable<Despesas>;
  disabled = true;
  referenciaFormatada: string;


  constructor(private despesasService: DespesasService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private selectTiposService: SelectTiposService) { }

  ngOnInit(): void {
    this.erros = [];
    this.id = this.route.snapshot.params.id;

    this.despesasService.GetById(this.id).subscribe(resultado => {
      if(resultado.tipo === 1){
        this.disabled = false;
      }
      //if(resultado.referencia === null){
      //  resultado.referencia = null;
      //}
      //else{
      //  this.referenciaFormatada = null;
      //}
      this.descricao = resultado.descricao;
      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        descricao: new FormControl(resultado.descricao, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
        valor: new FormControl(resultado.valor, [Validators.required]),
        referencia: new FormControl({value: resultado.referencia === null ? null : resultado.referencia.toString().substr(0, 10), disabled: this.disabled}),
        tipo: new FormControl(resultado.tipo, [Validators.required])
      });
    })

    this.tipos = this.selectTiposService.ObterTipos();
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario() : void{
    const despesa = this.formulario.value;

    this.erros = [];
    this.despesasService.Update(this.id, despesa).subscribe(resultado => {
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
