import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpTrocStopParser } from '../../../parser/custom/troc/RpTrocStopParser';

export class RpTrocStopEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpTrocStopParser);
    }

    getParser(): RpTrocStopParser
    {
        return this.parser as RpTrocStopParser;
    }
}
