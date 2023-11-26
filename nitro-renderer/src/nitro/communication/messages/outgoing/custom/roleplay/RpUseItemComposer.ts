import { IMessageComposer } from '../../../../../../api';

export class RpUseItemComposer implements IMessageComposer<ConstructorParameters<typeof RpUseItemComposer>>
{
    private _data: ConstructorParameters<typeof RpUseItemComposer>;

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
