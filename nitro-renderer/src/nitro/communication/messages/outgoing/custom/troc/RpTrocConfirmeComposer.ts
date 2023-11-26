import { IMessageComposer } from '../../../../../../api';

export class RpTrocConfirmeComposer implements IMessageComposer<ConstructorParameters<typeof RpTrocConfirmeComposer>>
{
    private _data: ConstructorParameters<typeof RpTrocConfirmeComposer>;

    constructor()
    {
        this._data = [];
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
