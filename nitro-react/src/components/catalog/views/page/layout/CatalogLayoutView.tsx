import { FC } from 'react';
import { CatalogLayoutProps } from './CatalogLayout.types';
import { CatalogLayoutBadgeDisplayView } from './CatalogLayoutBadgeDisplayView';
import { CatalogLayoutColorGroupingView } from './CatalogLayoutColorGroupingView';
import { CatalogLayoutDefaultView } from './CatalogLayoutDefaultView';
import { CatalogLayouGuildCustomFurniView } from './CatalogLayoutGuildCustomFurniView';
import { CatalogLayouGuildForumView } from './CatalogLayoutGuildForumView';
import { CatalogLayouGuildFrontpageView } from './CatalogLayoutGuildFrontpageView';
import { CatalogLayoutInfoLoyaltyView } from './CatalogLayoutInfoLoyaltyView';
import { CatalogLayoutLimitedFlashView } from './CatalogLayoutLimitedFlashView';
import { CatalogLayoutPets2View } from './CatalogLayoutPets2View';
import { CatalogLayoutPets3View } from './CatalogLayoutPets3View';
import { CatalogLayoutRoomAdsView } from './CatalogLayoutRoomAdsView';
import { CatalogLayoutRoomBundleView } from './CatalogLayoutRoomBundleView';
import { CatalogLayoutSingleBundleView } from './CatalogLayoutSingleBundleView';
import { CatalogLayoutSoundMachineView } from './CatalogLayoutSoundMachineView';
import { CatalogLayoutSpacesView } from './CatalogLayoutSpacesView';
import { CatalogLayoutTrophiesView } from './CatalogLayoutTrophiesView';
import { CatalogLayoutVipBuyView } from './CatalogLayoutVipBuyView';
import { CatalogLayoutFrontpage4View } from './frontpage4/CatalogLayoutFrontpage4View';
import { CatalogLayoutMarketplaceOwnItemsView } from './marketplace/CatalogLayoutMarketplaceOwnItemsView';
import { CatalogLayoutMarketplacePublicItemsView } from './marketplace/CatalogLayoutMarketplacePublicItemsView';
import { CatalogLayoutPetView } from './pets/CatalogLayoutPetView';
import { CatalogLayoutVipGiftsView } from './vip-gifts/CatalogLayoutVipGiftsView';

export const CatalogLayoutView: FC<CatalogLayoutProps> = props =>
{
    const { page = null } = props;

    if(!page) return null;

    switch(page.layoutCode)
    {
        case 'frontpage_featured':
            return null
        case 'frontpage4':
            return <CatalogLayoutFrontpage4View { ...props } />;
        case 'pets':
            return <CatalogLayoutPetView { ...props } />;
        case 'pets2':
            return <CatalogLayoutPets2View { ...props } />;
        case 'pets3':
            return <CatalogLayoutPets3View { ...props } />;
        case 'vip_buy':
            return <CatalogLayoutVipBuyView { ...props } />;
        case 'guild_frontpage':
            return <CatalogLayouGuildFrontpageView { ...props } />;
        case 'guild_forum':
            return <CatalogLayouGuildForumView { ...props } />;
        case 'guild_custom_furni':
            return <CatalogLayouGuildCustomFurniView { ...props } />;
        case 'club_gifts':
            return <CatalogLayoutVipGiftsView { ...props } />;
        case 'marketplace_own_items':
            return <CatalogLayoutMarketplaceOwnItemsView { ...props } />;
        case 'marketplace':
            return <CatalogLayoutMarketplacePublicItemsView { ...props } />;
        case 'single_bundle':
            return <CatalogLayoutSingleBundleView { ...props } />;
        case 'room_bundle':
            return <CatalogLayoutRoomBundleView { ...props } />;
        case 'spaces_new':
            return <CatalogLayoutSpacesView { ...props } />;
        case 'trophies':
            return <CatalogLayoutTrophiesView { ...props } />;
        case 'info_loyalty':
            return <CatalogLayoutInfoLoyaltyView { ...props } />;
        case 'badge_display':
            return <CatalogLayoutBadgeDisplayView { ...props } />;
        case 'roomads':
            return <CatalogLayoutRoomAdsView { ...props } />;
        case 'default_3x3_color_grouping':
            return <CatalogLayoutColorGroupingView { ...props } />;
        case 'soundmachine':
            return <CatalogLayoutSoundMachineView { ...props } />;
        case 'limited_flash':
            return <CatalogLayoutLimitedFlashView { ...props } />;
        case 'bots':
        case 'default_3x3':
        default:
            return <CatalogLayoutDefaultView { ...props } />;
    }
}
