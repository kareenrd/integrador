export interface Core {
  codcore: string;
  nombre: string;
  pkidregister: string;
  vigenciadesde: string;
  vigenciahasta: string;

}

export interface createCore extends Omit<Core,'pkidregister'>  { }
