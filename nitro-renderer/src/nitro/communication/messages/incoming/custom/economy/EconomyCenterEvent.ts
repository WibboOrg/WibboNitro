import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { EconomyCenterParser } from '../../../parser';

export class EconomyCenterEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, EconomyCenterParser);
    }

    getParser(): EconomyCenterParser
    {
        return this.parser as EconomyCenterParser;
    }
}
