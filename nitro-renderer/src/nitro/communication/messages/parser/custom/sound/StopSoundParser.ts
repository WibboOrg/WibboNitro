import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class StopSoundParser implements IMessageParser
{
    name: string;

    public flush(): boolean
    {
        this.name = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.name = wrapper.readString();

        return true;
    }
}
