import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BuyItemsListParser } from '../../../parser/custom/roleplay/BuyItemsListParser';

export class BuyItemsListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BuyItemsListParser);
    }

    getParser(): BuyItemsListParser
    {
        return this.parser as BuyItemsListParser;
    }
}
