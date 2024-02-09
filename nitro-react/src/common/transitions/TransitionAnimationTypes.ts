export type TransitionAnimationTypeStrings =
  | 'bounce'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'flipX'
  | 'fadeIn'
  | 'fadeDown'
  | 'fadeUp'
  | 'headShake';

export const TransitionAnimationTypes: Record<string, TransitionAnimationTypeStrings> = {
    BOUNCE: 'bounce',
    SLIDE_DOWN: 'slideDown',
    SLIDE_LEFT: 'slideLeft',
    SLIDE_RIGHT: 'slideRight',
    FLIP_X: 'flipX',
    FADE_IN: 'fadeIn',
    FADE_DOWN: 'fadeDown',
    FADE_UP: 'fadeUp',
    HEAD_SHAKE: 'headShake',
};
