import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RemoveItemInventoryRpParser implements IMessageParser
{
    id: number;
    count: number;

    public flush(): boolean
    {
        this.id = 0;
        this.count = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.id = wrapper.readInt();
        this.count = wrapper.readInt();

        return true;
    }
}
