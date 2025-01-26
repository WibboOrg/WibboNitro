import { RoomDataParser } from '@nitrots/nitro-renderer';
import { FC, useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LocalizeText } from '../../../../api';
import { Base, Column, Flex, LayoutBadgeImageView, LayoutRoomThumbnailView, NitroCardContentView, Text, UserProfileIconView } from '../../../../common';
import { NavigatorFavouriteView } from '../NavigatorFavouriteView';

interface NavigatorSearchResultItemInfoViewProps
{
    roomData: RoomDataParser;
}

export const NavigatorSearchResultItemInfoView: FC<NavigatorSearchResultItemInfoViewProps> = props =>
{
    const { roomData = null } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isMouseOverOverlay, setIsMouseOverOverlay ] = useState(false); // nouvel état
    const elementRef = useRef<HTMLDivElement>();

    const handleMouseEnter = () => 
    {
        setIsVisible(true);
        setIsMouseOverOverlay(true);
    };

    const handleMouseLeave = () => 
    {
        setIsVisible(false);
        setIsMouseOverOverlay(false);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

    const getUserCounterColor = () =>
    {
        const num: number = (100 * (roomData.userCount / roomData.maxUserCount));

        let bg = 'bg-primary';

        if(num >= 92)
        {
            bg = 'bg-danger';
        }
        else if(num >= 50)
        {
            bg = 'bg-warning';
        }
        else if(num > 0)
        {
            bg = 'bg-success';
        }

        return bg;
    }

    return (
        <>
            <Base pointer innerRef={ elementRef } className="icon icon-navigator-info" onMouseOver={ handleMouseEnter } onMouseLeave={ handleMouseLeave } />
            <Overlay show={ isVisible || isMouseOverOverlay } target={ elementRef.current } placement="right">
                <Popover onMouseEnter={ () => setIsMouseOverOverlay(true) } onMouseLeave={ () => setIsMouseOverOverlay(false) } onClick={ handleOverlayClick }>
                    <NitroCardContentView overflow="hidden" className="room-info">
                        <Flex gap={ 2 } overflow="hidden">
                            <LayoutRoomThumbnailView roomId={ roomData.roomId } customUrl={ roomData.officialRoomPicRef } className="mb-1 d-flex flex-column align-items-center justify-content-end">
                                { roomData.habboGroupId > 0 && (
                                    <LayoutBadgeImageView badgeCode={ roomData.groupBadgeCode } isGroup={ true } className={ 'position-absolute top-0 start-0 m-1 ' }/>) }
                                { roomData.doorMode !== RoomDataParser.OPEN_STATE && (
                                    <i className={ 'position-absolute end-0 mb-1 me-1 icon icon-navigator-room-' + (roomData.doorMode === RoomDataParser.DOORBELL_STATE ? 'locked' : roomData.doorMode === RoomDataParser.PASSWORD_STATE ? 'password' : roomData.doorMode === RoomDataParser.INVISIBLE_STATE ? 'invisible' : '') }/> ) }
                            </LayoutRoomThumbnailView>
                            <Column gap={ 1 } overflow='hidden'>
                                <Text bold truncate>
                                    { roomData.roomName }
                                </Text>
                                <Flex gap={ 2 }>
                                    <Text italics variant="muted">
                                        { LocalizeText('navigator.roomownercaption') }
                                    </Text>
                                    <Flex alignItems="center" gap={ 1 }>
                                        <UserProfileIconView userId={ roomData.ownerId } />
                                        <Text italics>{ roomData.ownerName }</Text>
                                    </Flex>
                                </Flex>
                                <Text>
                                    { roomData.description }
                                </Text>
                                <NavigatorFavouriteView roomId={ roomData.roomId } />
                                <Flex className={ 'badge p-1 position-absolute m-1 bottom-0 end-0 ' + getUserCounterColor() } gap={ 1 }>
                                    <FaUser className="fa-icon" />
                                    { roomData.userCount }
                                </Flex>
                            </Column>
                        </Flex>
                    </NitroCardContentView>
                </Popover>
            </Overlay>
        </>
    );
}
