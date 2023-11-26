import { ModMessageMessageComposer } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { ISelectedUser, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useModTools, useNotification } from '../../../../hooks';

interface ModToolsUserSendMessageViewProps
{
    user: ISelectedUser;
    onCloseClick: () => void;
}

export const ModToolsUserSendMessageView: FC<ModToolsUserSendMessageViewProps> = props =>
{
    const { user = null, onCloseClick = null } = props;
    const [ message, setMessage ] = useState('');
    const { simpleAlert = null } = useNotification();
    const { settings = null } = useModTools();

    if(!user) return null;

    const sendMessage = () =>
    {
        if(message.trim().length === 0)
        {
            simpleAlert('Please write a message to user.', null, null, null, 'Error', null);
            
            return;
        }

        SendMessageComposer(new ModMessageMessageComposer(user.userId, message, -999));

        onCloseClick();
    }

    const messageTemplates = settings.messageTemplates;
    const messageTemplatesSub = messageTemplates.map((value) => value.length > 75 ? value.substring(0, 75) + '...' : value);
    
    const updateMessage = (value: string) =>
    {
        setMessage(value);
    };

    return (
        <NitroCardView className="nitro-mod-tools-user-message" theme="primary-slim" windowPosition={ DraggableWindowPosition.TOP_LEFT }>
            <NitroCardHeaderView headerText={ 'Envoyer un message' } onCloseClick={ () => onCloseClick() } />
            <NitroCardContentView className="text-black">
                <select className="form-select form-select-sm" onChange={ event => updateMessage(event.target.value) }>
                    <option key={ -1 } value="" disabled>Choisir une sanction</option>
                    { messageTemplatesSub.map((message, index) => <option key={ index } value={ messageTemplates[index] } style={ { width: '240px' } }>{ message }</option>) }
                </select>
                <Text>Message pour: { user.username }</Text>
                <textarea className="form-control" value={ message } onChange={ event => setMessage(event.target.value) }></textarea>
                <Button fullWidth onClick={ sendMessage }>Envoyer</Button>
            </NitroCardContentView>
        </NitroCardView>
    );
}
