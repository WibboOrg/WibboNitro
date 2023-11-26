import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface IRpStats {
    id: number,
    enable: boolean,
    health: number,
    healthMax: number,
    energy: number,
    money: number,
    ammunition: number,
    level: number
}

export class RpStatsParser implements IMessageParser
{
    id: number;
    stats: IRpStats;

    public flush(): boolean
    {
        this.id = 0;

        this.stats = {
            id: 0,
            enable: false,

            health: 100,
            healthMax: 100,
            energy: 0,
            money: 0,
            ammunition: 0,
            level: 1
        };

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.id = wrapper.readInt();

        this.stats = {
            id: this.id,
            enable: (this.id > 0),

            health: wrapper.readInt(),
            healthMax: wrapper.readInt(),
            energy: wrapper.readInt(),
            money: wrapper.readInt(),
            ammunition: wrapper.readInt(),
            level: wrapper.readInt()
        };

        return true;
    }
}
