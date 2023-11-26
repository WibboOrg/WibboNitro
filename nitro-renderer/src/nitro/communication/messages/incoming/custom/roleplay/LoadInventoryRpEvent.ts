import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { LoadInventoryRpParser } from '../../../parser/custom/roleplay/LoadInventoryRpParser';

export class LoadInventoryRpEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoadInventoryRpParser);
    }

    getParser(): LoadInventoryRpParser
    {
        return this.parser as LoadInventoryRpParser;
    }
}
