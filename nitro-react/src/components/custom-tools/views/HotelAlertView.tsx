import { SendAlertComposer } from '@nitrots/nitro-renderer';
import { FC, useCallback, useState } from 'react';
import { SendMessageComposer } from '../../../api';
import { Base, Button, Column, DraggableWindowPosition, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';

interface HotelAlertViewProps
{
    onCloseClick: () => void;
}

export const HotelAlertView: FC<HotelAlertViewProps> = props =>
{
    const { onCloseClick = null } = props;
    const [ message, setMessage ] = useState<string>('');
    const [ url, setUrl ] = useState<string>('');
    const [ isAnimation, setIsAnimation ] = useState<boolean>(true);

    const sendMessage = useCallback(() => 
    {
        if (message.trim() === '') return;

        SendMessageComposer(new SendAlertComposer(isAnimation, message, url, false));

        setMessage('');
        setUrl('');
    }, [ message, url, isAnimation ]);
    
    const preview = useCallback(() => 
    {
        if (message.trim() === '') return;

        SendMessageComposer(new SendAlertComposer(isAnimation, message, url, true));
    }, [ message, isAnimation, url ]);

    return (
        <NitroCardView className="nitro-custom-tools-hotelalert" theme="primary-slim" windowPosition={ DraggableWindowPosition.TOP_LEFT }>
            <NitroCardHeaderView headerText={ 'Hôtel alert' } onCloseClick={ onCloseClick } />
            <NitroCardContentView className="text-black h-100">
                <Column gap={ 1 }>
                    <Text small>Envoie une alerte</Text>
                    <textarea className="form-control" placeholder="Entre ton alerte ici..." maxLength={ 2000 } value={ message }
                        onChange={ event => setMessage(event.target.value) } style={ { 'resize': 'vertical' } } />
                </Column>
                <Column gap={ 1 }>
                    <Text small>Entre un lien ici</Text>
                    <input placeholder="Entre un lien ici" className="form-control" value={ url } onChange={ event => setUrl(event.target.value) } />
                </Column>
                <Base className="form-check">
                    <input className="form-check-input" type="checkbox" name="isAnimation" checked={ isAnimation } onChange={ (e) => setIsAnimation(value => !value) } />
                    <label className="form-check-label">Alerte animation</label>
                </Base>
                <Flex justifyContent="between" gap={ 1 }>
                    <Button variant="success" onClick={ preview }>Pré-visualisation</Button>
                    <Button variant="primary" onClick={ sendMessage }>Envoyer</Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView>
    );
}
