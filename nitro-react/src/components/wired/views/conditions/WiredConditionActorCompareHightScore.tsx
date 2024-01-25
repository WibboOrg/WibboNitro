import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredConditionBaseView } from './WiredConditionBaseView';

export const WiredConditionActorCompareHightScore: FC<{}> = props =>
{
    const [ operatorId, setOperatorId ] = useState(-1);
    const [ compareValue, setCompareValue ] = useState('');
    const { trigger = null, setIntParams = null, setStringParam = null } = useWired();

    const save = () =>
    {
        setStringParam(compareValue);
        setIntParams([ operatorId ]);
    }

    useEffect(() =>
    {
        setCompareValue(trigger.stringData);
        setOperatorId((trigger.intData.length > 0) ? trigger.intData[0] : 0);
    }, [ trigger ]);

    return (
        <WiredConditionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Choisir une option</Text>
                <select className="form-select form-select-sm" value={ operatorId } onChange={ event => setOperatorId(parseInt(event.target.value)) }>
                    <option value={ 0 }>Égal</option>
                    <option value={ 1 }>Différent</option>
                    <option value={ 2 }>Inférieur ou égal</option>
                    <option value={ 3 }>Inférieur</option>
                    <option value={ 4 }>Supérieur ou égal</option>
                    <option value={ 5 }>Supérieur</option>
                    <option value={ 6 }>Modulo</option>
                    <option value={ 7 }>Dans le classement</option>
                    <option value={ 8 }>Pas dans le classement</option>
                </select>
            </Column>
            <Column gap={ 1 }>
                <Text bold>Valeur</Text>
                <input type="text" className="form-control form-control-sm" value={ compareValue } onChange={ event => setCompareValue(event.target.value) } />
            </Column>
        </WiredConditionBaseView>
    );
}
