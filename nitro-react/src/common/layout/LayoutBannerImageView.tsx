import { BannerImageReadyEvent, NitroSprite, TextureUtils } from '@nitrots/nitro-renderer';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { GetSessionDataManager } from '../../api';
import { useOnScreen } from '../../hooks';
import { Base, BaseProps } from '../Base';

export interface LayoutBannerImageViewProps extends BaseProps<HTMLDivElement>
{
    bannerId: string;
}

export const LayoutBannerImageView: FC<LayoutBannerImageViewProps> = props =>
{
    const { bannerId = -1, classNames = [], style = {}, children = null, ...rest } = props;
    const [ imageElement, setImageElement ] = useState<HTMLImageElement>(null);
    const ref = useRef<HTMLDivElement>();
    const isVisible = useOnScreen(ref);

    const getClassNames = useMemo(() =>
    {
        const newClassNames: string[] = [ 'banner-image' ];

        if(classNames.length) newClassNames.push(...classNames);

        return newClassNames;
    }, [ classNames ]);

    const getStyle = useMemo(() =>
    {
        let newStyle: CSSProperties = {};

        if(imageElement)
        {
            newStyle.backgroundImage = `url(${ imageElement.src })`;
            newStyle.width = imageElement.width;
            newStyle.height = imageElement.height;
        }

        if(Object.keys(style).length) newStyle = { ...newStyle, ...style };

        return newStyle;
    }, [ imageElement, style ]);

    useEffect(() =>
    {
        if (!bannerId || !isVisible) return;

        let didSetBadge = false;

        const onBannerImageReadyEvent = (event: BannerImageReadyEvent) =>
        {
            if(event.bannerId !== bannerId.toString()) return;

            const element = TextureUtils.generateImage(new NitroSprite(event.image));

            element.onload = () => setImageElement(element);

            didSetBadge = true;

            GetSessionDataManager().events.removeEventListener(BannerImageReadyEvent.IMAGE_READY, onBannerImageReadyEvent);
        }

        GetSessionDataManager().events.addEventListener(BannerImageReadyEvent.IMAGE_READY, onBannerImageReadyEvent);

        const texture = GetSessionDataManager().getBannerImage(bannerId.toString());

        if(texture && !didSetBadge)
        {
            const element = TextureUtils.generateImage(new NitroSprite(texture));

            element.onload = () => setImageElement(element);
        }

        return () => GetSessionDataManager().events.removeEventListener(BannerImageReadyEvent.IMAGE_READY, onBannerImageReadyEvent);
    }, [ bannerId, isVisible ]);

    return (
        <Base innerRef={ ref } classNames={ getClassNames } style={ getStyle } { ...rest }>
            { children }
        </Base>
    );
}
