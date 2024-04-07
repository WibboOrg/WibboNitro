import { IRoomGeometry, MouseEventType, NumberDataType, RoomObjectVariable } from '../../../../../api';
import { RoomObjectBannerAssetEvent, RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { GetTickerTime } from '../../../../../pixi-proxy';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage, ObjectGroupBannerUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureBannerTrocLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.BANNER_TROC, RoomObjectBannerAssetEvent.LOAD_BANNER];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            const data = message.data;
            if(data instanceof NumberDataType) this.updateBanner(data.getValue(0), data.getValue(1) === 1);

            return;
        }

        if(message instanceof ObjectGroupBannerUpdateMessage)
        {
            if(message.assetName !== 'loading_icon')
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BANNER_ASSET_NAME, message.assetName);
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BANNER_IMAGE_STATUS, 1);

                this.update(GetTickerTime());
            }

            return;
        }
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

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BANNER_TROC, this.object));
    }

    protected updateBanner(bannerId: number, bannerHaveLayer: boolean): void
    {
        if(bannerId === -1) return;

        if(this.eventDispatcher)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BANNER_IMAGE_STATUS, -1);

            this.eventDispatcher.dispatchEvent(new RoomObjectBannerAssetEvent(RoomObjectBannerAssetEvent.LOAD_BANNER, this.object, bannerId.toString() + (bannerHaveLayer ? '_layer': '') ));
        }
    }
}
