import { IMessageComposer } from '../../../../../../api';

export class RpTrocRemoveItemComposer implements IMessageComposer<ConstructorParameters<typeof RpTrocRemoveItemComposer>>
{
    private _data: ConstructorParameters<typeof RpTrocRemoveItemComposer>;

    constructor(itemId: number)
    {
        this._data = [ itemId ];
    }

    public dispose(): void
    {
        return;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
