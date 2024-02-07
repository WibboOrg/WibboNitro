import { FC, useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { Base, BaseProps, Flex, LayoutFurniImageView, LayoutLimitedEditionCompactPlateView, LayoutRarityLevelView, NitroCardContentView, Text } from '..';
import { FurnitureItem, LocalizeText, ProductTypeEnum } from '../../api';

interface LayoutFurniImagePopoverViewProps extends BaseProps<HTMLDivElement>
{
    item: FurnitureItem;
}

export const LayoutFurniImagePopoverView: FC<LayoutFurniImagePopoverViewProps> = props =>
{
    const { item = null, children = null } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ timeoutId, setTimeoutId ] = useState(0);
    const elementRef = useRef<HTMLDivElement>();

    const handleMouseEnter = () => 
    {
        if (isVisible || timeoutId) return;
      
        const timeout = window.setTimeout(() => 
        {
            setIsVisible(true);
            setTimeoutId(0); 
        }, 500);
      
        setTimeoutId(timeout);
    };

    const handleMouseLeave = () => 
    {
        if (timeoutId)
        {
            clearTimeout(timeoutId);
            setTimeoutId(0);
        }

        setIsVisible(false);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

    const getFurniTitle = (item ? LocalizeText(item.isWallItem ? 'wallItem.name.' + item.type : 'roomItem.name.' + item.type) : '');

    return (
        <>
            <Base innerRef={ elementRef } onMouseOver={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>
                { children }
            </Base>
            <Overlay show={ isVisible } target={ elementRef.current } placement="right">
                <Popover onClick={ handleOverlayClick }>
                    <NitroCardContentView overflow="hidden" className="bg-transparent image-rendering-pixelated">
                        <Flex position="relative" gap={ 1 } alignItems="center" column>
                            <Text bold>{ getFurniTitle }</Text>
                            { item.stuffData.isUnique &&
                                <div className="position-absolute end-0 bottom-0">
                                    <LayoutLimitedEditionCompactPlateView uniqueNumber={ item.stuffData.uniqueNumber } uniqueSeries={ item.stuffData.uniqueSeries } />
                                </div> }
                            { <LayoutFurniImageView productType={ item.isWallItem ? ProductTypeEnum.WALL : ProductTypeEnum.FLOOR } productClassId={ item.type } extraData={ item.stuffData.getLegacyString() } objectData={ item.stuffData } /> }
                            { (!item.stuffData.isUnique && item.stuffData.rarityLevel > -1) &&
                                <div className="position-absolute end-0 bottom-0">
                                    <LayoutRarityLevelView level={ item.stuffData.rarityLevel } />
                                </div> }
                        </Flex>
                    </NitroCardContentView>
                </Popover>
            </Overlay>
        </>
    );
}
