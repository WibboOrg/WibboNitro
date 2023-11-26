import { BotChooseComposer, BotChooseEvent, IBotChoose } from '@nitrots/nitro-renderer';
import { FC, useCallback, useState } from 'react';
import { SendMessageComposer } from '../../../../api';
import { Flex, LayoutAvatarImageView } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';

import './BotChooseWidgetView.scss';

export const BotChooseWidgetView: FC = props =>
{
    const [ botChooses, setBotChooses ] = useState<IBotChoose[]>([]);
    
    useMessageEvent<BotChooseEvent>(BotChooseEvent, event =>
    {
        const parser = event.getParser();

        if (!parser.botChooses.length) setBotChooses([]);
        
        else
        {
            setBotChooses(prevValue =>
            {
                let newValue = [ ...prevValue ];
                
                for (const botChoose of parser.botChooses)
                {
                    newValue = newValue.filter(x => x.code !== botChoose.code);
                    
                    newValue.push(botChoose);
                }
        
                return newValue;
            });
        }
    });
    
    const click = useCallback((code: string) => 
    {
        if (code != '') SendMessageComposer(new BotChooseComposer(code));

        setBotChooses([]);
    }, [ setBotChooses ]);

    if(botChooses.length === 0) return null;

    return (
        <div className="bot-choose">
            { botChooses.map(choose =>
                <div className="bot-choose__box" key={ choose.code } onClick={ () => click(choose.code) }>
                    <Flex alignItems="center" float="start">
                        { choose.look != '' && <div className="bot-choose__avatar">
                            <LayoutAvatarImageView figure={ choose.look } direction={ 2 } headOnly={ true } scale={ 0.5 } />
                        </div> }
                        { choose.username != '' && <div className="bot-choose__username">{ choose.username + ' :' }</div> }
                    </Flex>
                    <span className="bot-choose__msg">{ choose.message }</span>
                </div>)
            }
        </div>
    );
}
