import { FC, useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { GroupItem } from '../../../../api';
import { Base, BaseProps, Flex, LayoutFurniImageView, LayoutLimitedEditionCompactPlateView, LayoutRarityLevelView, NitroCardContentView, Text } from '../../../../common';

interface InventoryTradeFurniInfoViewProps extends BaseProps<HTMLDivElement>
{
    item: GroupItem;
}

export const InventoryTradeFurniInfoView: FC<InventoryTradeFurniInfoViewProps> = props =>
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

    return (
        <>
            <Base innerRef={ elementRef } onMouseOver={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>
                { children }
            </Base>
            <Overlay show={ isVisible } target={ elementRef.current } placement="right">
                <Popover onClick={ handleOverlayClick }>
                    <NitroCardContentView overflow="hidden" className="bg-transparent image-rendering-pixelated">
                        <Flex position="relative" gap={ 1 } alignItems="center" column>
                            <Text bold>{ item.name }</Text>
                            { item.stuffData.isUnique &&
                                <div className="position-absolute end-0 bottom-0">
                                    <LayoutLimitedEditionCompactPlateView uniqueNumber={ item.stuffData.uniqueNumber } uniqueSeries={ item.stuffData.uniqueSeries } />
                                </div> }
                            { <LayoutFurniImageView productType={ item.isWallItem ? 'i' : 's' } productClassId={ item.getLastItem().type } /> }
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
