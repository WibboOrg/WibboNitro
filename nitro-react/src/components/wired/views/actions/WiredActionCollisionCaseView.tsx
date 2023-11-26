import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionCollsionCaseView: FC<{}> = props =>
{
    const [ stateFlag, setStateFlag ] = useState(-1);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ stateFlag ]);

    useEffect(() =>
    {
        setStateFlag(trigger.getBoolean(0) ? 1 : 0);
    }, [ trigger ]);
    
    return <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT } hasSpecialInput={ false } save={ save }>
        <Column gap={ 1 }>
            <Text bold>{ LocalizeText('wiredfurni.params.action') }</Text>
            <Flex alignItems="center" gap={ 1 }>
                <input className="form-check-input" type="checkbox" id="stateFlag" checked={ stateFlag === 1 } onChange={ event => setStateFlag(event.target.checked ? 1 : 0) } />
                <Text>{ LocalizeText('wiredfurni.params.all.user') }</Text>
            </Flex>
        </Column>
    </WiredActionBaseView>;
}
