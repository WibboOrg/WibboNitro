import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AddInventoryItemRpParser } from '../../../parser/custom/roleplay/AddInventoryItemRpParser';

export class AddInventoryItemRpEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AddInventoryItemRpParser);
    }

    getParser(): AddInventoryItemRpParser
    {
        return this.parser as AddInventoryItemRpParser;
    }
}
