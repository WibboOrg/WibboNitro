import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RemoveItemInventoryRpParser } from '../../../parser/custom/roleplay/RemoveItemInventoryRpParser';

export class RemoveItemInventoryRpEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RemoveItemInventoryRpParser);
    }

    getParser(): RemoveItemInventoryRpParser
    {
        return this.parser as RemoveItemInventoryRpParser;
    }
}
