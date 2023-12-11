import { FC } from 'react';
import { GetConfiguration, LocalizeText, SendMessageComposer } from '../../../api';
import { Base, Column, Flex, LayoutRoomThumbnailView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';
import { useNavigator, useNotification } from '../../../hooks';
import { AddFavouriteRoomMessageComposer, DeleteFavouriteRoomMessageComposer } from '@nitrots/nitro-renderer';
                                
export class NavigatorFavouriteViewProps
{
    roomId: number;
    onlyIcon?: boolean;
}
                                
export const NavigatorFavouriteView: FC<NavigatorFavouriteViewProps> = props =>
{
    const { roomId = 0, onlyIcon = false } = props;

    const { simpleAlert = null } = useNotification();

    const { favourites = null, maxFavourites = 0 } = useNavigator();
  
    const isFavouriteRoom = favourites.includes(roomId);

    const favouriteText = LocalizeText(isFavouriteRoom ? 'navigator.removefavourite' : 'navigator.roominfo.addtofavourites')
  
    const toggleFavourite = () =>
    {
        if (favourites.length >= maxFavourites)
        {
            simpleAlert(LocalizeText('navigator.favouritesfull.body'), null, null, null, LocalizeText('navigator.favouritesfull.title'))
            return;
        }

        SendMessageComposer(isFavouriteRoom ? new DeleteFavouriteRoomMessageComposer(roomId) : new AddFavouriteRoomMessageComposer(roomId));
    }

    return (
        <Flex gap={ 1 } alignItems="center" onClick={ toggleFavourite } className="pointer">
            { onlyIcon ? null : <Text pointer>{ favouriteText }</Text> }
            <Base pointer title={ favouriteText } className={ 'icon icon-navigator-heart-' + (isFavouriteRoom ? 'on' : 'off') } />
        </Flex>
    );
};
                                