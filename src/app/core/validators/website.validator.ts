import { AbstractControl } from '@angular/forms';

export function websiteValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
        if (control.value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
            return null;
        }
        return { invalidWebsite: true };
    }
    return null;
}

export function instaValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
      if (control.value.match(/[@][a-zA-Z0-9]/g)) {
          return null;
      }
      return { invalidInsta: true };
  }
  return null;
}
