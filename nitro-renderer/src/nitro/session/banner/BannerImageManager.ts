import { Resource, Texture } from '@pixi/core';
import { IAssetManager, IDisposable, NitroConfiguration } from '../../../api';
import { BannerImageReadyEvent } from '../../../events';
import { SessionDataManager } from './../SessionDataManager';

export class BannerImageManager implements IDisposable
{
    private _assets: IAssetManager;
    private _sessionDataManager: SessionDataManager;

    private _requestedBanners: Map<string, boolean>;

    constructor(assetManager: IAssetManager, sessionDataManager: SessionDataManager)
    {
        this._assets = assetManager;
        this._sessionDataManager = sessionDataManager;

        this._requestedBanners = new Map();
    }

    public init(): void
    {
    }

    public dispose(): void
    {
        this._sessionDataManager = null;
    }

    public getBannerImage(bannerName: string, load: boolean = true): Texture<Resource>
    {
        let banner = this.getBannerTexture(bannerName);

        if(!banner && load) banner = this.getBannerPlaceholder();

        return banner;
    }

    public loadBannerImage(bannerName: string): string
    {
        if(this._assets.getTexture(this.getBannerUrl(bannerName))) return bannerName;

        this.getBannerTexture(bannerName);

        return null;
    }

    private getBannerTexture(bannerName: string): Texture<Resource>
    {
        const url = this.getBannerUrl(bannerName);

        if(!url || !url.length) return null;

        const existing = this._assets.getTexture(url);

        if(existing) return existing.clone();

        if(this._requestedBanners.get(bannerName)) return null;

        this._requestedBanners.set(bannerName, true);

        this._assets
            .downloadAsset(url)
            .then(status =>
            {
                if(!status) return;

                this._requestedBanners.delete(bannerName);

                const texture = this._assets.getTexture(url);

                if(texture && this._sessionDataManager) this._sessionDataManager.events.dispatchEvent(new BannerImageReadyEvent(bannerName, texture.clone()));
            })
            .catch(err =>
            {

            });

        return null;
    }

    private getBannerPlaceholder(): Texture<Resource>
    {
        const url = (NitroConfiguration.getValue<string>('images.url') + '/loading_icon.png');
        const existing = this._assets.getTexture(url);

        if(!existing) return null;

        return existing.clone();
    }

    public getBannerUrl(bannerId: string): string
    {
        return (NitroConfiguration.getValue<string>('banner.url')).replace('%id%', bannerId);
    }

    public get disposed(): boolean
    {
        return !!this._sessionDataManager;
    }
}
