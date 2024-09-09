import { EconomyCenterEvent, IEconomyItem, ILinkEventTracker, NumberDataType, RoomPreviewer, StringDataType, Vector3d } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, GetRoomEngine, LocalizeBadgeName, LocalizeFormattedNumber, LocalizeText, RemoveLinkEventTracker } from '../../api';
import { AutoGrid, Base, Column, Flex, Grid, LayoutCurrencyIcon, LayoutGridItem, LayoutImage, LayoutRarityLevelView, LayoutRoomPreviewerView, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView, Text, TransitionSwitch } from '../../common';
import { useMessageEvent } from '../../hooks';
import { EconomyCenterSearchView } from './view/EconomyCenterSearchView';

export interface IItemList
{
    id: number;
    localizedName: string;
    iconUrl: string;
    item: IEconomyItem;
}

const CURRENCY_TYPE = 105

export const EconomyCenterView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ itemList, setItemList ] = useState<IItemList[]>([]);
    const [ filteredItemList, setFilteredItemList ] = useState<IItemList[]>([]);
    const [ selectedItem, setSelectedItem ] = useState<IItemList>(null);
    const [ selectedCategory, setSelectedCategory ] = useState<number>(0);
    const [ roomPreviewer, setRoomPreviewer ] = useState<RoomPreviewer>(null);

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');
            
                if(parts.length < 2) return;
            
                switch(parts[1])
                {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                    case 'open':
                        setIsVisible(true);
            
                        return;
                }
            },
            eventUrlPrefix: 'economy-center/'
        };
    
        AddEventLinkTracker(linkTracker);
    
        return () => RemoveLinkEventTracker(linkTracker);
    }, [ setIsVisible ]);

    useEffect(() =>
    {
        setRoomPreviewer(new RoomPreviewer(GetRoomEngine(), ++RoomPreviewer.PREVIEW_COUNTER));

        return () =>
        {
            setRoomPreviewer(prevValue =>
            {
                prevValue.dispose();

                return null;
            });
        }
    }, []);

    useEffect(() =>
    {
        if(!selectedItem || !roomPreviewer) return;
    
        const furnitureItem = selectedItem.item;
    
        if(!furnitureItem) return;
    
        roomPreviewer.reset(false);
        
        roomPreviewer.addFurnitureIntoRoom(furnitureItem.itemId, new Vector3d(90), furnitureItem.stuffData, '');
    }, [ roomPreviewer, selectedItem ]);
    
    
    const close = () => setIsVisible(false);

    useMessageEvent<EconomyCenterEvent>(EconomyCenterEvent, event =>
    {
        const parser = event.getParser();

        setCategories(parser.categoriesName)
        
        setItemList(prevValue =>
        {
            const newValue: IItemList[] = []

            for (const item of parser.items)
            {
                let localizedName = LocalizeText('roomItem.name.' + item.itemId)

                if (item.categoryId === 2)
                {
                    const stuffData = item.stuffData as StringDataType
                    localizedName = LocalizeBadgeName(stuffData.getValue(0))
                }
                else if (item.categoryId === 3)
                {
                    const stuffData = item.stuffData as NumberDataType
                    localizedName = 'Bannière ' + stuffData.getValue(0);
                }

                const iconUrl = GetRoomEngine().getFurnitureFloorIconUrl(item.itemId);
                newValue.push({ id: item.itemId, localizedName, iconUrl, item })
            }
            
            return newValue
        })
    });

    useEffect(() =>
    {
        const itemByCategoryId = filteredItemList
        setSelectedItem(itemByCategoryId.length ? itemByCategoryId[0] : null);
    }, [ selectedCategory, itemList, filteredItemList ])
    
    if(!isVisible || !itemList.length) return null;

    return (
        <NitroCardView uniqueKey="economy-center" className="nitro-economy-center">
            <NitroCardHeaderView headerText={ 'Économie Center' } onCloseClick={ close } />
            <NitroCardTabsView>
                { categories.map((category, index) => <NitroCardTabsItemView key={ index } isActive={ selectedCategory === index } onClick={ event => setSelectedCategory(index) }>{ category }</NitroCardTabsItemView>) }
            </NitroCardTabsView>
            <NitroCardContentView grow gap={ 0 }>
                <Grid>
                    <Column size={ 6 } overflow="hidden">
                        <EconomyCenterSearchView categoryId={ selectedCategory } itemList={ itemList } setItemList={ setFilteredItemList } />
                        <Column fullHeight className="nitro-economy-center-navigation-grid-container rounded p-1" overflow="hidden">
                            <AutoGrid id="nitro-economy-center-main-navigation" gap={ 1 } columnCount={ 1 }>
                                { filteredItemList && (filteredItemList.length > 0) && filteredItemList.map((item, index) =>
                                {
                                    return <Base className="nitro-economy-center-navigation-section" key={ index }>
                                        <LayoutGridItem gap={ 1 } column={ false } itemActive={ item === selectedItem } onClick={ event => setSelectedItem(item) }>
                                            <LayoutImage imageUrl={ item.iconUrl } style={ { width: 30, height: 30 } } />
                                            <Text grow truncate>{ item.localizedName }</Text>
                                        </LayoutGridItem>
                                    </Base>;
                                }) }
                            </AutoGrid>
                        </Column>
                    </Column>
                    <Column size={ 6 } overflow="hidden">
                        { selectedItem && <TransitionSwitch innerKey={ selectedCategory + '-' + selectedItem.id } type="fade" direction="up">
                            <Column gap={ 2 }>
                                <Text grow truncate bold center>{ selectedItem.localizedName }</Text>
                                <Base position="relative" fullWidth>
                                    <LayoutRoomPreviewerView roomPreviewer={ roomPreviewer } height={ 240 } />
                                    { selectedItem.item.stuffData.rarityLevel > -1 && <div className="position-absolute end-1 top-1">
                                        <LayoutRarityLevelView level={ selectedItem.item.stuffData.rarityLevel } />
                                    </div> }
                                    <div className="position-absolute end-1 bottom-1">
                                        <Flex fullWidth gap={ 1 } className="nitro-economy-center-info-container">
                                            <Text variant="white" bold>{ LocalizeFormattedNumber(selectedItem.item.averagePrice) }</Text>
                                            <LayoutCurrencyIcon type={ CURRENCY_TYPE } />
                                        </Flex>
                                    </div>
                                    { selectedItem.item.stuffData.amount > -1 && <div className="position-absolute start-1 bottom-1">
                                        <Flex fullWidth gap={ 1 } className="nitro-economy-center-info-container">
                                            <Text variant="white" grow truncate bold>Quantité:</Text>
                                            <Text variant="white" grow truncate>{ selectedItem.item.stuffData.amount }</Text>
                                        </Flex>
                                    </div> }
                                </Base>
                            </Column>
                        </TransitionSwitch> }
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
