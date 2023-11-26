import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerAvatarClickView: FC<{}> = props =>
{
    const [ distance, setDistance ] = useState('1');
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ parseInt(distance) || 1 ]);

    useEffect(() =>
    {
        setDistance((trigger.intData.length > 0) ? trigger.intData[0].toString() : '1');
    }, [ trigger ]);
    
    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Distance</Text>
                <input type="text" className="form-control form-control-sm" maxLength={ 32 } value={ distance } onChange={ event => setDistance(event.target.value) } />
            </Column>
        </WiredTriggerBaseView>
    );
}
