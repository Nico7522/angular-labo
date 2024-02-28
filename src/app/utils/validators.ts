import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && (control.value.length < 9 || control.value.length > 9)) {
        return { message: 'invalid' };
      }
      return null;
    };
  }