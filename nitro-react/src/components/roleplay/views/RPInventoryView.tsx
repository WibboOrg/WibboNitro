import { IRoleplayItem, RpUseItemComposer } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo, useState } from 'react';
import { BbCode, GetConfiguration, SendMessageComposer } from '../../../api';
import { AutoGrid, Button, Column, Flex, Grid, LayoutGridItem, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView, Text } from '../../../common';
import { useRoleplayContext } from '../RoleplayContext';

interface ITab {
    id: number,
    name: string
}

const TABS: ITab[] = [ { id: -1, name: 'Tous' }, { id: 0, name: 'Équipement' }, { id: 1, name: 'Objets utilisables' }, { id: 2, name: 'Ressources' }, { id: 3, name: 'Objets de quête' } ];
export const RPInventoryView: FC<{}> = props =>
{
    const { inventoryIsOpen, setInventoryIsOpen, inventoryItems } = useRoleplayContext();
    const [ currentTab, setCurrentTab ] = useState<number>(TABS[0].id);
    const [ itemCount, setItemCount ] = useState<number>(1);
    const [ selectedItem, setSelectedItem ] = useState<IRoleplayItem>(null);

    const close = useCallback(() => setInventoryIsOpen(false), [ setInventoryIsOpen ]);
    
    const updateItemCount = useCallback((item: IRoleplayItem, count: number) =>
    {
        if (count <= 0 || count > 99 || !count) return;

        if(count > item.count) return;

        setItemCount(count);
    }, [ setItemCount ]);

    const filteredItems = useMemo(() =>
    {
        return inventoryItems.filter(x => x.category == currentTab || currentTab == -1);
    }, [ inventoryItems, currentTab ]);
    
    const utilizeItem = useCallback((item: IRoleplayItem) =>
    {
        if (!item) return;
        
        SendMessageComposer(new RpUseItemComposer(item.id, itemCount));
    }, [ itemCount ]);

    if (!inventoryIsOpen) return null;
    
    return (
        <NitroCardView uniqueKey="rp-inventory" className="rp-inventory">
            <NitroCardHeaderView headerText={ 'Ton inventaire rôleplay' } onCloseClick={ () => close() } />
            <NitroCardTabsView>
                { TABS.map((tab, index) =>
                {
                    return (
                        <NitroCardTabsItemView key={ index } isActive={ (currentTab === tab.id) } onClick={ event => setCurrentTab(tab.id) }>
                            { tab.name }
                        </NitroCardTabsItemView>
                    );
                }) }
            </NitroCardTabsView>
            <NitroCardContentView>
                { filteredItems && (filteredItems.length > 0) &&<Grid>
                    <Column size={ 7 } overflow="hidden">
                        <AutoGrid columnCount={ 4 }>
                            { filteredItems.map((item, index) =>
                            {
                                return <LayoutGridItem itemCount={ item.count } key={ item.id } itemActive={ (selectedItem?.id === item.id) } onMouseDown={ event => setSelectedItem(item) } >
                                    <img src={ GetConfiguration<string>('item.rp.images.url').replace('%image%', item.name) } />
                                </LayoutGridItem>
                            }) }
                        </AutoGrid>
                    </Column>
                    { selectedItem && <Column className="justify-content-between" size={ 5 } overflow="auto">
                        <Column overflow="hidden" gap={ 2 }>
                            <Text>Objets restants: { selectedItem.count }</Text>
                        </Column>
                        { selectedItem.usetype == 2 && <Column overflow="hidden" gap={ 2 }>
                            <Flex>
                                <Text>Quantité à utiliser:</Text>
                                <input type="number" className="form-control form-control-sm" value={ itemCount } min={ 1 } max={ selectedItem.count } onChange={ event => updateItemCount(selectedItem, event.target.valueAsNumber) } />
                            </Flex>
                        </Column> }
                        <Column grow justifyContent="end" gap={ 2 }>
                            <Flex gap={ 2 } alignItems="center">
                                <img src={ GetConfiguration<string>('item.rp.images.url').replace('%image%', selectedItem.name) } />
                                <Flex column className="text-black" dangerouslySetInnerHTML={ { __html: BbCode(selectedItem.desc) } }></Flex>
                            </Flex>
                            <Button variant={ selectedItem.usetype == 0 ? 'danger' : 'success' } disabled={ selectedItem.usetype == 0 } onClick={ event => utilizeItem(selectedItem) }>Utiliser</Button>
                        </Column> 
                    </Column> }
                </Grid>
                }
                { !filteredItems || (filteredItems.length <= 0) && <Grid>
                    <Column center size={ 5 } overflow="hidden">
                        <div className="empty-image" />
                    </Column>
                    <Column justifyContent="center" size={ 7 } overflow="hidden">
                        <Text fontWeight="bold" fontSize={ 5 } overflow="unset" truncate>Cet espace est vide!</Text>
                        <Text overflow="auto">Vous n&apos;avais aucun objet disponible dans cette catégorie</Text>
                    </Column>
                </Grid>
                }
            </NitroCardContentView>
        </NitroCardView>
    );
}
