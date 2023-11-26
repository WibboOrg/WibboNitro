import { IRoleplayItem, IRpStats } from '@nitrots/nitro-renderer';
import { createContext, Dispatch, FC, ProviderProps, SetStateAction, useContext } from 'react';
import { ITrocSettings } from './common/ITrocSettings';
import { ITrocTargetSettings } from './common/ITrocTargetSettings';

export interface IRoleplayContext
{
    stats: IRpStats;
    setStats: Dispatch<SetStateAction<IRpStats>>;
    inventoryIsOpen: boolean;
    setInventoryIsOpen: Dispatch<SetStateAction<boolean>>;
    inventoryItems: IRoleplayItem[];
    setInventoryItems: Dispatch<SetStateAction<IRoleplayItem[]>>;
    trocTargetSettings: ITrocTargetSettings;
    setTrocTargetSettings: Dispatch<SetStateAction<ITrocTargetSettings>>;
    trocSettings: ITrocSettings;
    setTrocSettings: Dispatch<SetStateAction<ITrocSettings>>;
    trocMyItems: IRoleplayItem[];
    setTrocMyItems: Dispatch<SetStateAction<IRoleplayItem[]>>;
    trocTargetItems: IRoleplayItem[];
    setTrocTargetItems: Dispatch<SetStateAction<IRoleplayItem[]>>;
    buyItems: IRoleplayItem[];
    setBuyItems: Dispatch<SetStateAction<IRoleplayItem[]>>;
    buyItemsIsOpen: boolean;
    setBuyItemsIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RoleplayContext = createContext<IRoleplayContext>({
    stats: null,
    setStats: null,
    inventoryIsOpen: null,
    setInventoryIsOpen: null,
    inventoryItems: null,
    setInventoryItems: null,
    trocTargetSettings: null,
    setTrocTargetSettings: null,
    trocSettings: null,
    setTrocSettings: null,
    trocMyItems: null,
    setTrocMyItems: null,
    trocTargetItems: null,
    setTrocTargetItems: null,
    buyItems: null,
    setBuyItems: null,
    buyItemsIsOpen: null,
    setBuyItemsIsOpen: null,
});

export const RoleplayContextProvider: FC<ProviderProps<IRoleplayContext>> = props =>
{
    return <RoleplayContext.Provider value={ props.value }>{ props.children }</RoleplayContext.Provider>
}

export const useRoleplayContext = () => useContext(RoleplayContext);
