import { GroupBadgePart, GroupInformationEvent, GroupSettingsEvent } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { IGroupData, LocalizeText } from '../../../api';
import { Base, Column, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView, Text, TransitionSwitch } from '../../../common';
import { useMessageEvent } from '../../../hooks';
import { GroupTabBadgeView } from './tabs/GroupTabBadgeView';
import { GroupTabColorsView } from './tabs/GroupTabColorsView';
import { GroupTabIdentityView } from './tabs/GroupTabIdentityView';
import { GroupTabSettingsView } from './tabs/GroupTabSettingsView';

const TABS: number[] = [ 1, 2, 3, 5 ];

export const GroupManagerView: FC<{}> = props =>
{
    const [ currentTab, setCurrentTab ] = useState<number>(1);
    const [ closeAction, setCloseAction ] = useState<{ action: () => boolean }>(null);
    const [ groupData, setGroupData ] = useState<IGroupData>(null);
    const [ prevDirection, setPrevDirection ] = useState<'left' | 'right' | 'up' | 'down'>('left');

    const onClose = () =>
    {
        setCloseAction(prevValue =>
        {
            if(prevValue && prevValue.action) prevValue.action();

            return null;
        });

        setGroupData(null);
    }

    const changeTab = (nextTab: number) =>
    {
        if(closeAction && closeAction.action) closeAction.action();

        const nextDirection = TABS.indexOf(nextTab) > TABS.indexOf(currentTab) ? 'right' : 'left';
        setPrevDirection(nextDirection);
        window.setTimeout(() => setCurrentTab(nextTab));
    }

    useMessageEvent<GroupInformationEvent>(GroupInformationEvent, event =>
    {
        const parser = event.getParser();

        if(!groupData || (groupData.groupId !== parser.id)) return;

        setGroupData(prevValue =>
        {
            const newValue = { ...prevValue };

            newValue.groupName = parser.title;
            newValue.groupDescription = parser.description;
            newValue.groupState = parser.type;
            newValue.groupCanMembersDecorate = parser.canMembersDecorate;

            return newValue;
        });
    });

    useMessageEvent<GroupSettingsEvent>(GroupSettingsEvent, event =>
    {
        const parser = event.getParser();

        const groupBadgeParts: GroupBadgePart[] = [];

        parser.badgeParts.forEach((part, id) =>
        {
            groupBadgeParts.push(new GroupBadgePart(
                part.isBase ? GroupBadgePart.BASE : GroupBadgePart.SYMBOL,
                part.key,
                part.color,
                part.position
            ));
        });

        setGroupData({
            groupId: parser.id,
            groupName: parser.title,
            groupDescription: parser.description,
            groupHomeroomId: parser.roomId,
            groupState: parser.state,
            groupCanMembersDecorate: parser.canMembersDecorate,
            groupColors: [ parser.colorA, parser.colorB ],
            groupBadgeParts
        });
    });

    if(!groupData || (groupData.groupId <= 0)) return null;
    
    return (
        <NitroCardView className="nitro-group-manager">
            <NitroCardHeaderView headerText={ LocalizeText('group.window.title') } onCloseClick={ onClose } />
            <NitroCardTabsView>
                { TABS.map(tab =>
                {
                    return (<NitroCardTabsItemView key={ tab } isActive={ currentTab === tab } onClick={ () => changeTab(tab) }>
                        { LocalizeText(`group.edit.tab.${ tab }`) }
                    </NitroCardTabsItemView>);
                }) }
            </NitroCardTabsView>
            <NitroCardContentView overflow="hidden">
                <TransitionSwitch innerKey={ currentTab } direction={ prevDirection }>
                    <Column key={ currentTab } fullHeight>
                        <Flex alignItems="center" gap={ 2 }>
                            <Base className={ `nitro-group-tab-image tab-${ currentTab }` } />
                            <Column grow gap={ 0 }>
                                <Text bold fontSize={ 4 }>{ LocalizeText(`group.edit.tabcaption.${ currentTab }`) }</Text>
                                <Text>{ LocalizeText(`group.edit.tabdesc.${ currentTab }`) }</Text>
                            </Column>
                        </Flex>
                        <Column grow overflow="hidden">
                            { (currentTab === 1) &&
                            <GroupTabIdentityView groupData={ groupData } setGroupData={ setGroupData } setCloseAction={ setCloseAction } onClose={ onClose } key="tab-1" /> }
                            { (currentTab === 2) &&
                            <GroupTabBadgeView groupData={ groupData } setGroupData={ setGroupData } setCloseAction={ setCloseAction } skipDefault={ true } key="tab-2" /> }
                            { (currentTab === 3) &&
                            <GroupTabColorsView groupData={ groupData } setGroupData={ setGroupData } setCloseAction={ setCloseAction } key="tab-3" /> }
                            { (currentTab === 5) &&
                            <GroupTabSettingsView groupData={ groupData } setGroupData={ setGroupData } setCloseAction={ setCloseAction } key="tab-5" /> }
                        </Column>
                    </Column>
                </TransitionSwitch>
            </NitroCardContentView>
        </NitroCardView>
    );
};
