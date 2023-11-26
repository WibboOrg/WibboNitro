import { FC, MouseEvent, useEffect, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { Base, Flex, Grid, NitroCardContentView } from '../../../../common';
import { emojiList } from './EmojiList';

interface ChatEmojiSelectorViewProps
{
    selectChatEmoji: (emojiId: string) => void;
}

export const ChatEmojiSelectorView: FC<ChatEmojiSelectorViewProps> = props =>
{
    const { selectChatEmoji = null } = props;
    const [ target, setTarget ] = useState<(EventTarget & HTMLElement)>(null);
    const [ selectorVisible, setSelectorVisible ] = useState(false);

    const selectEmoji = (emojiId: string) =>
    {
        selectChatEmoji(emojiId);
    }

    const toggleSelector = (event: MouseEvent<HTMLElement>) =>
    {
        let visible = false;

        setSelectorVisible(prevValue =>
        {
            visible = !prevValue;

            return visible;
        });

        if(visible) setTarget((event.target as (EventTarget & HTMLElement)));
    }

    useEffect(() =>
    {
        if(selectorVisible) return;

        setTarget(null);
    }, [ selectorVisible ]);

    return (
        <>
            <Base pointer style={ { marginLeft: '4px' } } onClick={ toggleSelector }>😎</Base>
            <Overlay show={ selectorVisible } target={ target } placement="top">
                <Popover className="nitro-chat-style-selector-container">
                    <NitroCardContentView overflow="hidden" className="bg-transparent">
                        <Grid columnCount={ 6 } overflow="auto">
                            { emojiList && (emojiList.length > 0) && emojiList.map((emojiId) =>
                            {
                                return (
                                    <Flex center pointer key={ emojiId } onClick={ event => selectEmoji(emojiId) }>
                                        <Base textColor="black">{ emojiId }</Base>
                                    </Flex>
                                );
                            }) }
                        </Grid>
                    </NitroCardContentView>
                </Popover>
            </Overlay>
        </>
    );
}
