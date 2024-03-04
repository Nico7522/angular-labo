import { query, style, animate, group } from '@angular/animations';

export const left = [
  query(':enter, :leave', style({ width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)',  display: "none"  }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

export const right = [
  query(':enter, :leave', style({ width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)',  display: 'none'  }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)',   }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];