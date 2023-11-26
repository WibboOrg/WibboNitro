import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserBannerListParser implements IMessageParser
{
    private _bannerList: { id: number, haveLayer: boolean }[];

    public flush(): boolean
    {
        this._bannerList = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalBanner = wrapper.readInt();

        while(totalBanner > 0)
        {
            const id = wrapper.readInt();
            const haveLayer = wrapper.readBoolean();

            this._bannerList.push({ id, haveLayer });

            totalBanner--;
        }

        return true;
    }

    public get bannerList()
    {
        return this._bannerList;
    }
}
