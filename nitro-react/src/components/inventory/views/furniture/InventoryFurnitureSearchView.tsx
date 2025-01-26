import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { GroupItem, LocalizeText } from '../../../../api';
import { Button, Flex } from '../../../../common';
import { useLocalStorage } from '../../../../hooks';

export interface InventoryFurnitureSearchViewProps
{
    groupItems: GroupItem[];
    setGroupItems: Dispatch<SetStateAction<GroupItem[]>>;
}

export const InventoryFurnitureSearchView: FC<InventoryFurnitureSearchViewProps> = props =>
{
    const { groupItems = [], setGroupItems = null } = props;
    const [ searchValue, setSearchValue ] = useLocalStorage('inventoryFurnitureSearchValue', '');
    const [ searchByType, setSearchByType ] = useLocalStorage('inventoryFurnitureSearchType', 'all');

    useEffect(() =>
    {
        let filteredGroupItems = [ ...groupItems ];

        if(searchValue && searchValue.length || searchByType !== 'all')
        {
            const comparison = searchValue.toLocaleLowerCase();

            filteredGroupItems = groupItems.filter(item =>
            {
                switch(searchByType)
                {
                    case 'wall': if(!item.isWallItem) return null; break;
                    case 'floor': if(item.isWallItem) return null; break;
                    case 'rare': if(!item.isSellable) return null; break;
                }

                if(comparison && comparison.length)
                {
                    if(!item.name.toLocaleLowerCase().includes(comparison)) return null;
                }

                return item;
            });
        }

        setGroupItems(filteredGroupItems);
    }, [ groupItems, setGroupItems, searchValue, searchByType ]);

    return (
        <Flex gap={ 2 }>
            <select className="form-select form-select-sm" value={ searchByType } onChange={ event => setSearchByType(event.target.value) } style={{ width: 'fit-content' }}>
                <option value="all">{ LocalizeText('inventory.filter.placement.any') }</option>
                <option value="wall">{ LocalizeText('inventory.filter.placement.wall') }</option>
                <option value="floor">{ LocalizeText('inventory.filter.placement.floor') }</option>
                <option value="rare">{ LocalizeText('inventory.filter.placement.rare') }</option>
            </select>

            <Flex gap={ 1 } fullWidth>
                <input type="text" className="form-control form-control-sm" placeholder={ LocalizeText('generic.search') } value={ searchValue } onChange={ event => setSearchValue(event.target.value) } />
                { (!searchValue || !searchValue.length) &&
                <Button variant="primary" className="catalog-search-button" onClick={ event => setSearchValue('') }>
                    <FaSearch className="fa-icon" />
                </Button> }
                { searchValue && !!searchValue.length &&
                <Button variant="danger" className="catalog-search-button" onClick={ event => setSearchValue('') }>
                    <FaTimes className="fa-icon" />
                </Button> }
            </Flex>
        </Flex>
    );
}
