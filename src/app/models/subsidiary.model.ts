export interface Subsidiary {
  codsubsidiary: string;
  nombre: string;
  pkidregister: string;
  vigenciadesde: string;
  vigenciahasta: string;

}

export interface createSubsidiary extends Omit<Subsidiary,'pkidregister'>  { }
