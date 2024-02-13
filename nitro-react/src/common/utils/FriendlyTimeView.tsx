import { FriendlyTime } from '@nitrots/nitro-renderer';
import { FC, useEffect, useMemo, useState } from 'react';
import { Base, BaseProps } from '..';

interface FriendlyTimeViewProps extends BaseProps<HTMLDivElement>
{
    seconds: number;
    isShort?: boolean;
}

export const FriendlyTimeView: FC<FriendlyTimeViewProps> = props =>
{
    const { seconds = 0, isShort = false, children = null, ...rest } = props;
    const [ updateId, setUpdateId ] = useState(-1);

    const getStartSeconds = useMemo(() => (Math.round(new Date().getTime() / 1000) - seconds), [ seconds ]);

    useEffect(() =>
    {
        const interval = window.setInterval(() => setUpdateId(prevValue => (prevValue + 1)), 10000);

        return () => clearInterval(interval);
    }, []);

    const value = (Math.round(new Date().getTime() / 1000) - getStartSeconds);

    return <Base { ...rest }>{ isShort ? FriendlyTime.shortFormat(value) : FriendlyTime.format(value) }</Base>;
}
