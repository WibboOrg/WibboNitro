import { IRoomGeometry, MouseEventType, RoomObjectVariable, StringDataType } from '../../../../../api';
import { RoomObjectBadgeAssetEvent, RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { GetTickerTime } from '../../../../../pixi-proxy';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage, ObjectGroupBadgeUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureBadgeTrocLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.BADGE_TROC, RoomObjectBadgeAssetEvent.LOAD_BADGE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            const data = message.data;

            if(data instanceof StringDataType) this.updateBadge(data.getValue(0));

            return;
        }

        if(message instanceof ObjectGroupBadgeUpdateMessage)
        {
            if(message.assetName !== 'loading_icon')
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_ASSET_NAME, message.assetName);
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_IMAGE_STATUS, 1);

                this.update(GetTickerTime());
            }

            return;
        }
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BADGE_TROC, this.object));
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.ROLL_OVER:
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object));
                break;
            case MouseEventType.ROLL_OUT:
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object));
                break;
        }

        super.mouseEvent(event, geometry);
    }

    protected updateBadge(badgeId: string): void
    {
        if(badgeId === '') return;

        if(this.eventDispatcher)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_IMAGE_STATUS, -1);

            this.eventDispatcher.dispatchEvent(new RoomObjectBadgeAssetEvent(RoomObjectBadgeAssetEvent.LOAD_BADGE, this.object, badgeId, false));
        }
    }
}
