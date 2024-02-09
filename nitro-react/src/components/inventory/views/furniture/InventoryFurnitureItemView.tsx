import { MouseEventType } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { GroupItem, attemptItemPlacement } from '../../../../api';
import { LayoutGridItem } from '../../../../common';
import { useInventoryFurni, useOnScreen } from '../../../../hooks';

export const InventoryFurnitureItemView: FC<{ groupItem: GroupItem }> = props =>
{
    const { groupItem = null, ...rest } = props;
    const [ isMouseDown, setMouseDown ] = useState(false);
    const { selectedItem = null, setSelectedItem = null } = useInventoryFurni();
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

    const onMouseEvent = (event: MouseEvent) =>
    {
        switch(event.type)
        {
            case MouseEventType.MOUSE_DOWN:
                setSelectedItem(groupItem);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if(!isMouseDown || !(groupItem === selectedItem)) return;

                attemptItemPlacement(groupItem);
                return;
            case 'dblclick':
                attemptItemPlacement(groupItem);
                return;
        }
    }

    const count = groupItem.getUnlockedCount();

    return <LayoutGridItem innerRef={ ref } className={ !count ? 'opacity-0-5 ' : '' } itemImage={ groupItem.iconUrl } itemCount={ groupItem.getUnlockedCount() } itemActive={ (groupItem === selectedItem) } itemUniqueNumber={ groupItem.stuffData.uniqueNumber } itemUnseen={ groupItem.hasUnseenItems } onMouseDown={ onMouseEvent } onMouseUp={ onMouseEvent } onMouseOut={ onMouseEvent } onDoubleClick={ onMouseEvent } { ...rest } />;
}
