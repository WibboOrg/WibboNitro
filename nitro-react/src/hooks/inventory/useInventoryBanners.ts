import { UserBannerComposer, UserBannerEvent, UserBannerListEvent } from '@nitrots/nitro-renderer';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { SendMessageComposer, UnseenItemCategory } from '../../api';
import { useMessageEvent } from '../events';
import { useSessionInfo } from '../session';
import { useSharedVisibility } from '../useSharedVisibility';
import { useInventoryUnseenTracker } from './useInventoryUnseenTracker';

const useInventoryBannersState = () =>
{
    const [ needsUpdate, setNeedsUpdate ] = useState(true);
    const { isVisible = false, activate = null, deactivate = null } = useSharedVisibility();
    const { isUnseen = null, resetCategory = null } = useInventoryUnseenTracker();
    const [ banner, setBanner ] = useState<{ id: number; haveLayer: boolean }>(null);
    const [ selectedBanner, setSelectedBanner ] = useState<{ id: number; haveLayer: boolean }>(null);
    const [ userBannerList, setUserBannerList ] = useState<{ id: number; haveLayer: boolean; }[]>([]);
    const { userInfo = null } = useSessionInfo();

    useMessageEvent<UserBannerListEvent>(UserBannerListEvent, event =>
    {
        const parser = event.getParser();

        setUserBannerList(prevValue =>
        {
            const newValue: { id: number; haveLayer: boolean; }[] = [];
            
            for (const banner of parser.bannerList)
            {
                const unseen = isUnseen(UnseenItemCategory.BANNER, banner.id);

                if(unseen) newValue.unshift(banner)
                else newValue.push(banner);
            }

            return newValue;
        });
    });
      
    useMessageEvent<UserBannerEvent>(UserBannerEvent, event =>
    {
        const parser = event.getParser();
          
        if (!userInfo) return;
    
        if (userInfo.userId !== parser.userId) return;
            
        setSelectedBanner(parser.banner);
        setBanner(parser.banner);
    });
    
    useEffect(() =>
    {
        if(!isVisible) return;

        return () =>
        {
            resetCategory(UnseenItemCategory.BANNER);
        }
    }, [ isVisible, resetCategory ]);

    useEffect(() =>
    {
        if(!isVisible || !needsUpdate || !userInfo) return;

        SendMessageComposer(new UserBannerComposer(userInfo.userId, true));

        setNeedsUpdate(false);
    }, [ isVisible, needsUpdate, userInfo ]);

    return { activate, deactivate, selectedBanner, userBannerList, setSelectedBanner, banner };
}

export const useInventoryBanners = () => useBetween(useInventoryBannersState);
