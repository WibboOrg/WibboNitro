import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionFurniMatchesSnapshotView: FC<{}> = props =>
{
    const [ stateFlag, setStateFlag ] = useState(0);
    const [ directionFlag, setDirectionFlag ] = useState(0);
    const [ positionFlag, setPositionFlag ] = useState(0);
    const [ heightFlag, setHeightFlag ] = useState(0);
    const [ requireAll, setRequireAll ] = useState(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ stateFlag, directionFlag, positionFlag, heightFlag, requireAll ]);

    useEffect(() =>
    {
        setStateFlag(trigger.getBoolean(0) ? 1 : 0);
        setDirectionFlag(trigger.getBoolean(1) ? 1 : 0);
        setPositionFlag(trigger.getBoolean(2) ? 1 : 0);
        setHeightFlag(trigger.getBoolean(3) ? 1 : 0);
        setRequireAll(trigger.getBoolean(4) ? 1 : 0);
    }, [ trigger ]);
    
    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.conditions') }</Text>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="checkbox" id="stateFlag" checked={ !!stateFlag } onChange={ event => setStateFlag(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.condition.state') }</Text>
                </Flex>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="checkbox" id="directionFlag" checked={ !!directionFlag } onChange={ event => setDirectionFlag(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.condition.direction') }</Text>
                </Flex>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="checkbox" id="positionFlag" checked={ !!positionFlag } onChange={ event => setPositionFlag(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.condition.position') }</Text>
                </Flex>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="checkbox" id="heightFlag" checked={ !!heightFlag } onChange={ event => setHeightFlag(event.target.checked ? 1 : 0) } />
                    <Text>{ LocalizeText('wiredfurni.params.condition.height') }</Text>
                </Flex>
            </Column>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.requireall.furni.match') }</Text>
                { [ 0, 1 ].map(value =>
                {
                    return (
                        <Flex alignItems="center" gap={ 1 } key={ value }>
                            <input className="form-check-input" type="radio" name="requireAll" id={ `requireAll${ value }` } checked={ (requireAll === value) } onChange={ event => setRequireAll(value) } />
                            <Text>{ LocalizeText('wiredfurni.params.requireall.furni.match.' + value) }</Text>
                        </Flex>
                    )
                }) }
            </Column>
        </WiredConditionBaseView>
    );
}
