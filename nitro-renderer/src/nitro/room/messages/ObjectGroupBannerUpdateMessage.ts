import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectGroupBannerUpdateMessage extends RoomObjectUpdateMessage
{
    public static BANNER_LOADED: string = 'ROGBUM_BANNER_LOADED';

    private _bannerId: string;
    private _assetName: string;

    constructor(bannerId: string, assetName: string)
    {
        super(null, null);

        this._bannerId = bannerId;
        this._assetName = assetName;
    }

    public get bannerId(): string
    {
        return this._bannerId;
    }

    public get assetName(): string
    {
        return this._assetName;
    }
}
