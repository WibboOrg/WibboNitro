import { EconomyCenterEvent, IEconomyCategory, IEconomyItem, IEconomySubCategory, ILinkEventTracker, NumberDataType, RoomPreviewer, StringDataType, Vector3d } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, GetRoomEngine, LocalizeBadgeName, LocalizeFormattedNumber, LocalizeText, RemoveLinkEventTracker } from '../../api';
import { AutoGrid, Base, Column, Flex, Grid, LayoutCurrencyIcon, LayoutGridItem, LayoutImage, LayoutRarityLevelView, LayoutRoomPreviewerView, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView, Text, TransitionSwitch } from '../../common';
import { useMessageEvent } from '../../hooks';
import { CatalogIconView } from '../catalog/views/catalog-icon/CatalogIconView';
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
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<IEconomyCategory[]>([]);
    const [ itemList, setItemList ] = useState<IItemList[]>([]);
    const [ filteredItemList, setFilteredItemList ] = useState<IItemList[]>([]);
    const [ selectedItem, setSelectedItem ] = useState<IItemList>(null);
    const [ selectedCategory, setSelectedCategory ] = useState<IEconomyCategory>(null);
    const [ selectedSubCategory, setSelectedSubCategory ] = useState<IEconomySubCategory>(null);
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
        roomPreviewer.updateRoomWallsAndFloorVisibility(false, true);
        
        roomPreviewer.addFurnitureIntoRoom(furnitureItem.itemId, new Vector3d(90), furnitureItem.stuffData, '');
    }, [ roomPreviewer, selectedItem ]);
    
    const close = () => setIsVisible(false);

    useMessageEvent<EconomyCenterEvent>(EconomyCenterEvent, event =>
    {
        const parser = event.getParser();

        setCategories(parser.categories)
        setSelectedCategory(parser.categories[0])
        
        setItemList(prevValue =>
        {
            const newValue: IItemList[] = []

            for (const item of parser.items)
            {
                let localizedName = LocalizeText('roomItem.name.' + item.itemId)

                if (item.type === 1)
                {
                    const stuffData = item.stuffData as StringDataType
                    localizedName = LocalizeBadgeName(stuffData.getValue(0))
                }
                else if (item.type === 2)
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
    
    const selectedTabCategory = (category: IEconomyCategory) =>
    {
        setSelectedCategory(category)
        setSelectedSubCategory(null)
        setSelectedItem(null);
    }
    
    if(!isVisible || !itemList.length) return null;

    return (
        <NitroCardView uniqueKey="economy-center" className="nitro-economy-center">
            <NitroCardHeaderView headerText={ 'Économie Center' } onCloseClick={ close } />
            <NitroCardTabsView>
                { categories.map((category, index) => <NitroCardTabsItemView key={ category.id } isActive={ selectedCategory === category } onClick={ event => selectedTabCategory(category) }>{ category.categoryName }</NitroCardTabsItemView>) }
            </NitroCardTabsView>
            <NitroCardContentView grow gap={ 0 }>
                <Grid>
                    <Column size={ 4 } overflow="hidden">
                        <EconomyCenterSearchView categoryId={ selectedSubCategory ? selectedSubCategory.subId : 0 } itemList={ itemList } setItemList={ setFilteredItemList } />
                        <Column fullHeight className="nitro-economy-center-navigation-grid-container rounded p-1" overflow="hidden">
                            <TransitionSwitch type="fade" innerKey={ (selectedCategory?.id || -1) + '_' + (selectedSubCategory?.subId || -1) }>
                                <AutoGrid id="nitro-economy-center-main-navigation" gap={ 1 } columnCount={ 1 }>
                                    { filteredItemList.length === 0 && !selectedSubCategory && selectedCategory && categories && (categories.length > 0) && categories.find(x => x.id === selectedCategory.id).subCategories.map((subCategory, index) =>
                                    {
                                        return <Base className="nitro-economy-center-navigation-section" key={ index }>
                                            <LayoutGridItem gap={ 1 } column={ false } onClick={ event => setSelectedSubCategory(subCategory) }>
                                                <CatalogIconView icon={ subCategory.iconId } />
                                                <Text grow truncate>{ subCategory.subName }</Text>
                                            </LayoutGridItem>
                                        </Base>;
                                    }) }
                                    { selectedSubCategory && <Base className="nitro-economy-center-navigation-section">
                                        <LayoutGridItem gap={ 1 } column={ false } onClick={ event => setSelectedSubCategory(null) } itemActive={ true }>
                                            <CatalogIconView icon={ selectedSubCategory.iconId } />
                                            <Text grow truncate>{ selectedSubCategory.subName }</Text>
                                        </LayoutGridItem>
                                    </Base> }
                                    { filteredItemList && (filteredItemList.length > 0) && filteredItemList.map((item, index) =>
                                    {
                                        return <Base className="nitro-economy-center-navigation-section ms-1" key={ index }>
                                            <LayoutGridItem gap={ 1 } column={ false } itemActive={ item === selectedItem } onClick={ event => setSelectedItem(item) }>
                                                <LayoutImage imageUrl={ item.iconUrl } style={ { width: 25, height: 25 } } />
                                                <Text grow truncate>{ item.localizedName }</Text>
                                            </LayoutGridItem>
                                        </Base>;
                                    }) }
                                </AutoGrid>
                            </TransitionSwitch>
                        </Column>
                    </Column>
                    <Column size={ 8 } overflow="hidden" justifyContent="center" alignItems="center">
                        { selectedItem && selectedCategory && <TransitionSwitch innerKey={ selectedCategory.id + '-' + selectedItem.id } type="fade" direction="up">
                            <Column gap={ 2 } fullWidth>
                                <Text grow truncate bold center>{ selectedItem.localizedName }</Text>
                                <Base position="relative" fullWidth>
                                    <LayoutRoomPreviewerView roomPreviewer={ roomPreviewer } height={ 340 } />
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
                                            <Text variant="white" grow truncate bold>{ LocalizeText('furni.amount', [ 'amount' ], [ selectedItem.item.stuffData.amount.toString() ]) }</Text>
                                        </Flex>
                                    </div> }
                                </Base>
                            </Column>
                        </TransitionSwitch> }
                        { !selectedItem && <Base className="nitro-economy-center-image"></Base> }
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
