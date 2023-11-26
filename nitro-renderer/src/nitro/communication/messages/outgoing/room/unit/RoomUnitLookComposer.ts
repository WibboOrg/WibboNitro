import { IMessageComposer } from '../../../../../../api';

export class RoomUnitLookComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitLookComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitLookComposer>;

    constructor(x: number, y: number, userId: number)
    {
        this._data = [x, y, userId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
