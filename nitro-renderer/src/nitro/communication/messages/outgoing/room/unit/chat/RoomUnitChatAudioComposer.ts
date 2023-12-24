import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitChatAudioComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitChatAudioComposer>>
{
    private _data: any;

    constructor()
    {
        this._data = [];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }

    public assignAudio(binaryData: Uint8Array): void
    {
        this._data.push(binaryData.byteLength, binaryData.buffer);
    }
}
