import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { IRoleplayItem } from './IRoleplayItem';

export class AddInventoryItemRpParser implements IMessageParser
{
    item: IRoleplayItem;

    public flush(): boolean
    {
        this.item = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const Id = wrapper.readInt();
        const Name = wrapper.readString();
        const Desc = wrapper.readString();
        const Category = wrapper.readInt();
        const Count = wrapper.readInt();
        const UseType = wrapper.readInt();

        this.item = { id: Id, name: Name, desc: Desc, category: Category, count: Count, usetype: UseType };

        return true;
    }
}
