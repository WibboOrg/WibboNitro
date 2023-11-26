import { IMessageComposer } from '../../../../../../api';

export class RpBuyItemsComposer implements IMessageComposer<ConstructorParameters<typeof RpBuyItemsComposer>>
{
    private _data: ConstructorParameters<typeof RpBuyItemsComposer>;

    constructor(itemId: number, count: number)
    {
        this._data = [ itemId, count ];
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
