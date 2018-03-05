import {animate, transition, style, state, trigger} from "@angular/core";

const authHeaderAnimation = trigger('authHeaderState', [
  state('visible', style({ top: '0px' })),
  transition('void => visible', animate('800ms')),
  transition('visible => void', animate('800ms'))
]);

export {authHeaderAnimation};
