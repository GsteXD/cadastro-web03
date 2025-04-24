import { AbstractControl, ValidationErrors } from '@angular/forms';

export function rgValidator(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Checa a largura do RG
  if (valor.length < 7 || valor.length > 9) {
    return { rgInvalido: true };
  }

  // Verifica números repetidos
  if (/^(\d)\1+$/.test(valor)) {
    return { rgInvalido: true };
  }

  // Aceita algo como: 12345678 ou 12345678X
  if (!/^\d{7,8}[0-9A-Z]?$/.test(valor)) {
    return { rgInvalido: true };
  }

  return null;
}
