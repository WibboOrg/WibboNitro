import { RoomBannedUsersComposer, RoomDataParser, RoomSettingsDataEvent, SaveRoomSettingsComposer } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { IRoomData, LocalizeText, SendMessageComposer } from '../../../../api';
import { Column, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView, TransitionSwitch } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';
import { NavigatorRoomSettingsAccessTabView } from './NavigatorRoomSettingsAccessTabView';
import { NavigatorRoomSettingsBasicTabView } from './NavigatorRoomSettingsBasicTabView';
import { NavigatorRoomSettingsModTabView } from './NavigatorRoomSettingsModTabView';
import { NavigatorRoomSettingsRightsTabView } from './NavigatorRoomSettingsRightsTabView';
import { NavigatorRoomSettingsVipChatTabView } from './NavigatorRoomSettingsVipChatTabView';

const TABS: string[] = [
    'navigator.roomsettings.tab.1',
    'navigator.roomsettings.tab.2',
    'navigator.roomsettings.tab.3',
    'navigator.roomsettings.tab.4',
    'navigator.roomsettings.tab.5'
];

export const NavigatorRoomSettingsView: FC<{}> = props =>
{
    const [ roomData, setRoomData ] = useState<IRoomData>(null);
    const [ currentTab, setCurrentTab ] = useState(TABS[0]);
    const [ prevDirection, setPrevDirection ] = useState<'left' | 'right' | 'up' | 'down'>('left');

    useMessageEvent<RoomSettingsDataEvent>(RoomSettingsDataEvent, event =>
    {
        const parser = event.getParser();

        if(!parser) return;

        const data = parser.data;

        setRoomData({
            roomId: data.roomId,
            roomName: data.name,
            roomDescription: data.description,
            categoryId: data.categoryId,
            userCount: data.maximumVisitorsLimit,
            tags: data.tags,
            tradeState: data.tradeMode,
            allowWalkthrough: data.allowWalkThrough,
            lockState: data.doorMode,
            password: null,
            allowPets: data.allowPets,
            allowPetsEat: data.allowFoodConsume,
            hideWalls: data.hideWalls,
            wallThickness: data.wallThickness,
            floorThickness: data.floorThickness,
            chatSettings: {
                mode: data.chatSettings.mode,
                weight: data.chatSettings.weight,
                speed: data.chatSettings.speed,
                distance: data.chatSettings.distance,
                protection: data.chatSettings.protection
            },
            moderationSettings: {
                allowMute: data.roomModerationSettings.allowMute,
                allowKick: data.roomModerationSettings.allowKick,
                allowBan: data.roomModerationSettings.allowBan
            }
        });

        SendMessageComposer(new RoomBannedUsersComposer(data.roomId));
    });

    const onClose = () =>
    {
        setRoomData(null);
        setCurrentTab(TABS[0]);
    }

    const handleChange = (field: string, value: string | number | boolean | string[]) =>
    {
        setRoomData(prevValue =>
        {
            const newValue = { ...prevValue };

            switch(field)
            {
                case 'name':
                    newValue.roomName = String(value);
                    break;
                case 'description':
                    newValue.roomDescription = String(value);
                    break;
                case 'category':
                    newValue.categoryId = Number(value);
                    break;
                case 'max_visitors':
                    newValue.userCount = Number(value);
                    break;
                case 'trade_state':
                    newValue.tradeState = Number(value);
                    break;
                case 'tags':
                    newValue.tags = value as Array<string>;
                    break;
                case 'allow_walkthrough':
                    newValue.allowWalkthrough = Boolean(value);
                    break;
                case 'allow_pets':
                    newValue.allowPets = Boolean(value);
                    break;
                case 'allow_pets_eat':
                    newValue.allowPetsEat = Boolean(value);
                    break;
                case 'hide_walls':
                    newValue.hideWalls = Boolean(value);
                    break;
                case 'wall_thickness':
                    newValue.wallThickness = Number(value);
                    break;
                case 'floor_thickness':
                    newValue.floorThickness = Number(value);
                    break;
                case 'lock_state':
                    newValue.lockState = Number(value);
                    break;
                case 'password':
                    newValue.lockState = RoomDataParser.PASSWORD_STATE;
                    newValue.password = String(value);
                    break;
                case 'moderation_mute':
                    newValue.moderationSettings.allowMute = Number(value);
                    break;
                case 'moderation_kick':
                    newValue.moderationSettings.allowKick = Number(value);
                    break;
                case 'moderation_ban':
                    newValue.moderationSettings.allowBan = Number(value);
                    break;
                case 'bubble_mode':
                    newValue.chatSettings.mode = Number(value);
                    break;
                case 'chat_weight':
                    newValue.chatSettings.weight = Number(value);
                    break;
                case 'bubble_speed':
                    newValue.chatSettings.speed = Number(value);
                    break;
                case 'flood_protection':
                    newValue.chatSettings.protection = Number(value);
                    break;
                case 'chat_distance':
                    newValue.chatSettings.distance = Number(value);
                    break;
            }

            SendMessageComposer(
                new SaveRoomSettingsComposer(
                    newValue.roomId,
                    newValue.roomName,
                    newValue.roomDescription,
                    newValue.lockState,
                    newValue.password || '',
                    newValue.userCount,
                    newValue.categoryId,
                    newValue.tags.length,
                    newValue.tags,
                    newValue.tradeState,
                    newValue.allowPets,
                    newValue.allowPetsEat,
                    newValue.allowWalkthrough,
                    newValue.hideWalls,
                    newValue.wallThickness,
                    newValue.floorThickness,
                    newValue.moderationSettings.allowMute,
                    newValue.moderationSettings.allowKick,
                    newValue.moderationSettings.allowBan,
                    newValue.chatSettings.mode,
                    newValue.chatSettings.weight,
                    newValue.chatSettings.speed,
                    newValue.chatSettings.distance,
                    newValue.chatSettings.protection
                ));

            return newValue;
        });
    }

    const getCurrentComponent = () => 
    {
        switch (currentTab) 
        {
            case TABS[0]:
                return <NavigatorRoomSettingsBasicTabView roomData={ roomData } handleChange={ handleChange } onClose={ onClose } key={ TABS[0] } />;
            case TABS[1]:
                return <NavigatorRoomSettingsAccessTabView roomData={ roomData } handleChange={ handleChange } key={ TABS[1] } />;
            case TABS[2]:
                return <NavigatorRoomSettingsRightsTabView roomData={ roomData } handleChange={ handleChange } key={ TABS[2] } />;
            case TABS[3]:
                return <NavigatorRoomSettingsVipChatTabView roomData={ roomData } handleChange={ handleChange } key={ TABS[3] } />;
            case TABS[4]:
                return <NavigatorRoomSettingsModTabView roomData={ roomData } handleChange={ handleChange } key={ TABS[4] } />;
            default:
                throw Error(`Unknown tab value: ${ currentTab }`);
        }
    };

    const updateTab = (nextTab: string) => 
    {
        const nextDirection = TABS.indexOf(nextTab) > TABS.indexOf(currentTab) ? 'right' : 'left';
        setPrevDirection(nextDirection);
        window.setTimeout(() => setCurrentTab(nextTab));
    };

    if(!roomData) return null;

    return (
        <NitroCardView uniqueKey="nitro-room-settings" className="nitro-room-settings">
            <NitroCardHeaderView headerText={ LocalizeText('navigator.roomsettings') } onCloseClick={ onClose } />
            <NitroCardTabsView>
                { TABS.map(tab =>
                {
                    return <NitroCardTabsItemView key={ tab } isActive={ (currentTab === tab) } onClick={ event => updateTab(tab) }>{ LocalizeText(tab) }</NitroCardTabsItemView>
                }) }
            </NitroCardTabsView>
            <NitroCardContentView overflow="hidden">
                <TransitionSwitch innerKey={ currentTab } direction={ prevDirection }>
                    <Column key={ currentTab }>
                        { getCurrentComponent() }
                    </Column>
                </TransitionSwitch>
            </NitroCardContentView>
        </NitroCardView>
    );
};
