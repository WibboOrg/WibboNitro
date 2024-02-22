import { NotifAlertEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BbCode, GetConfiguration, OpenUrl, PlaySound, TryVisitRoom } from '../../api';
import { Button } from '../../common';
import { useDisableGameAlert, useMessageEvent } from '../../hooks';

interface IAlert
{
    image: string,
    title: string,
    msgTxt: string,
    btnTxt: string,
    roomId: number,
    link: string,
}

export const NotificationAlertView: FC<{}> = props =>
{
    const [ alert, setAlert ] = useState<IAlert>(null);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ disableGameAlert ] = useDisableGameAlert();
    
    useMessageEvent<NotifAlertEvent>(NotifAlertEvent, event =>
    {
        const parser = event.getParser();

        const alert: IAlert = {
            image: parser.image,
            title: parser.title,
            msgTxt: BbCode(parser.msgTxt),
            btnTxt: parser.btnTxt,
            roomId: parser.roomId,
            link: parser.link
        };

        console.log(alert.roomId, disableGameAlert)

        if (alert.roomId && disableGameAlert) return;

        if(alert.roomId) PlaySound('animation_warn');

        setAlert(alert);
        setIsOpen(true);
    });
    
    const close = useCallback(() => setIsOpen(false), [ setIsOpen ]);
    
    const joinRoom = useCallback(() =>
    {
        if (!alert) return;
        
        if (alert.link.trim() !== '') OpenUrl(alert.link)
        else if (alert.roomId) TryVisitRoom(alert.roomId);
        
        setIsOpen(false);
    }, [ setIsOpen, alert ]);
    
    useEffect(() =>
    {
        if (!isOpen || alert.link.trim() !== '') return;
        
        const timeout = window.setTimeout(() =>
        {
            setIsOpen(false);
        }, 60 * 1000);

        return () => clearTimeout(timeout);
    }, [ isOpen, alert ]);
    
    const imageUrl = useMemo(() => GetConfiguration<string>('image.library.notifications.url', '').replace('%image%', alert?.image.replace(/\./g, '_')), [ alert ]);

    if (!isOpen || !alert) return null;
    
    return (
        <div className="notif-alert">
            <div className="notif-alert__head text-black">
                <div className="notif-alert__close" onClick={ close }><FaTimes className="fa-icon w-12 h-12" /></div>
                { alert.title }
            </div>
            { imageUrl && <img src={ imageUrl } className="notif-alert__img" /> }
            <div className="notif-alert__body">
                <div className="notif-alert__msg" dangerouslySetInnerHTML={ { __html: alert.msgTxt } }></div>
                <Button gap={ 1 } onClick={ () => joinRoom() } className="position-relative">
                    { alert.btnTxt }
                </Button>
            </div>
        </div>
    );
}
