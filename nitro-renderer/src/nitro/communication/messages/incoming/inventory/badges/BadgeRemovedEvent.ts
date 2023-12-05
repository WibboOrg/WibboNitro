import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BadgeRemovedParser } from '../../../parser';

export class BadgeRemovedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BadgeRemovedParser);
    }

    public getParser(): BadgeRemovedParser
    {
        return this.parser as BadgeRemovedParser;
    }
}
