import { IMessageComposer } from '../../../../../../api';

export class UserBannerSelectComposer implements IMessageComposer<ConstructorParameters<typeof UserBannerSelectComposer>>
{
    private _data: ConstructorParameters<typeof UserBannerSelectComposer>;

    constructor(bannerId: number)
    {
        this._data = [bannerId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
