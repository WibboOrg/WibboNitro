import { IMessageComposer } from '../../../../../../api';

export class BotChooseComposer implements IMessageComposer<ConstructorParameters<typeof BotChooseComposer>>
{
    private _data: ConstructorParameters<typeof BotChooseComposer>;

    constructor(code: string)
    {
        this._data = [code];
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
