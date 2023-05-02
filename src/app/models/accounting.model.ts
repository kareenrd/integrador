export interface Accounting {
  accountid: string;
  classid: string;
  codcore: string;
  codtransaccion: string;
  cuentapuc: string;
  departamentid: string;
  fechaasiento: string;
  fechageneracion: string;
  idaccounting: string;
  identityid: string;
  locationid: string;
  memo: string;
  monto: string;
  naturaleza: string;
  nota: string;
  pkidregister: string;
  psession: string;
  subsidiary: string;
}

export interface searchAccounting {
  id: string;
}

export interface generateAccounting {
  subsidiary: string;
  fechaasiento: string;
  session: string;
  corecode: string;
  nota: string;
}
export type searchFullAccounting = Omit<generateAccounting,'nota'>

export type createAccounting = Omit<Accounting,'pkidregister'>
