import { IMessageComposer } from '../../../../../../api';

export class RpTrocStopComposer implements IMessageComposer<ConstructorParameters<typeof RpTrocStopComposer>>
{
    private _data: ConstructorParameters<typeof RpTrocStopComposer>;

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
