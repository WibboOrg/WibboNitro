import { CallForHelpTopicData, DefaultSanctionMessageComposer, ModAlertMessageComposer, ModBanMessageComposer, ModKickMessageComposer, ModMessageMessageComposer, ModMuteMessageComposer, ModTradingLockMessageComposer } from '@nitrots/nitro-renderer';
import { FC, useMemo, useState } from 'react';
import { ISelectedUser, LocalizeText, ModActionDefinition, NotificationAlertType, SendMessageComposer } from '../../../../api';
import { Button, Column, DraggableWindowPosition, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useModTools, useNotification } from '../../../../hooks';

interface ModToolsUserModActionViewProps
{
    user: ISelectedUser;
    onCloseClick: () => void;
}

const MOD_ACTION_DEFINITIONS = [
    new ModActionDefinition(1, 'Alerter', ModActionDefinition.ALERT, 1, 0),
    new ModActionDefinition(2, 'Mute 1h', ModActionDefinition.MUTE, 2, 0),
    new ModActionDefinition(3, 'Ban 18h', ModActionDefinition.BAN, 3, 0),
    new ModActionDefinition(4, 'Ban 7 jours', ModActionDefinition.BAN, 4, 0),
    new ModActionDefinition(5, 'Ban 30 jours (étape 1)', ModActionDefinition.BAN, 5, 0),
    new ModActionDefinition(7, 'Ban 30 jours (étape 2)', ModActionDefinition.BAN, 7, 0),
    new ModActionDefinition(6, 'Ban 100 ans', ModActionDefinition.BAN, 6, 0),
    new ModActionDefinition(106, 'Superbannissement', ModActionDefinition.BAN, 6, 0),
    new ModActionDefinition(101, 'Kick', ModActionDefinition.KICK, 0, 0),
    new ModActionDefinition(102, 'TradeBan 1 semaine', ModActionDefinition.TRADE_LOCK, 0, 168),
    new ModActionDefinition(104, 'TradeBan définitif', ModActionDefinition.TRADE_LOCK, 0, 876000),
    new ModActionDefinition(105, 'Message', ModActionDefinition.MESSAGE, 0, 0),
];

export const ModToolsUserModActionView: FC<ModToolsUserModActionViewProps> = props =>
{
    const { user = null, onCloseClick = null } = props;
    const [ selectedTopic, setSelectedTopic ] = useState(-1);
    const [ selectedAction, setSelectedAction ] = useState(-1);
    const [ message, setMessage ] = useState<string>('');
    const { cfhCategories = null, settings = null } = useModTools();
    const { simpleAlert = null } = useNotification();

    const topics = useMemo(() =>
    {
        const values: CallForHelpTopicData[] = [];

        if(cfhCategories && cfhCategories.length)
        {
            for(const category of cfhCategories)
            {
                for(const topic of category.topics) values.push(topic);
            }
        }

        return values;
    }, [ cfhCategories ]);

    const sendAlert = (message: string) => simpleAlert(message, NotificationAlertType.DEFAULT, null, null, 'Error');

    const sendDefaultSanction = () =>
    {
        let errorMessage: string = null;

        const category = topics[selectedTopic];

        if(selectedTopic === -1) errorMessage = 'Vous devez séléctionner un sujet';

        if(errorMessage) return sendAlert(errorMessage);

        const messageOrDefault = (message.trim().length === 0) ? LocalizeText(`help.cfh.topic.${ category.id }`) : message;

        SendMessageComposer(new DefaultSanctionMessageComposer(user.userId, selectedTopic, messageOrDefault));
        
        onCloseClick();
    }

    const sendSanction = () =>
    {
        let errorMessage: string = null;

        const category = topics[selectedTopic];
        const sanction = MOD_ACTION_DEFINITIONS[selectedAction];

        if((selectedTopic === -1) || (selectedAction === -1)) errorMessage = 'Vous devez séléctionner un sujet et une sanction.';
        else if(!settings || !settings.cfhPermission) errorMessage = 'Vous n\'avez pas les permissions requises pour accédez à ce sujet.';
        else if(!category) errorMessage = 'Vous devez séléctionner un sujet';
        else if(!sanction) errorMessage = 'Vous devez séléctionner une sanction';

        if(errorMessage)
        {
            sendAlert(errorMessage);
            
            return;
        }

        const messageOrDefault = (message.trim().length === 0) ? LocalizeText(`help.cfh.topic.${ category.id }`) : message;

        switch(sanction.actionType)
        {
            case ModActionDefinition.ALERT: {
                if(!settings.alertPermission)
                {
                    sendAlert('Vos permissions sont insufisantes');

                    return;
                }

                SendMessageComposer(new ModAlertMessageComposer(user.userId, messageOrDefault, category.id));
                break;
            }
            case ModActionDefinition.MUTE: 
                SendMessageComposer(new ModMuteMessageComposer(user.userId, messageOrDefault, category.id));
                break;
            case ModActionDefinition.BAN: {
                if(!settings.banPermission)
                {
                    sendAlert('Vos permissions sont insufisantes');

                    return;
                }

                SendMessageComposer(new ModBanMessageComposer(user.userId, messageOrDefault, category.id, selectedAction, (sanction.actionId === 106)));
                break;
            }
            case ModActionDefinition.KICK: {
                if(!settings.kickPermission)
                {
                    sendAlert('Vos permissions sont insufisantes');
                    return;
                }

                SendMessageComposer(new ModKickMessageComposer(user.userId, messageOrDefault, category.id));
                break;
            }
            case ModActionDefinition.TRADE_LOCK: {
                const numSeconds = (sanction.actionLengthHours * 60);

                SendMessageComposer(new ModTradingLockMessageComposer(user.userId, messageOrDefault, numSeconds, category.id));
                break;
            }
            case ModActionDefinition.MESSAGE: {
                if(message.trim().length === 0)
                {
                    sendAlert('Mettez un message concernant la sanction');

                    return;
                }

                SendMessageComposer(new ModMessageMessageComposer(user.userId, message, category.id));
                break;
            }
        }

        onCloseClick();
    }

    if(!user) return null;

    return (
        <NitroCardView className="nitro-mod-tools-user-action" theme="primary-slim" windowPosition={ DraggableWindowPosition.TOP_LEFT }>
            <NitroCardHeaderView headerText={ 'Mod Action: ' + (user ? user.username : '') } onCloseClick={ () => onCloseClick() } />
            <NitroCardContentView className="text-black">
                <select className="form-select form-select-sm" value={ selectedTopic } onChange={ event => setSelectedTopic(parseInt(event.target.value)) }>
                    <option value={ -1 } disabled>Sujet</option>
                    { topics.map((topic, index) => <option key={ index } value={ index }>{ LocalizeText('help.cfh.topic.' + topic.id) }</option>) }
                </select>
                <select className="form-select form-select-sm" value={ selectedAction } onChange={ event => setSelectedAction(parseInt(event.target.value)) }>
                    <option value={ -1 } disabled>Sanction</option>
                    { MOD_ACTION_DEFINITIONS.map((action, index) => <option key={ index } value={ index }>{ action.name }</option>) }
                </select>
                <Column gap={ 1 }>
                    <Text small>Optional message type, overrides default</Text>
                    <textarea className="form-control" value={ message } onChange={ event => setMessage(event.target.value) }/>
                </Column>
                <Flex justifyContent="between" gap={ 1 }>
                    <Button variant="primary" onClick={ sendDefaultSanction }>Sanction par défaut</Button>
                    <Button variant="success" onClick={ sendSanction }>Sanction personnalisée</Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView>
    );
}
