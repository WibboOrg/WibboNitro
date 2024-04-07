import { Resource, Texture } from '@pixi/core';
import { NitroEvent } from '../core';

export class BannerImageReadyEvent extends NitroEvent
{
    public static IMAGE_READY: string = 'BIME_BANNER_IMAGE_READY';

    private _bannerId: string;
    private _image: Texture<Resource>;

    constructor(bannerId: string, image: Texture<Resource>)
    {
        super(BannerImageReadyEvent.IMAGE_READY);

        this._bannerId = bannerId;
        this._image = image;
    }

    public get bannerId(): string
    {
        return this._bannerId;
    }

    public get image(): Texture<Resource>
    {
        return this._image;
    }
}
