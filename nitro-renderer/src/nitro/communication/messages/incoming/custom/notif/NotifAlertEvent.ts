import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { NotifAlertParser } from '../../../parser/custom/notif/NotifAlertParser';

export class NotifAlertEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NotifAlertParser);
    }

    getParser(): NotifAlertParser
    {
        return this.parser as NotifAlertParser;
    }
}
