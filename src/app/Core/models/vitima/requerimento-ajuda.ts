export interface SolicitacaoAjuda {
  status : 'pendente' | 'deferido' | 'indeferido' ;
  pessoasQtde : number;
  abrigo: boolean;
  alimento: boolean;
  itemHigiene: boolean;
  dinheiro: boolean;
  outros: string;
}