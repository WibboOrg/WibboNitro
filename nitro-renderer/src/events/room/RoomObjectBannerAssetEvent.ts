import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectBannerAssetEvent extends RoomObjectEvent
{
    public static LOAD_BANNER: string = 'ROBAE_LOAD_BANNER';

    private _bannerId: string;

    constructor(k: string, _arg_2: IRoomObject, bannerId: string)
    {
        super(k, _arg_2);

        this._bannerId = bannerId;
    }

    public get bannerId(): string
    {
        return this._bannerId;
    }
}
