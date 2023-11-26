import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { IRoleplayItem } from './IRoleplayItem';

export class BuyItemsListParser implements IMessageParser
{
    items: IRoleplayItem[];

    public flush(): boolean
    {
        this.items = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const totalItems = wrapper.readInt();

        for(let i = 0; i < totalItems; i++)
        {
            const id = wrapper.readInt();
            const name = wrapper.readString();
            const desc = wrapper.readString();
            const price = wrapper.readInt();

            this.items.push({ 'id': id, 'name': name, 'desc': desc, 'price': price, 'count': 1 });
        }

        return true;
    }
}
