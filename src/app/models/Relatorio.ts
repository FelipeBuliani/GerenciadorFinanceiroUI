import { Despesas } from "./Despesas";
import { Receitas } from "./Receitas";

export class Relatorio{
    receitas: Receitas[];
    despesas: Despesas[];
    valorTotalReceitas: number;
    valorTotalDespesas: number;
    resultado: number;
}