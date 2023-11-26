import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserBannerParser implements IMessageParser
{
    private _userId: number;
    private _banner: { id: number; haveLayer: boolean };

    public flush(): boolean
    {
        this._userId = -1;
        this._banner = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();

        const id = wrapper.readInt();
        const haveLayer = wrapper.readBoolean();

        if(id !== -1) this._banner = { id, haveLayer };

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get banner(): { id: number; haveLayer: boolean }
    {
        return this._banner;
    }
}
