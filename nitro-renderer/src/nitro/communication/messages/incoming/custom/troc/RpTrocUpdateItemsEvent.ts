import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpTrocUpdateItemsParser } from '../../../parser/custom/troc/RpTrocUpdateItemsParser';

export class RpTrocUpdateItemsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpTrocUpdateItemsParser);
    }

    getParser(): RpTrocUpdateItemsParser
    {
        return this.parser as RpTrocUpdateItemsParser;
    }
}
