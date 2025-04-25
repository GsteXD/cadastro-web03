import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function senhaValidator(control: AbstractControl): ValidationErrors | null {
  const valor = control.value || '';

  const temMaiuscula = /[A-Z]/.test(valor);
  const temNumero = /\d/.test(valor);

  const erros: any = {};

  if (!temMaiuscula) {
    erros.semMaiuscula = true;
  }

  if (!temNumero) {
    erros.semNumero = true;
  }

  return Object.keys(erros).length ? erros : null;
}

export function senhaMatchValidator(form: FormGroup): ValidationErrors | null {
    const senha = form.get('senha')?.value;
    const senhaConfirm = form.get('senhaConfirm')?.value;
  
    if (senha !== senhaConfirm || senhaConfirm === '') {
      form.get('senhaConfirm')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      form.get('senhaConfirm')?.setErrors(null); // limpa o erro se antes havia mismatch
      return null;
    }
  }