import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionTridimensionView: FC<{}> = props =>
{
    const [ messageX, setMessageX ] = useState('0');
    const [ messageY, setMessageY ] = useState('0');
    const [ messageZ, setMessageZ ] = useState('0');
    const [ messageRot, setMessageRot ] = useState('0');
    const [ messageState, setMessageState ] = useState('0');
    const { trigger = null, setStringParam = null } = useWired();

    const save = () => setStringParam([ messageX, messageY, messageZ, messageRot, messageState ].join(';'));

    useEffect(() =>
    {
        if (trigger.stringData.includes(';'))
        {
            const parts = trigger.stringData.split(';');

            if (parts.length >= 3)
            {
                setMessageX((parseInt(parts[0]) || '0').toString());
                setMessageY((parseInt(parts[1]) || '0').toString());
                setMessageZ((parseFloat(parts[2]) || '0').toString());
            }
            
            if (parts.length === 5)
            {
                setMessageRot((parseFloat(parts[3]) || '0').toString());
                setMessageState((parseFloat(parts[4]) || '0').toString());
            }
        }
    }, [ trigger ]);

    return (
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT } hasSpecialInput={ true } save={ save }>
            <Flex gap={ 2 }>
                <Column gap={ 1 }>
                    <Text bold>X</Text>
                    <input type="text" className="form-control form-control-sm" value={ messageX } onChange={ event => setMessageX(event.target.value) } />
                </Column>
                <Column gap={ 1 }>
                    <Text bold>Y</Text>
                    <input type="text" className="form-control form-control-sm" value={ messageY } onChange={ event => setMessageY(event.target.value) } />
                </Column>
                <Column gap={ 1 }>
                    <Text bold>Z</Text>
                    <input type="text" className="form-control form-control-sm" value={ messageZ } onChange={ event => setMessageZ(event.target.value) } />
                </Column>
            </Flex>
            <Column gap={ 1 }>
                <Text bold>Rotation</Text>
                <input type="text" className="form-control form-control-sm" value={ messageRot } onChange={ event => setMessageRot(event.target.value) } />
            </Column>
            <Column gap={ 1 }>
                <Text bold>Etat</Text>
                <input type="text" className="form-control form-control-sm" value={ messageState } onChange={ event => setMessageState(event.target.value) } />
            </Column>
        </WiredActionBaseView>
    );
}
