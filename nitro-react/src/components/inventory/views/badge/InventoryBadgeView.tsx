import { DeleteBadgeInventoryComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { LocalizeBadgeName, LocalizeText, SendMessageComposer, UnseenItemCategory } from '../../../../api';
import { AutoGrid, Button, Column, Flex, Grid, LayoutBadgeImageView, Text } from '../../../../common';
import { useInventoryBadges, useInventoryUnseenTracker, useNotification } from '../../../../hooks';
import { InventoryBadgeItemView } from './InventoryBadgeItemView';
import { InventoryBadgeSearchView } from './InventoryBadgeSearchView';

export const InventoryBadgeView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const { badgeCodes = [], activeBadgeCodes = [], selectedBadgeCode = null, isWearingBadge = null, canWearBadges = null, toggleBadge = null, getBadgeId = null, activate = null, deactivate = null } = useInventoryBadges();
    const [ filteredBadges, setFilteredBadges ] = useState<string[]>([]);
    const { isUnseen = null, removeUnseen = null } = useInventoryUnseenTracker();
    const { showConfirm = null } = useNotification();

    useEffect(() =>
    {
        if(!selectedBadgeCode || !isUnseen(UnseenItemCategory.BADGE, getBadgeId(selectedBadgeCode))) return;

        removeUnseen(UnseenItemCategory.BADGE, getBadgeId(selectedBadgeCode));
    }, [ selectedBadgeCode, isUnseen, removeUnseen, getBadgeId ]);

    useEffect(() =>
    {
        if(!isVisible) return;

        const id = activate();

        return () => deactivate(id);
    }, [ isVisible, activate, deactivate ]);

    useEffect(() =>
    {
        setIsVisible(true);

        return () => setIsVisible(false);
    }, []);

    const deleteBadge = (badgeCode: string) =>
    {
        showConfirm(LocalizeText('inventory.confirm.delete.badge', [ 'name' ], [ badgeCode ]), () =>
        {
            SendMessageComposer(new DeleteBadgeInventoryComposer(badgeCode));
        },
        null, null, null, LocalizeText('generic.alert.title'));
    }

    return (
        <Grid>
            <Column size={ 7 } overflow="hidden">
                <InventoryBadgeSearchView badgeCodes={ badgeCodes } setBadgeCodes={ setFilteredBadges } />
                <AutoGrid columnCount={ 4 }>
                    { filteredBadges && (filteredBadges.length > 0) && filteredBadges.map((badgeCode, index) =>
                    {
                        if(isWearingBadge(badgeCode)) return null;

                        return <InventoryBadgeItemView key={ index } badgeCode={ badgeCode } />
                    }) }
                </AutoGrid>
            </Column>
            <Column className="justify-content-between" size={ 5 } overflow="auto">
                <Column overflow="hidden" gap={ 2 }>
                    <Text>{ LocalizeText('inventory.badges.activebadges') }</Text>
                    <AutoGrid columnCount={ 3 }>
                        { activeBadgeCodes && (activeBadgeCodes.length > 0) && activeBadgeCodes.map((badgeCode, index) => <InventoryBadgeItemView key={ index } badgeCode={ badgeCode } />) }
                    </AutoGrid>
                </Column>
                { !!selectedBadgeCode &&
                    <Column grow justifyContent="end" gap={ 2 }>
                        <Flex alignItems="center" gap={ 2 }>
                            <LayoutBadgeImageView shrink badgeCode={ selectedBadgeCode } />
                            <Text>{ LocalizeBadgeName(selectedBadgeCode) }</Text>
                        </Flex>
                        <Flex gap={ 2 }>
                            <Button fullWidth variant={ (isWearingBadge(selectedBadgeCode) ? 'danger' : 'success') } disabled={ !isWearingBadge(selectedBadgeCode) && !canWearBadges() } onClick={ event => toggleBadge(selectedBadgeCode) }>{ LocalizeText(isWearingBadge(selectedBadgeCode) ? 'inventory.badges.clearbadge' : 'inventory.badges.wearbadge') }</Button>
                            <Button variant="danger" onClick={ event => deleteBadge(selectedBadgeCode) }>
                                <FaTrashAlt className="fa-icon" />
                            </Button>
                        </Flex>
                    </Column> }
            </Column>
        </Grid>
    );
}
