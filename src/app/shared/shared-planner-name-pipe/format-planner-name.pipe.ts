import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'formatPlannerName' })
export class FormatPlannerName implements PipeTransform {
    transform(value: {[index: string]: string}): string {
        return value ? `${value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1)}
        ${value.lastName.charAt(0).toUpperCase()}.` : '';
    }
}

