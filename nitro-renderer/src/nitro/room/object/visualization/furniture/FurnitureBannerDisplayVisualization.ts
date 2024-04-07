import { RoomObjectVariable } from '../../../../../api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureBannerDisplayVisualization extends FurnitureAnimatedVisualization
{
    private static BANNER: string = 'BANNER';

    private _bannerId: string;
    private _bannerAssetNameNormalScale: string;
    private _bannerAssetNameSmallScale: string;
    private _bannerVisibleInState: number;

    constructor()
    {
        super();

        this._bannerId = '';
        this._bannerAssetNameNormalScale = '';
        this._bannerAssetNameSmallScale = '';
        this._bannerVisibleInState = -1;
    }

    protected updateModel(scale: number): boolean
    {
        let updateModel = super.updateModel(scale);

        const bannerStatus = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BANNER_IMAGE_STATUS);
        const bannerId = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BANNER_ASSET_NAME);

        if(bannerStatus === -1)
        {
            this._bannerAssetNameNormalScale = '';
            this._bannerAssetNameSmallScale = '';
        }

        else if((bannerStatus === 1) && (bannerId !== this._bannerId))
        {
            this._bannerId = bannerId;
            this._bannerAssetNameNormalScale = this._bannerId;

            if(this._bannerAssetNameSmallScale === '') this._bannerAssetNameSmallScale = this._bannerAssetNameNormalScale + '_32';

            const visibleInState = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BANNER_VISIBLE_IN_STATE);

            if(!isNaN(visibleInState)) this._bannerVisibleInState = visibleInState;

            updateModel = true;
        }

        return updateModel;
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this.direction, layerId);

        if((tag !== FurnitureBannerDisplayVisualization.BANNER) || ((this._bannerVisibleInState !== -1) && (this.object.getState(0) !== this._bannerVisibleInState))) return super.getSpriteAssetName(scale, layerId);

        if(scale === 32) return this._bannerAssetNameSmallScale;

        return this._bannerAssetNameNormalScale;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        let offset = super.getLayerXOffset(scale, direction, layerId);

        if(this.getLayerTag(scale, direction, layerId) === FurnitureBannerDisplayVisualization.BANNER)
        {
            const asset = this.getAsset(((scale === 32) ? this._bannerAssetNameSmallScale : this._bannerAssetNameNormalScale), layerId);

            if(asset)
            {
                if(scale === 64) offset += ((40 - asset.width) / 2);
                else offset += ((20 - asset.width) / 2);
            }
        }

        return offset;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        let offset = super.getLayerYOffset(scale, direction, layerId);

        if(this.getLayerTag(scale, direction, layerId) === FurnitureBannerDisplayVisualization.BANNER)
        {
            const asset = this.getAsset(((scale === 32) ? this._bannerAssetNameSmallScale : this._bannerAssetNameNormalScale), layerId);

            if(asset)
            {
                if(scale === 64) offset += ((40 - asset.height) / 2);
                else offset += ((20 - asset.height) / 2);
            }
        }

        return offset;
    }
}
