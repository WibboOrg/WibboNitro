import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BotChooseParser } from '../../../parser/custom/notif/BotChooseParser';

export class BotChooseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotChooseParser);
    }

    getParser(): BotChooseParser
    {
        return this.parser as BotChooseParser;
    }
}
