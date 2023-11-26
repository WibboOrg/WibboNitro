import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class YoutubeTvParser implements IMessageParser
{
    id: number;
    videoCode: string;

    public flush(): boolean
    {
        this.id = 0;
        this.videoCode = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.id = wrapper.readInt();
        this.videoCode = wrapper.readString();

        return true;
    }
}
