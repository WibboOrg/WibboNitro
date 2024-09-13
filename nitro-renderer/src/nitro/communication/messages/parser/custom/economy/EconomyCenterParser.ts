import { IMessageDataWrapper, IMessageParser, IObjectData } from '../../../../../../api';
import { FurnitureDataParser } from '../../room';

export class EconomyCenterParser implements IMessageParser
{
    items: IEconomyItem[];
    categories: IEconomyCategory[];

    public flush(): boolean
    {
        this.items = [];
        this.categories = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const totalCategorys = wrapper.readInt();

        for(let i = 0; i < totalCategorys; i++)
        {
            const id = wrapper.readInt();
            const categoryName = wrapper.readString();

            const totalSubCategories = wrapper.readInt();

            const subCategories = [];
            for(let j = 0; j < totalSubCategories; j++)
            {
                const subId = wrapper.readInt();
                const iconId = wrapper.readInt();
                const subName = wrapper.readString();

                subCategories.push({ subId, iconId, subName });
            }

            this.categories.push({ id, categoryName, subCategories });
        }

        const totalItems = wrapper.readInt();

        for(let i = 0; i < totalItems; i++)
        {
            const id = wrapper.readInt();

            if(id === -1) continue;

            const categoryId = wrapper.readInt();
            const averagePrice = wrapper.readInt();
            const itemId = wrapper.readInt();
            const type = wrapper.readInt();
            const stuffData = FurnitureDataParser.parseObjectData(wrapper);

            this.items.push({ id, categoryId, averagePrice, type, itemId, stuffData });
        }

        return true;
    }
}

export interface IEconomySubCategory
{
    subId: number,
    subName: string,
    iconId: number
}

export interface IEconomyCategory
{
    id: number,
    categoryName: string,
    subCategories: IEconomySubCategory[],
}

export interface IEconomyItem
{
    id: number,
    categoryId: number,
    type: number,
    averagePrice: number,
    itemId: number,
    stuffData: IObjectData,
}
