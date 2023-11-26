import { FC } from 'react';
import { GetConfiguration } from '../../api';
import { Base, BaseProps } from '../Base';
import { LayoutAvatarImageView } from './LayoutAvatarImageView';

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
        { banner && <img src={ GetConfiguration<string>('banner.url').replace('%id%', banner.id.toString()) } /> }
        { figure && <LayoutAvatarImageView figure={ figure } direction={ direction == 2 && banner && banner.haveLayer ? 3 : direction } /> }
        { banner && banner.haveLayer && <img src={ GetConfiguration<string>('banner.layer.url').replace('%id%', banner.id.toString()) }/> }
    </Base>;
}
