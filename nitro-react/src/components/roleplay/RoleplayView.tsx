import { IRoleplayItem, IRpStats } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { ITrocSettings } from './common/ITrocSettings';
import { ITrocTargetSettings } from './common/ITrocTargetSettings';
import { RoleplayContextProvider } from './RoleplayContext';
import { RoleplayMessageHandler } from './RoleplayMessageHandler';
import { RPBoxBuyItemsView } from './views/RPBoxBuyItemsView';
import { RPInventoryView } from './views/RPInventoryView';
import { RPStatsView } from './views/RPStatsView';

export const RoleplayView: FC<{ isInRoom: boolean }> = props =>
{
    const { isInRoom } = props;

    const [ stats, setStats ] = useState<IRpStats>(null);
    const [ inventoryIsOpen, setInventoryIsOpen ] = useState<boolean>(false);
    const [ inventoryItems, setInventoryItems ] = useState<IRoleplayItem[]>([]);
    const [ buyItems, setBuyItems ] = useState<IRoleplayItem[]>([]);
    const [ buyItemsIsOpen, setBuyItemsIsOpen ] = useState<boolean>(false);
    const [ trocTargetSettings, setTrocTargetSettings ] = useState<ITrocTargetSettings>(null);
    const [ trocSettings, setTrocSettings ] = useState<ITrocSettings>(null);
    const [ trocMyItems, setTrocMyItems ] = useState<IRoleplayItem[]>([]);
    const [ trocTargetItems, setTrocTargetItems ] = useState<IRoleplayItem[]>([]);

    return (
        <RoleplayContextProvider value={ { stats, setStats, inventoryIsOpen, setInventoryIsOpen, inventoryItems, setInventoryItems, trocTargetSettings, setTrocTargetSettings, trocSettings, setTrocSettings, trocMyItems, setTrocMyItems, trocTargetItems, setTrocTargetItems, buyItems, setBuyItems, buyItemsIsOpen, setBuyItemsIsOpen } }>
            <RoleplayMessageHandler />
            { stats && stats.enable && isInRoom && <>
                <RPStatsView />
                <RPBoxBuyItemsView />
                <RPInventoryView />
            </>
            }
        </RoleplayContextProvider>
    );
}
