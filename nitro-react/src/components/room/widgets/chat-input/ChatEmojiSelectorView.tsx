import { FC, MouseEvent, useRef, useState } from 'react';
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
    const [ selectorVisible, setSelectorVisible ] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);

    const selectEmoji = (emojiId: string) =>
    {
        selectChatEmoji(emojiId);
    }

    const toggleSelector = (event: MouseEvent<HTMLElement>) =>
    {
        setSelectorVisible(prevValue => !prevValue);
    }

    return (
        <>
            <Base pointer onClick={ toggleSelector } innerRef={ iconRef }>😎</Base>
            <Overlay show={ selectorVisible } target={ iconRef } placement="top">
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
