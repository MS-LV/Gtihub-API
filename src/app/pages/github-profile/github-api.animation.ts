import { animate, state, style, transition, trigger } from "@angular/animations";

export const menuAnim = trigger('menuAnim', [
  state('true', style({
    height: '*'
  })),
  state('false', style({
    height: '0px',
  })),
  // transition('* <=> *', animate(500)),
  transition('true => false', [
    style({ height: '*' }),
    animate(300, style({height: '0'}))
  ]),
  transition('false => true', [
    style({height:'0'}),
    animate(300, style({height:'*'}))
  ]),
])
