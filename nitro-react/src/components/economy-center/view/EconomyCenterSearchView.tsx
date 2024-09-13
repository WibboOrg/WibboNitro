import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { LocalizeText } from '../../../api';
import { Button, Flex } from '../../../common';
import { IItemList } from '../EconomyCenterView';

export interface EconomyCenterSearchViewProps
{
    categoryId: number;
    itemList: IItemList[];
    setItemList: Dispatch<SetStateAction<IItemList[]>>;
}

export const EconomyCenterSearchView: FC<EconomyCenterSearchViewProps> = props =>
{
    const { categoryId, itemList = [], setItemList = null } = props;
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() =>
    {
        const itemListByCategory = categoryId === 0 ? itemList : itemList.filter(x => x.item.categoryId === categoryId)
        let filteredGroupItems = categoryId === 0 ? [] : [ ...itemListByCategory ];

        if(searchValue && searchValue.length)
        {
            const comparison = searchValue.toLocaleLowerCase();

            filteredGroupItems = itemListByCategory.filter(item =>
            {
                if(comparison && comparison.length)
                {
                    const itemName = item.localizedName
                    if(itemName.toLocaleLowerCase().includes(comparison) || itemName.includes(comparison)) return item;
                }

                return null;
            });
        }

        setItemList(filteredGroupItems);
    }, [ itemList, setItemList, searchValue, categoryId ]);

    return (
        <Flex gap={ 1 }>
            <input type="text" className="form-control form-control-sm" placeholder={ LocalizeText('generic.search') } value={ searchValue } onChange={ event => setSearchValue(event.target.value) } />
            { (!searchValue || !searchValue.length) &&
                <Button variant="primary" className="catalog-search-button">
                    <FaSearch className="fa-icon" />
                </Button> }
            { searchValue && !!searchValue.length &&
                <Button variant="danger" className="catalog-search-button" onClick={ event => setSearchValue('') }>
                    <FaTimes className="fa-icon" />
                </Button> }
        </Flex>
    );
}
