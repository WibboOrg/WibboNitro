import { IMessageComposer } from '../../../../../../api';

export class DeleteBadgeInventoryComposer implements IMessageComposer<ConstructorParameters<typeof DeleteBadgeInventoryComposer>>
{
    private _data: ConstructorParameters<typeof DeleteBadgeInventoryComposer>;

    constructor(badgeCode: string)
    {
        this._data = [ badgeCode ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
