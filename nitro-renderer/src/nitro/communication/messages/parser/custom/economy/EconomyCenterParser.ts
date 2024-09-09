import { IMessageDataWrapper, IMessageParser, IObjectData } from '../../../../../../api';
import { FurnitureDataParser } from '../../room';

export class EconomyCenterParser implements IMessageParser
{
    items: IEconomyItem[];
    categoriesName: string[];

    public flush(): boolean
    {
        this.items = [];
        this.categoriesName = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const totalCategorys = wrapper.readInt();

        for(let i = 0; i < totalCategorys; i++)
        {
            const categoryName = wrapper.readString();

            this.categoriesName.push(categoryName);
        }

        const totalItems = wrapper.readInt();

        for(let i = 0; i < totalItems; i++)
        {
            const id = wrapper.readInt();

            if(id === -1) continue;

            const categoryId = wrapper.readInt();
            const averagePrice = wrapper.readInt();
            const itemId = wrapper.readInt();
            const stuffData = FurnitureDataParser.parseObjectData(wrapper);

            this.items.push({ id, categoryId, averagePrice, itemId, stuffData });
        }

        return true;
    }
}

export interface IEconomyItem
{
    id: number,
    categoryId: number,
    averagePrice: number,
    itemId: number,
    stuffData: IObjectData,
}
