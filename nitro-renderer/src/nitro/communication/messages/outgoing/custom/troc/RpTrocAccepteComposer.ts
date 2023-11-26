import { IMessageComposer } from '../../../../../../api';

export class RpTrocAccepteComposer implements IMessageComposer<ConstructorParameters<typeof RpTrocAccepteComposer>>
{
    private _data: ConstructorParameters<typeof RpTrocAccepteComposer>;

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
