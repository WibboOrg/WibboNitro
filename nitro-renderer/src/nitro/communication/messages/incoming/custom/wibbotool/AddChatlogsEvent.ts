import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AddChatlogsParser } from '../../../parser/custom/wibbotool/AddChatlogsParser';

export class AddChatlogsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AddChatlogsParser);
    }

    getParser(): AddChatlogsParser
    {
        return this.parser as AddChatlogsParser;
    }
}
