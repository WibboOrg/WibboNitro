import { UserBannerSelectComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { LocalizeText, SendMessageComposer, UnseenItemCategory } from '../../../../api';
import { AutoGrid, Button, Column, Flex, Grid, LayoutAvatarBannerView, Text } from '../../../../common';
import { useInventoryBanners, useInventoryUnseenTracker, useSessionInfo } from '../../../../hooks';
import { InventoryBannerItemView } from './InventoryBannerItemView';

export const InventoryBannerView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const { banner, selectedBanner = null, userBannerList = null, activate = null, deactivate = null } = useInventoryBanners();
    const { isUnseen = null, removeUnseen = null } = useInventoryUnseenTracker();
    const { userFigure = null } = useSessionInfo();

    const saveBannerId = (bannerId: number) => SendMessageComposer(new UserBannerSelectComposer(bannerId));

    useEffect(() =>
    {
        if(!selectedBanner || !isUnseen(UnseenItemCategory.BANNER, selectedBanner.id)) return;

        removeUnseen(UnseenItemCategory.BANNER, selectedBanner.id);
    }, [ selectedBanner, isUnseen, removeUnseen ]);

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

    return (
        <Grid>
            <Column size={ 9 } overflow="hidden">
                <AutoGrid columnCount={ 4 }>
                    <InventoryBannerItemView key={ -1 } banner={ null } />
                    { userBannerList && userBannerList.map(banner => <InventoryBannerItemView key={ banner.id } banner={ banner } />) }
                </AutoGrid>
            </Column>
            <Column className="justify-content-between" size={ 3 } overflow="auto">
                { selectedBanner != null && <Flex alignItems="center" className="h-100" gap={ 2 } column>
                    <Text>Bannière { selectedBanner.id }</Text>
                    <Flex className="h-100">
                        <LayoutAvatarBannerView banner={ selectedBanner } figure={ userFigure } />
                    </Flex>
                </Flex> }
                { selectedBanner == null && <Flex alignItems="center" justifyContent="center" className="h-100" gap={ 2 } column>
                    <Text>Aucune bannière</Text>
                </Flex> }
                <Flex gap={ 2 }>
                    <Button fullWidth variant={ 'success' } onClick={ event => saveBannerId(selectedBanner != null ? selectedBanner.id : -1) } disabled={ selectedBanner?.id === banner?.id } >{ LocalizeText('save') }</Button>
                </Flex>
            </Column>
        </Grid>
    );
}
