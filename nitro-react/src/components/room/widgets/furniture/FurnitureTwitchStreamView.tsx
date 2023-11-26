import { RoomObjectCategory } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { Column, Flex } from '../../../../common';
import { useFurnitureTwitchStreamWidget } from '../../../../hooks/rooms/widgets/furniture/useFurnitureTwitchStreamWidget';
import { ContextMenuHeaderView } from '../context-menu/ContextMenuHeaderView';
import { ObjectLocationView } from '../object-location/ObjectLocationView';

export const FurnitureTwitchStreamView: FC<{}> = props =>
{
    const { objectId = -1, objectData = null, twitchConfig = null } = useFurnitureTwitchStreamWidget();

    if(objectId === -1 || objectData === '') return null;

    return (
        <>
            <ObjectLocationView objectId={ objectId } category={ RoomObjectCategory.FLOOR }>
                <Column className="nitro-widget-twitch-stream nitro-context-menu" gap={ 0 }>
                    <ContextMenuHeaderView>
                        Kick Stream ({ objectData })
                    </ContextMenuHeaderView>
                    <Flex gap={ 1 } className="h-100">
                        <iframe allowFullScreen={ true } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" width="100%" height="100%" src="https://player.kick.com/teuf?muted=1&autoplay=1&allowfullscreen=1"></iframe>
                        { /* <ReactPlayer config={ twitchConfig } playing={ true } width="100%" height="100%" url={ `https://www.twitch.tv/${ objectData }` }></ReactPlayer> */ }
                    </Flex>
                </Column>
            </ObjectLocationView>
        </>
    );
}
