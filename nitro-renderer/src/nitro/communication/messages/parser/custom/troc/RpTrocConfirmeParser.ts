import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RpTrocConfirmeParser implements IMessageParser
{
    userId: number;

    public flush(): boolean
    {
        this.userId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();

        return true;
    }
}
