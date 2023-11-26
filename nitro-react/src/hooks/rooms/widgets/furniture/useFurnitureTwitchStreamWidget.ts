import { RoomEngineObjectEvent, RoomEngineTriggerWidgetEvent, RoomObjectVariable } from '@nitrots/nitro-renderer';
import { useMemo, useState } from 'react';
import { GetConfiguration, GetRoomEngine } from '../../../../api';
import { useRoomEngineEvent } from '../../../events';
import { useRoom } from '../../useRoom';

const useFurnitureTwitchStreamWidgetState = () =>
{
    const [ objectId, setObjectId ] = useState(-1);
    const [ objectData, setObjectData ] = useState('');
    const { roomSession = null } = useRoom();

    useRoomEngineEvent<RoomEngineObjectEvent>([
        RoomEngineTriggerWidgetEvent.REQUEST_TWITCH_STREAM_DISPLAY,
        RoomEngineTriggerWidgetEvent.REQUEST_HIDE_TWITCH_STREAM_DISPLAY
    ], event =>
    {
        switch (event.type)
        {
            case RoomEngineTriggerWidgetEvent.REQUEST_TWITCH_STREAM_DISPLAY:
                {
                    const object = GetRoomEngine().getRoomObject(roomSession.roomId, event.objectId, event.category);

                    if (!object) return;
              
                    const data = object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

                    if (!data) return;

                    setObjectId(object.id);
                    setObjectData('teuf');
                }
                break;
            case RoomEngineTriggerWidgetEvent.REQUEST_HIDE_TWITCH_STREAM_DISPLAY:
            {
                if(event.roomId !== roomSession.roomId) return;

                setObjectId(-1);
                setObjectData('');
            }
        }
    });

    const twitchConfig = useMemo(() =>
    {
        return {
            twitch: {
                options: {
                    parent: GetConfiguration<string>('base.url')
                }
            }
        }
    }, []);

    return { twitchConfig, objectId, objectData };
}

export const useFurnitureTwitchStreamWidget = useFurnitureTwitchStreamWidgetState;
