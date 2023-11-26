import { IMessageComposer } from '../../../../../../api';

export class RpTrocAddItemComposer implements IMessageComposer<ConstructorParameters<typeof RpTrocAddItemComposer>>
{
    private _data: ConstructorParameters<typeof RpTrocAddItemComposer>;

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
