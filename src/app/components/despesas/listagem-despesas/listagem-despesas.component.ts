import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DespesasService } from 'src/app/services/despesas.service';

@Component({
  selector: 'app-listagem-despesas',
  templateUrl: './listagem-despesas.component.html',
  styleUrls: ['./listagem-despesas.component.css']
})
export class ListagemDespesasComponent implements OnInit {

  despesas = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor(private despesasService: DespesasService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.despesasService.GetAll().subscribe(resultado => {
      this.despesas.data = resultado;
    })
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['descricao', 'valor', 'referencia', 'tipo', 'acoes']
  }

  AbrirDialog(id, descricao): void{
    this.dialog
      .open(DialogExclusaoDespesaComponent, {
        data: {
          id: id,
          descricao: descricao
        }
      })
      .afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.despesasService.GetAll().subscribe((dados) => {
            this.despesas.data = dados; 
          });

          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-despesa',
  templateUrl: 'dialog-exclusao-despesa.html'
})
export class DialogExclusaoDespesaComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public dados: any,
  private despesasService: DespesasService,
  private snackBar: MatSnackBar){}

  ExcluirDespesa(id): void {
    this.despesasService.Delete(id).subscribe(resultado => {
      this.snackBar.open(resultado.messagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
