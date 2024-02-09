import { FC, ReactNode, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { getTransitionAnimationStyle } from './TransitionAnimationStyles';
import { TransitionAnimationTypeStrings } from './TransitionAnimationTypes';

interface TransitionAnimationProps
{
    type: TransitionAnimationTypeStrings;
    inProp: boolean;
    innerKey?: string | number;
    timeout?: number;
    className?: string;
    children?: ReactNode;
}

export const TransitionAnimation: FC<TransitionAnimationProps> = props =>
{
    const { innerKey = null, type = null, inProp = false, timeout = 300, className = null, children = null } = props;

    const [ isChildrenVisible, setChildrenVisible ] = useState(false);

    useEffect(() =>
    {
        let timeoutData: number = null;

        if(inProp)
        {
            setChildrenVisible(true);
        }
        else
        {
            timeoutData = window.setTimeout(() =>
            {
                setChildrenVisible(false);
                clearTimeout(timeout);
            }, timeout);
        }

        return () =>
        {
            if(timeoutData) clearTimeout(timeoutData);
        }
    }, [ inProp, timeout ]);

    return (
        <Transition in={ inProp } timeout={ timeout } key={ innerKey }>
            { state => (
                <div className={ (className ?? '') + ' animate__animated' } style={ { ...getTransitionAnimationStyle(type, state, timeout) } }>
                    { isChildrenVisible && children }
                </div>
            ) }
        </Transition>
    );
}
