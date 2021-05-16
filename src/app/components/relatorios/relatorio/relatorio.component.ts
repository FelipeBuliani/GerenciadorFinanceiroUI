import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, map } from 'rxjs/operators';
import { RelatoriosService } from 'src/app/services/relatorios.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  receitas = new MatTableDataSource<any>();
  totalReceitas: number;
  despesas = new MatTableDataSource<any>();
  totalDespesas: number;
  total: number;
  displayedColumns: string[];
  filtroDatas: any;

  constructor(private relatorioService: RelatoriosService) { }

  ngOnInit(): void {
    this.filtroDatas = new FormGroup({
      inicial: new FormControl('1900-01-01', [Validators.required]),
      final: new FormControl('2050-01-01', [Validators.required])
    })
    
    this.relatorioService.GetAll('1900-01-01', '2050-01-01').subscribe(resultado => {
      this.receitas.data = resultado.receitas;
      this.totalReceitas = resultado.valorTotalReceitas;
      this.despesas.data = resultado.despesas;
      this.totalDespesas = resultado.valorTotalDespesas;
      this.total = resultado.resultado;
    });
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas() : string[]{
    return ['descricao', 'tipo', 'valor']
  }

  FiltrarRelatorio(): void{
    const datas = this.filtroDatas.value;
    let dataInicial = datas.inicial;
    let dataFinal = datas.final;

    if(dataInicial === null){
      dataInicial = '1900-01-01';
    }
    if(dataFinal === null){
      dataFinal = '2050-01-01';
    }
    this.relatorioService.GetAll(dataInicial, dataFinal).subscribe(resultado => {
      this.receitas.data = resultado.receitas;
      this.totalReceitas = resultado.valorTotalReceitas;
      this.despesas.data = resultado.despesas;
      this.totalDespesas = resultado.valorTotalDespesas;
      this.total = resultado.resultado;
    });
    this.displayedColumns = this.ExibirColunas()
  }
}


