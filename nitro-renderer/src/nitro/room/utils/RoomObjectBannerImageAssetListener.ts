import { IRoomObjectController } from '../../../api';

export class RoomObjectBannerImageAssetListener
{
    private _object: IRoomObjectController;

    constructor(object: IRoomObjectController)
    {
        this._object = object;
    }

    public get object(): IRoomObjectController
    {
        return this._object;
    }
}
