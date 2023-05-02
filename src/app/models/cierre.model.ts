export interface Cierre {
  nro: string;
  codcore: string;
  transactionh: string;
  fecha: string;
  nombrearchivo: string;
  psession: string;
  amount: string;
  totalamount: string;
  pkidregister: string;
}

export interface session {
  session: string;
}

export interface date {
  date: string;
}

//export interface createCierre extends Omit<Cierre,'pkidregister'>  { }
export type createCierre = Omit<Cierre,'pkidregister'>

