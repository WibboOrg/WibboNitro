import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { MentionParser } from '../../../parser/custom/notif/MentionParser';

export class MentionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MentionParser);
    }

    getParser(): MentionParser
    {
        return this.parser as MentionParser;
    }
}
