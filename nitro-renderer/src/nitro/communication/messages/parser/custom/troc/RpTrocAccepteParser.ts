import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RpTrocAccepteParser implements IMessageParser
{
    userId: number;
    state: boolean;

    public flush(): boolean
    {
        this.userId = 0;
        this.state = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();
        this.state = wrapper.readBoolean();

        return true;
    }
}
