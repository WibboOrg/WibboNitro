import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class SettingVolumeParser implements IMessageParser
{
    volumeSystem: number;
    volumeFurni: number;
    volumeTrax: number;

    public flush(): boolean
    {
        this.volumeSystem = 0;
        this.volumeFurni = 0;
        this.volumeTrax = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.volumeSystem = wrapper.readInt();
        this.volumeFurni = wrapper.readInt();
        this.volumeTrax = wrapper.readInt();

        return true;
    }
}
