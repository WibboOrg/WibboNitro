import { AddChatlogsEvent, ILinkEventTracker } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, GetSessionDataManager, RemoveLinkEventTracker } from '../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useMessageEvent } from '../../hooks';
import { IChatLog } from './common/IChatLog';
import { AdminView } from './views/AdminView';
import { ChatCheckingView } from './views/ChatCheckingView';
import { HotelAlertView } from './views/HotelAlertView';

export const CustomToolsView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isOpenHotelAlert, setIsOpenHotelAlert ] = useState<boolean>(false);
    const [ isOpenChatChecking, setIsOpenChatChecking ] = useState<boolean>(false);
    const [ isOpenAdmin, setIsOpenAdmin ] = useState<boolean>(false);

    const [ chatLogs, setChatLogs ] = useState<IChatLog[]>([]);
    
    useMessageEvent<AddChatlogsEvent>(AddChatlogsEvent, event =>
    {
        const parser = event.getParser();

        if (chatLogs.length > 20) setChatLogs(prevValue => prevValue.slice(1, prevValue.length));
        
        const hoursAndMinutes = new Date().getHours() + ':' + new Date().getMinutes();
        const chatLog: IChatLog = { userId: parser.userId, userName: parser.userName, userMsg: parser.userMsg, time: hoursAndMinutes };

        setChatLogs((prevValue) => [ ...prevValue, chatLog ]);
    });

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');
        
                if(parts.length < 2) return;
        
                switch(parts[1])
                {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'custom-tools/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [ ]);

    const isMod = GetSessionDataManager().isModerator;

    if(!isMod) return null;

    return (
        <>
            { isVisible && <NitroCardView uniqueKey="custom-tools" className="nitro-custom-tools" windowPosition={ DraggableWindowPosition.TOP_LEFT } theme="primary-slim" >
                <NitroCardHeaderView headerText={ 'Outil Staff' } onCloseClick={ event => setIsVisible(false) } />
                <NitroCardContentView className="text-black" gap={ 1 }>
                    <Button gap={ 1 } onClick={ () => setIsOpenHotelAlert(prevValue => !prevValue) }>
                        Hôtel alerte
                    </Button>
                    <Button gap={ 1 } onClick={ () => setIsOpenChatChecking(prevValue => !prevValue) }>
                        Chat logs
                    </Button>
                    <Button gap={ 1 } onClick={ () => setIsOpenAdmin(prevValue => !prevValue) }>
                        Administration
                    </Button>
                </NitroCardContentView>
            </NitroCardView> }
            { isOpenHotelAlert && <HotelAlertView onCloseClick={ () => setIsOpenHotelAlert(false) } /> }
            { isOpenChatChecking && <ChatCheckingView onCloseClick={ () => setIsOpenChatChecking(false) } chatLogs={ chatLogs } /> }
            { isOpenAdmin && <AdminView onCloseClick={ () => setIsOpenAdmin(false) } /> }
        </>
    );
}
