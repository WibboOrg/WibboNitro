import { FC, ReactNode } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const capitalize = (str: string) => str && str.charAt(0).toUpperCase() + str.slice(1);

interface TransitionSwitchProps
{
    innerKey: string | number;
    type?: 'back' | 'fade' | 'slide' | 'bounce' | 'lightSpeed' | 'zoom';
    direction?: 'left' | 'right' | 'up' | 'down';
    timeout?: number;
    children?: ReactNode;
}

export const TransitionSwitch: FC<TransitionSwitchProps> = props =>
{
    const { innerKey = null, type = 'fade', direction = '', timeout = 300, children = null } = props;
    
    let reverseDirection = direction;
    if (direction == 'left' || direction == 'right') reverseDirection = direction === 'left' ? 'right' : 'left';
  
    return (
        <SwitchTransition>
            <CSSTransition key={ innerKey } classNames={ {
                enter: `animate__animated animate__${ type }In${ capitalize(direction) }`,
                exit: `animate__animated animate__${ type }Out${ capitalize(reverseDirection) }`,
            } } timeout={ timeout }>
                { children }
            </CSSTransition>
        </SwitchTransition>
    );
}
