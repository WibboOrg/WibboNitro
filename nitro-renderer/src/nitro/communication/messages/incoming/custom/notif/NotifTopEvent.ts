import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { NotifTopParser } from '../../../parser/custom/notif/NotifTopParser';

export class NotifTopEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NotifTopParser);
    }

    getParser(): NotifTopParser
    {
        return this.parser as NotifTopParser;
    }
}
