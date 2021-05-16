import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DespesasService } from './services/despesas.service';
import { ReceitasService } from './services/receitas.service';
import { ListagemReceitasComponent, DialogExclusaoReceitaComponent } from './components/receitas/listagem-receitas/listagem-receitas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule} from '@angular/material/card';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { AdicionarReceitaComponent } from './components/receitas/adicionar-receita/adicionar-receita.component';
import { EditarReceitaComponent } from './components/receitas/editar-receita/editar-receita.component';
import { ListagemDespesasComponent, DialogExclusaoDespesaComponent } from './components/despesas/listagem-despesas/listagem-despesas.component';
import { AdicionarDespesaComponent } from './components/despesas/adicionar-despesa/adicionar-despesa.component';
import { EditarDespesaComponent } from './components/despesas/editar-despesa/editar-despesa.component';
import { RelatorioComponent } from './components/relatorios/relatorio/relatorio.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagemReceitasComponent,
    AdicionarReceitaComponent,
    EditarReceitaComponent,
    ListagemDespesasComponent,
    AdicionarDespesaComponent,
    EditarDespesaComponent,
    DialogExclusaoReceitaComponent,
    DialogExclusaoDespesaComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
  ],
  providers: [DespesasService, ReceitasService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
