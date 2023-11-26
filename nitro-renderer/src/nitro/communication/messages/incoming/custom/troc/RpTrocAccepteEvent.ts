import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpTrocAccepteParser } from '../../../parser/custom/troc/RpTrocAccepteParser';

export class RpTrocAccepteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpTrocAccepteParser);
    }

    getParser(): RpTrocAccepteParser
    {
        return this.parser as RpTrocAccepteParser;
    }
}
