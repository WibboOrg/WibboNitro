import { NumberDataType, RoomEngineTriggerWidgetEvent } from '@nitrots/nitro-renderer';
import { useState } from 'react';
import { GetRoomEngine, IsOwnerOfFurniture } from '../../../../api';
import { useRoomEngineEvent } from '../../../events';
import { useFurniRemovedEvent } from '../../engine';
import { useRoom } from '../../useRoom';

const useFurnitureBannerTrocWidgetState = () =>
{
    const [ objectId, setObjectId ] = useState(-1);
    const [ bannerId, setBannerId ] = useState(-1);
    const [ bannerHaveLayer, setBannerHaveLayer ] = useState(false);
    const { roomSession = null } = useRoom();

    const onClose = () =>
    {
        setObjectId(-1);
        setBannerId(-1);
    }

    const onConfirm = () =>
    {
        roomSession.useMultistateItem(objectId)
        
        onClose()
    }

    useRoomEngineEvent<RoomEngineTriggerWidgetEvent>(RoomEngineTriggerWidgetEvent.REQUEST_BANNER_TROC, event =>
    {
        const roomObject = GetRoomEngine().getRoomObject(event.roomId, event.objectId, event.category);

        if(!roomObject || !IsOwnerOfFurniture(roomObject)) return;

        const numberStuff = new NumberDataType();

        numberStuff.initializeFromRoomObjectModel(roomObject.model);

        setObjectId(event.objectId);
        setBannerId(numberStuff.getValue(0));
        setBannerHaveLayer(numberStuff.getValue(1) === 1 ? true : false);
    });

    useFurniRemovedEvent(objectId !== -1, event =>
    {
        if(event.id !== objectId) return;

        onClose();
    });

    return { objectId, onClose, onConfirm, bannerId, bannerHaveLayer };
}

export const useFurnitureBannerTrocWidget = useFurnitureBannerTrocWidgetState;
