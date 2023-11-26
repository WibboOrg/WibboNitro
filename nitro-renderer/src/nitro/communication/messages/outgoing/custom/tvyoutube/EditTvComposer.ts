import { IMessageComposer } from '../../../../../../api';

export class EditTvComposer implements IMessageComposer<ConstructorParameters<typeof EditTvComposer>>
{
    private _data: ConstructorParameters<typeof EditTvComposer>;

    constructor(itemId: number, videoId: string)
    {
        this._data = [ itemId, videoId ];
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
