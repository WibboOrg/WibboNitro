import { LegacyDataType, RoomEngineTriggerWidgetEvent } from '@nitrots/nitro-renderer';
import { useState } from 'react';
import { GetRoomEngine, IsOwnerOfFurniture } from '../../../../api';
import { useRoomEngineEvent } from '../../../events';
import { useFurniRemovedEvent } from '../../engine';
import { useRoom } from '../../useRoom';

const useFurnitureBadgeTrocWidgetState = () =>
{
    const [ objectId, setObjectId ] = useState(-1);
    const [ badgeId, setBadgeId ] = useState('');
    const { roomSession = null } = useRoom();

    const onClose = () =>
    {
        setObjectId(-1);
        setBadgeId('');
    }

    const onConfirm = () =>
    {
        roomSession.useMultistateItem(objectId)
        
        onClose()
    }

    useRoomEngineEvent<RoomEngineTriggerWidgetEvent>(RoomEngineTriggerWidgetEvent.REQUEST_BADGE_TROC, event =>
    {
        const roomObject = GetRoomEngine().getRoomObject(event.roomId, event.objectId, event.category);

        if(!roomObject || !IsOwnerOfFurniture(roomObject)) return;

        const legacyStuff = new LegacyDataType();

        legacyStuff.initializeFromRoomObjectModel(roomObject.model);

        setObjectId(event.objectId);
        setBadgeId(legacyStuff.getLegacyString());
    });

    useFurniRemovedEvent(objectId !== -1, event =>
    {
        if(event.id !== objectId) return;

        onClose();
    });

    return { objectId, onClose, onConfirm, badgeId };
}

export const useFurnitureBadgeTrocWidget = useFurnitureBadgeTrocWidgetState;
