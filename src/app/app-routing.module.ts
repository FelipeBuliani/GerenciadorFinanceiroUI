import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarDespesaComponent } from './components/despesas/adicionar-despesa/adicionar-despesa.component';
import { EditarDespesaComponent } from './components/despesas/editar-despesa/editar-despesa.component';
import { ListagemDespesasComponent } from './components/despesas/listagem-despesas/listagem-despesas.component';
import { AdicionarReceitaComponent } from './components/receitas/adicionar-receita/adicionar-receita.component';
import { EditarReceitaComponent } from './components/receitas/editar-receita/editar-receita.component';
import { ListagemReceitasComponent } from './components/receitas/listagem-receitas/listagem-receitas.component';
import { RelatorioComponent } from './components/relatorios/relatorio/relatorio.component';

const routes: Routes = [
  {
    path: 'receitas/listagemreceitas', component: ListagemReceitasComponent
  },
  {
    path: 'receitas/adicionarreceita', component: AdicionarReceitaComponent
  },
  {
    path: 'receitas/editarreceita/:id', component: EditarReceitaComponent
  },
  {
    path: 'despesas/listagemdespesas', component: ListagemDespesasComponent
  },
  {
    path: 'despesas/adicionardespesa', component: AdicionarDespesaComponent
  },
  {
    path: 'despesas/editardespesa/:id', component: EditarDespesaComponent
  },
  {
    path: 'relatorios', component: RelatorioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
