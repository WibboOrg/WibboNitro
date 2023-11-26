import { IMessageComposer } from '../../../../../../api';

export class MoveAvatarKeyboardComposer implements IMessageComposer<ConstructorParameters<typeof MoveAvatarKeyboardComposer>>
{
    private _data: ConstructorParameters<typeof MoveAvatarKeyboardComposer>;

    constructor(x: number, y: number)
    {
        this._data = [x, y];
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
