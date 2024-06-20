import { FC, useEffect, useState } from 'react';
import { GetConfiguration, WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionSuperWiredView: FC<{}> = props =>
{
    const [ messageAction, setMessageAction ] = useState('');
    const [ messageValue, setMessageValue ] = useState('');
    const { trigger = null, setStringParam = null } = useWired();

    const save = () => setStringParam([ messageAction, messageValue ].join(':'));
    
    useEffect(() =>
    {
        if (trigger.stringData.includes(':'))
        {
            const parts = trigger.stringData.split(':');

            setMessageAction(parts[0]);
            setMessageValue(parts[1]);

            return
        }

        setMessageAction(trigger.stringData);
    }, [ trigger ]);

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Action</Text>
                <input type="text" className="form-control form-control-sm" value={ messageAction } onChange={ event => setMessageAction(event.target.value) } maxLength={ GetConfiguration<number>('wired.action.chat.max.length', 100) } />
            </Column>
            <Column gap={ 1 }>
                <Text bold>Valeur</Text>
                <input type="text" className="form-control form-control-sm" value={ messageValue } onChange={ event => setMessageValue(event.target.value) } maxLength={ GetConfiguration<number>('wired.action.chat.max.length', 100) } />
            </Column>
        </WiredActionBaseView>
    );
}
