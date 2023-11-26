import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { IRoleplayItem } from '../roleplay/IRoleplayItem';

export class RpTrocUpdateItemsParser implements IMessageParser
{
    userId: number;
    items: IRoleplayItem[];

    public flush(): boolean
    {
        this.userId = 0;
        this.items = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();
        const totalItems = wrapper.readInt();

        for(let i = 0; i < totalItems; i++)
        {
            const id = wrapper.readInt();
            const name = wrapper.readString();
            const desc = wrapper.readString();
            const countItem = wrapper.readInt();

            this.items.push({ 'id': id, 'name': name, 'desc': desc, 'count': countItem });
        }

        return true;
    }
}
