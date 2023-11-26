import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LocalizeBadgeName, LocalizeText } from '../../../../api';
import { Button, Flex } from '../../../../common';

export interface InventoryBadgeSearchViewProps
{
    badgeCodes: string[];
    setBadgeCodes: Dispatch<SetStateAction<string[]>>;
}

export const InventoryBadgeSearchView: FC<InventoryBadgeSearchViewProps> = props =>
{
    const { badgeCodes = [], setBadgeCodes = null } = props;
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() =>
    {
        let filteredGroupItems = [ ...badgeCodes ];

        if(searchValue && searchValue.length)
        {
            const comparison = searchValue.toLocaleLowerCase();

            filteredGroupItems = badgeCodes.filter(badge =>
            {
                if(comparison && comparison.length)
                {
                    if(LocalizeBadgeName(badge).toLocaleLowerCase().includes(comparison) || badge.includes(comparison)) return badge;
                }

                return null;
            });
        }

        setBadgeCodes(filteredGroupItems);
    }, [ badgeCodes, setBadgeCodes, searchValue ]);

    return (
        <Flex gap={ 1 }>
            <input type="text" className="form-control form-control-sm" placeholder={ LocalizeText('generic.search') } value={ searchValue } onChange={ event => setSearchValue(event.target.value) } />
            <Button variant="primary">
                <FaSearch className="fa-icon w-12 h-12" />
            </Button>
        </Flex>
    );
}
