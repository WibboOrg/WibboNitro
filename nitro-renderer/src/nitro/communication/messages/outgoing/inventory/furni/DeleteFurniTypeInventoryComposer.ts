import { IMessageComposer } from '../../../../../../api';

export class DeleteFurniTypeInventoryComposer implements IMessageComposer<ConstructorParameters<typeof DeleteFurniTypeInventoryComposer>>
{
    private _data: ConstructorParameters<typeof DeleteFurniTypeInventoryComposer>;

    constructor(itemId: number)
    {
        this._data = [ itemId ];
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
