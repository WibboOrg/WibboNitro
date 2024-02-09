import { FC, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import { GroupItem } from '../../../../api';
import { LayoutGridItem } from '../../../../common';
import { useOnScreen } from '../../../../hooks';

interface InventoryTradeFurnitureItemViewProps
{
    groupItem: GroupItem;
    selectedItem: GroupItem;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: MouseEventHandler<HTMLDivElement>;
    children?: ReactNode;
}


export const InventoryTradeFurnitureItemView: FC<InventoryTradeFurnitureItemViewProps> = props =>
{
    const { groupItem = null, selectedItem = null, children = null, ...rest } = props;
    const [ updateId, setUpdateId ] = useState(-1);
    const ref = useRef<HTMLDivElement>();

    const isVisible = useOnScreen(ref)

    useEffect(() =>
    {
        const rerender = () => setUpdateId(prevValue => (prevValue + 1));

        groupItem.notify = rerender;

        return () => groupItem.notify = null;
    }, [ groupItem ]);

    useEffect(() =>
    {
        if (isVisible)
        {
            if (!groupItem.iconUrl) groupItem.loadIcon();
        }
    }, [ isVisible, groupItem ]);

    const count = groupItem.getUnlockedCount();

    return <LayoutGridItem innerRef={ ref } className={ !count ? 'opacity-0-5 ' : '' } itemImage={ groupItem.iconUrl } itemCount={ groupItem.getUnlockedCount() } itemActive={ (groupItem === selectedItem) } itemUniqueNumber={ groupItem.stuffData.uniqueNumber } itemUnseen={ groupItem.hasUnseenItems } { ...rest }>{ children }</LayoutGridItem>;
}
