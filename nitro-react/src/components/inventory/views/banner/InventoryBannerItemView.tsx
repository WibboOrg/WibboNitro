import { FC, PropsWithChildren } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GetConfiguration, UnseenItemCategory } from '../../../../api';
import { LayoutGridItem } from '../../../../common';
import { useInventoryBanners, useInventoryUnseenTracker } from '../../../../hooks';

export const InventoryBannerItemView: FC<PropsWithChildren<{ banner: { id: number; haveLayer: boolean }}>> = props =>
{
    const { banner = null, children = null, ...rest } = props;
    const { selectedBanner = null, setSelectedBanner = null } = useInventoryBanners();
    const { isUnseen = null } = useInventoryUnseenTracker();
    const unseen = isUnseen(UnseenItemCategory.BANNER, banner?.id || -1);

    return (
        <LayoutGridItem itemActive={ (selectedBanner === banner) } itemUnseen={ unseen } onMouseDown={ event => setSelectedBanner(banner) } { ...rest }>
            { banner != null && <img src={ GetConfiguration<string>('banner.url').replace('%id%', banner.id.toString()) } /> }
            { banner == null && <FaTimes className="fa-icon cursor-pointer" /> }
            { children }
        </LayoutGridItem>
    );
}
