import { Component, Inject, OnInit } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-receitas',
  templateUrl: './listagem-receitas.component.html',
  styleUrls: ['./listagem-receitas.component.css']
})
export class ListagemReceitasComponent implements OnInit {

  receitas = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor(private receitasService: ReceitasService,
    private dialog: MatDialog){ }

  ngOnInit(): void {
    this.receitasService.GetAll().subscribe(resultado => {
      this.receitas.data = resultado;
    })
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['descricao', 'valor', 'referencia', 'tipo', 'acoes']
  }

  AbrirDialog(id, descricao): void{
    this.dialog
      .open(DialogExclusaoReceitaComponent, {
        data: {
          id: id,
          descricao: descricao
        }
      })
      .afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.receitasService.GetAll().subscribe((dados) => {
            this.receitas.data = dados; 
          });

          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-receita',
  templateUrl: 'dialog-exclusao-receita.html'
})
export class DialogExclusaoReceitaComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
  private receitasService: ReceitasService,
  private snackBar: MatSnackBar){}

  ExcluirReceita(id): void {
    this.receitasService.Delete(id).subscribe(resultado => {
      this.snackBar.open(resultado.messagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
