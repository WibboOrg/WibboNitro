import { AddInventoryItemRpEvent, BuyItemsListEvent, LoadInventoryRpEvent, RemoveItemInventoryRpEvent, RpStatsEvent, RpTrocAccepteEvent, RpTrocConfirmeEvent, RpTrocStartEvent, RpTrocStopEvent, RpTrocUpdateItemsEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback } from 'react';
import { useMessageEvent } from '../../hooks';
import { useRoleplayContext } from './RoleplayContext';

export const RoleplayMessageHandler: FC<{}> = props =>
{
    const { stats, setStats, setInventoryItems, setBuyItems, setBuyItemsIsOpen, setInventoryIsOpen, trocTargetSettings, setTrocTargetSettings, trocSettings, setTrocSettings, trocMyItems, setTrocMyItems, trocTargetItems, setTrocTargetItems } = useRoleplayContext();
    
    const onBuyItemsListEvent = useCallback((event: BuyItemsListEvent) =>
    {
        const parser = event.getParser();

        setBuyItems(parser.items);
        setBuyItemsIsOpen(true);
    }, [ setBuyItems, setBuyItemsIsOpen ]);
        
    const onRpStatsEvent = useCallback((event: RpStatsEvent) =>
    {
        const parser = event.getParser();

        if (stats !== null) 
        {
            if (stats.id !== parser.stats.id)
            {
                setInventoryItems([]);
            }
        }

        setStats(parser.stats);
    }, [ setStats, stats, setInventoryItems ]);

    const onAddInventoryItemRpEvent = useCallback((event: AddInventoryItemRpEvent) =>
    {
        const parser = event.getParser();

        setInventoryItems((prevValue) =>
        {
            const item = prevValue.find((item) => item.id === parser.item.id);
            if (item === undefined)
                return [ ...prevValue, parser.item ];
            else
            {
                const count = item.count + parser.item.count;
                return prevValue.map(x => x.id === parser.item.id ? { ...x, count } : x);
            }
        });
        setInventoryIsOpen(true);
    }, [ setInventoryItems, setInventoryIsOpen ]);
    
    const onRemoveItemInventoryRpEvent = useCallback((event: RemoveItemInventoryRpEvent) =>
    {
        const parser = event.getParser();

        setInventoryItems((prevValue) =>
        {
            const item = prevValue.find((item) => item.id === parser.id);
            if (item === undefined)
                return prevValue;
            else
            {
                const count = item.count - parser.count;
                if(count >= 1) return prevValue.map(x => x.id === parser.id ? { ...x, count } : x);
                else return prevValue.filter(x => x.id !== parser.id);
            }
        });
    }, [ setInventoryItems ]);
    
    const onLoadInventoryRpEvent = useCallback((event: LoadInventoryRpEvent) => 
    {
        const parser = event.getParser();

        setInventoryItems(parser.items);
    }, [ setInventoryItems ]);
    
    const onRpTrocAccepteEvent = useCallback((event: RpTrocAccepteEvent) => 
    {
        const parser = event.getParser();

    }, [ ]);
    
    const onRpTrocConfirmeEvent = useCallback((event: RpTrocConfirmeEvent) => 
    {
        const parser = event.getParser();

    }, [ ]);
    
    const onRpTrocStartEvent = useCallback((event: RpTrocStartEvent) => 
    {
        const parser = event.getParser();

    }, [ ]);
    
    const onRpTrocStopEvent = useCallback((event: RpTrocStopEvent) => 
    {
        const parser = event.getParser();

    }, [ ]);
    
    const onRpTrocUpdateItemsEvent = useCallback((event: RpTrocUpdateItemsEvent) => 
    {
        const parser = event.getParser();

    }, [ ]);

    useMessageEvent(RpStatsEvent, onRpStatsEvent);
    useMessageEvent(BuyItemsListEvent, onBuyItemsListEvent);

    useMessageEvent(AddInventoryItemRpEvent, onAddInventoryItemRpEvent);
    useMessageEvent(RemoveItemInventoryRpEvent, onRemoveItemInventoryRpEvent);
    useMessageEvent(LoadInventoryRpEvent, onLoadInventoryRpEvent);

    useMessageEvent(RpTrocAccepteEvent, onRpTrocAccepteEvent);
    useMessageEvent(RpTrocConfirmeEvent, onRpTrocConfirmeEvent);
    useMessageEvent(RpTrocStartEvent, onRpTrocStartEvent);
    useMessageEvent(RpTrocStopEvent, onRpTrocStopEvent);
    useMessageEvent(RpTrocUpdateItemsEvent, onRpTrocUpdateItemsEvent);
    
    return null;
}
