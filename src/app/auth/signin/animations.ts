import {animate, state, style, transition, trigger} from "@angular/core";

const signinCardAnimation = trigger('signinCardState', [
  state('visible', style({ marginTop: '124px', opacity: 1 })),
  transition('void => visible', animate('800ms')),
  transition('visible => void', animate('800ms'))
]);

const toastAnimation = trigger('toastState', [
  state('hidden', style({ marginTop: '50px', opacity: 0 })),
  state('visible', style({ marginTop: '0px', opacity: 1 })),
  transition('hidden => visible', animate('300ms')),
  transition('visible => hidden', animate('300ms'))
]);

export {signinCardAnimation, toastAnimation};
