import { IMessageComposer } from '../../../../../../api';

export class ChatWhisperGroupComposer implements IMessageComposer<ConstructorParameters<typeof ChatWhisperGroupComposer>>
{
    private _data: ConstructorParameters<typeof ChatWhisperGroupComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
