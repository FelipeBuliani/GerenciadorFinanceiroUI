import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Receitas } from 'src/app/models/Receitas';
import { Tipo } from 'src/app/models/Tipo';
import { ReceitasService } from 'src/app/services/receitas.service';
import { SelectTiposService } from 'src/app/services/select-tipos.service';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.css']
})
export class EditarReceitaComponent implements OnInit {
  formulario: any;
  erros: string[];
  tipos: Tipo[];
  id: number;
  descricao: string;
  receita: Observable<Receitas>;


  constructor(private receitasService: ReceitasService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private selectTiposService: SelectTiposService) { }

  ngOnInit(): void {
    this.erros = [];
    this.id = this.route.snapshot.params.id;

    this.receitasService.GetById(this.id).subscribe(resultado => {
      this.descricao = resultado.descricao;
      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        descricao: new FormControl(resultado.descricao, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
        valor: new FormControl(resultado.valor, [Validators.required]),
        referencia: new FormControl(resultado.referencia.toString().substr(0, 10), [Validators.required]),
        tipo: new FormControl(resultado.tipo, [Validators.required])
      });
    })

    this.tipos = this.selectTiposService.ObterTipos();
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario() : void{
    const receita = this.formulario.value;

    this.erros = [];
    this.receitasService.Update(this.id, receita).subscribe(resultado => {
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