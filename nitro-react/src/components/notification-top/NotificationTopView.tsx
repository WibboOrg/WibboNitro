import { NotifTopEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useMessageEvent } from '../../hooks';

export const NotificationTopView: FC<{}> = props =>
{
    const [ msgTxt, setMsgTxt ] = useState<string>('');
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    
    useMessageEvent<NotifTopEvent>(NotifTopEvent, event =>
    {
        const parser = event.getParser();

        setMsgTxt(parser.msgTxt);
        setIsOpen(true);
    });

    const close = useCallback(() => 
    {
        setIsOpen(false);
    }, []);

    useEffect(() =>
    {
        if (!isOpen) return;
        
        const timeout = window.setTimeout(() =>
        {
            setIsOpen(false);
        }, 60 * 1000);

        return () => clearTimeout(timeout);
    }, [ isOpen, msgTxt ]);

    if(!isOpen) return null;

    return (
        <div className="notif-top">
            <div className="notif-top__logo"></div>
            <div className="notif-top__msg">{ msgTxt }</div>
            <FaTimes className="fa-icon w-12 h-12 cursor-pointer notif-top__close" onClick={ close }/>
        </div>
    );
}
