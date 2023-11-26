import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpTrocStartParser } from '../../../parser/custom/troc/RpTrocStartParser';

export class RpTrocStartEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpTrocStartParser);
    }

    getParser(): RpTrocStartParser
    {
        return this.parser as RpTrocStartParser;
    }
}
