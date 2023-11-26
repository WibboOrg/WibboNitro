import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpTrocConfirmeParser } from '../../../parser/custom/troc/RpTrocConfirmeParser';

export class RpTrocConfirmeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpTrocConfirmeParser);
    }

    getParser(): RpTrocConfirmeParser
    {
        return this.parser as RpTrocConfirmeParser;
    }
}
