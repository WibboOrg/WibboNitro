import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RpTrocStopParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
