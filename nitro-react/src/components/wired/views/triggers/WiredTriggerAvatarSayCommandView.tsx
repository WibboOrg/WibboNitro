import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerAvatarSayCommandView: FC<{}> = props =>
{
    const [ commandName, setCommandName ] = useState('');
    const [ commandValue, setCommandValue ] = useState('1');
    const { trigger = null, setStringParam = null } = useWired();

    const save = () => setStringParam(commandName.replace(':', '') + ':' + commandValue.replace(':', ''));

    useEffect(() =>
    {
        if (trigger.stringData.includes(':'))
        {
            const parts = trigger.stringData.split(':');

            if (parts.length === 2)
            {
                setCommandName(parts[0]);
                setCommandValue(parseInt(parts[1]).toString() || '1');
            }
        }
    }, [ trigger ]);
    
    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Commande</Text>
                <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ commandName } onChange={ event => setCommandName(event.target.value) } />
            </Column>
            <Column gap={ 1 }>
                <Text bold>Distance</Text>
                <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ commandValue } onChange={ event => setCommandValue(event.target.value) } />
            </Column>
        </WiredTriggerBaseView>
    );
}
