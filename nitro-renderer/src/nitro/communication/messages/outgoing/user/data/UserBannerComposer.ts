import { IMessageComposer } from '../../../../../../api';

export class UserBannerComposer implements IMessageComposer<ConstructorParameters<typeof UserBannerComposer>>
{
    private _data: ConstructorParameters<typeof UserBannerComposer>;

    constructor(webId: number, all: boolean = false)
    {
        this._data = [webId, all];
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
