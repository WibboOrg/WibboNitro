import { FC, useEffect, useState } from 'react';
import { WiredFurniType } from '../../../../api';
import { Column, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionGivePointsHighScore: FC<{}> = props =>
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
        <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_BY_ID } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>Choisir une option</Text>
                <select className="form-select form-select-sm" value={ operatorId } onChange={ event => setOperatorId(parseInt(event.target.value)) }>
                    <option value={ 0 }>Addition</option>
                    <option value={ 1 }>Soustraction </option>
                    <option value={ 2 }>Multiplication</option>
                    <option value={ 3 }>Division</option>
                    <option value={ 4 }>Modulo</option>
                    <option value={ 5 }>Remplacer</option>
                    <option value={ 6 }>Supprimer</option>
                </select>
            </Column>
            <Column gap={ 1 }>
                <Text bold>Valeur</Text>
                <input type="text" className="form-control form-control-sm" value={ compareValue } onChange={ event => setCompareValue(event.target.value) } />
            </Column>
        </WiredActionBaseView>
    );
}
