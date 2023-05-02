export interface Dynamic {
  class: string;
  codcore: string;
  codtransaccion: string;
  cuentapuc: string;
  departament: string;
  entity: string;
  idaccount: string;
  location: string;
  memo: string;
  naturaleza: string;
  orden: string;
  pkidregister: string;
  subsidiary: string;
  vigenciadesde: string;
  vigenciahasta: string;


}

export interface createDynamic extends Omit<Dynamic,'pkidregister'>  { }
