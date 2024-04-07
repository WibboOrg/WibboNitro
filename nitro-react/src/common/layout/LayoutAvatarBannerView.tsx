import { FC } from 'react';
import { Base, BaseProps } from '../Base';
import { LayoutAvatarImageView } from './LayoutAvatarImageView';
import { LayoutBannerImageView } from './LayoutBannerImageView';

export interface LayoutAvatarBannerViewProps extends BaseProps<HTMLDivElement>
{
    figure?: string;
    direction?: number;
    banner: { id: number; haveLayer: boolean };
}

export const LayoutAvatarBannerView: FC<LayoutAvatarBannerViewProps> = props =>
{
    const { figure = null, direction = 4, banner = null, ...rest } = props;

    return <Base className="avatar-banner" { ...rest }>
        { banner && <LayoutBannerImageView bannerId={ banner.id.toString() } /> }
        { figure && <LayoutAvatarImageView figure={ figure } direction={ direction == 2 && banner && banner.haveLayer ? 3 : direction } /> }
        { banner && banner.haveLayer && <LayoutBannerImageView bannerId={ banner.id + '_layer' } /> }
    </Base>;
}
