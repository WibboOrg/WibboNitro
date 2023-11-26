import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PlaySoundParser implements IMessageParser
{
    name: string;
    type: number;
    loop: boolean;

    public flush(): boolean
    {
        this.name = '';
        this.type = 0;
        this.loop = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.name = wrapper.readString();
        this.type = wrapper.readInt();
        this.loop = wrapper.readBoolean();

        return true;
    }
}
