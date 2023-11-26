import { RoomObjectVariable } from '../../../../../api';
import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureTwitchStreamLogic extends FurnitureLogic
{
    private static SHOW_WIDGET_IN_STATE = 1;

    private _state = -1;

    public getEventTypes(): string[]
    {
        return [ RoomObjectWidgetRequestEvent.TWITCH_STREAM_DISPLAY, RoomObjectWidgetRequestEvent.HIDE_TWITCH_STREAM_DISPLAY ];
    }

    public tearDown(): void
    {
        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_TWITCH_STREAM_DISPLAY, this.object));
        }

        super.tearDown();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) !== 1) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            if(message.state === FurnitureTwitchStreamLogic.SHOW_WIDGET_IN_STATE)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TWITCH_STREAM_DISPLAY, this.object));
            }
            else
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_TWITCH_STREAM_DISPLAY, this.object));
            }

            this._state = message.state;
        }
    }
}
