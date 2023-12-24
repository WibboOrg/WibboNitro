import { FollowFriendMessageComposer, FriendlyTime, IMention, MentionEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { PlaySound, SendMessageComposer } from '../../api';
import { DraggableWindow, DraggableWindowPosition, LayoutAvatarImageView } from '../../common';
import { useLocalStorage, useMessageEvent } from '../../hooks';

export const MentionBubbleView: FC<{}> = props =>
{
    const [ mentionList, setMentionList ] = useLocalStorage<IMention[]>('mentionList', []);
    const [ lastSoundTime, setLastSoundTime ] = useState<number>(0);
    const [ timeNow, setTimeNow ] = useState<number>(0);
    
    const mention = useMemo(() => (mentionList && mentionList.length > 0) ? mentionList[mentionList.length - 1] : null, [ mentionList ]);
    const mentionCount = useMemo(() => mentionList && mentionList.length, [ mentionList ]);
    
    useEffect(() =>
    {
        const interval = setInterval(() => setTimeNow(Date.now() / 1000), 1000);

        return () => clearInterval(interval);
    }, []);

    const getTime = useCallback(() =>
    {
        const value = (Date.now() / 1000) - mention.time;

        return FriendlyTime.format(value, '.ago', 1);
    }, [ mention ]);
    
    useMessageEvent<MentionEvent>(MentionEvent, event =>
    {
        const parser = event.getParser();

        setMentionList((prevValue) => [ ...prevValue, parser.mention ]);

        if(lastSoundTime > timeNow) return;

        setLastSoundTime(timeNow + 5);

        PlaySound('mention_beep');
    });

    const close = useCallback(() =>
    {
        setMentionList((prevValue) => prevValue.slice(0, -1));
    }, [ setMentionList ]);
    
    const followUser = useCallback(() => 
    {
        SendMessageComposer(new FollowFriendMessageComposer(mention.userId));
        close();
    }, [ mention, close ]);
    
    if(!mention) return null;
    
    return (
        <DraggableWindow offsetTop={ 100 } windowPosition={ DraggableWindowPosition.TOP_LEFT } uniqueKey="mention-bubble">
            <div className="mention">
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>{ mention.username }, { getTime() }</Tooltip>
                    }>
                    <div className="mention__avatar-frame drag-handler">
                        <LayoutAvatarImageView className="mention__avatar" figure={ mention.look } direction={ 2 } headOnly={ true } draggable="false" />
                        <div className="mention__count">{ mentionCount }</div>
                        <FaTimes className="fa-icon w-12 h-12 cursor-pointer" onClick={ close } />
                    </div>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>Rejoindre { mention.username } !</Tooltip>
                    }>
                    <div className="mention__container" onClick={ followUser }>
                        <span className="mention__msg">{ mention.msg }</span>
                    </div>
                </OverlayTrigger>
            </div>
        </DraggableWindow>
    );
}
