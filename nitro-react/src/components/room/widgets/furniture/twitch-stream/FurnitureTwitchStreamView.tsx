import { RoomEngineTriggerWidgetEvent, RoomObjectCategory, RoomObjectVariable } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { GetConfiguration, GetRoomEngine } from '../../../../../api';
import { Column, Flex } from '../../../../../common';
import { UseRoomEngineEvent } from '../../../../../hooks';
import { useRoomContext } from '../../../RoomContext';
import { ContextMenuHeaderView } from '../../context-menu/ContextMenuHeaderView';
import { ObjectLocationView } from '../../object-location/ObjectLocationView';

export const FurnitureTwitchStreamView: FC<{}> = props =>
{
    const [ objectId, setObjectId ] = useState(-1);
    const [ objectData, setObjectData ] = useState('');
    const { roomSession = null } = useRoomContext();

    const onRoomEngineTriggerWidgetEvent = useCallback((event: RoomEngineTriggerWidgetEvent) =>
    {
        switch(event.type)
        {
            case RoomEngineTriggerWidgetEvent.REQUEST_TWITCH_STREAM_DISPLAY: {
                const object = GetRoomEngine().getRoomObject(roomSession.roomId, event.objectId, event.category);

                if(!object) return;
                
                const data = object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

                if(!data) return;

                setObjectId(object.id);
                setObjectData('chap_gg');
               
                return;
            }
            case RoomEngineTriggerWidgetEvent.REQUEST_HIDE_TWITCH_STREAM_DISPLAY:
                if(event.roomId !== roomSession.roomId) return;

                setObjectId(-1);
                setObjectData('');
                return;
        }
    }, [ roomSession ]);

    UseRoomEngineEvent(RoomEngineTriggerWidgetEvent.REQUEST_TWITCH_STREAM_DISPLAY, onRoomEngineTriggerWidgetEvent);
    UseRoomEngineEvent(RoomEngineTriggerWidgetEvent.REQUEST_HIDE_TWITCH_STREAM_DISPLAY, onRoomEngineTriggerWidgetEvent);

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

    if(objectId === -1 || objectData === '') return null;

    return (
        <>
            <ObjectLocationView objectId={ objectId } category={ RoomObjectCategory.FLOOR }>
                <Column className="nitro-widget-twitch-stream nitro-context-menu" gap={ 0 }>
                    <ContextMenuHeaderView>
                        Twitch Stream ({ objectData })
                    </ContextMenuHeaderView>
                    <Flex gap={ 1 } className="h-100">
                        <ReactPlayer config={ twitchConfig } playing={ true } width="100%" height="100%" url={ `https://www.twitch.tv/${ objectData }` }></ReactPlayer>
                    </Flex>
                </Column>
            </ObjectLocationView>
        </>
    );
}
