import { RoomUnitChatAudioComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useRef, useState } from 'react';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { Overlay, Popover } from 'react-bootstrap';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { SendMessageComposer } from '../../../../api';
import { Base, Button, Flex, NitroCardContentView, PlayerAudio } from '../../../../common';
import { useAudioRecorder } from '../../../../hooks';

interface ChatRecorderSelectorViewProps
{
    floodBlocked: boolean;
}

export const ChatRecorderSelectorView: FC<ChatRecorderSelectorViewProps> = (props) => 
{
    const { floodBlocked } = props;
    const { startRecording, stopRecording, recordingBlob, isRecording, mediaRecorder } = useAudioRecorder();
    const [ selectorVisible, setSelectorVisible ] = useState(false);
    const [ newRecordingBlob, setNewRecordingBlob ] = useState<Blob | null>(null);
    const [ newRecordingUrl, setNewRecordingUrl ] = useState<string | null>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        setNewRecordingBlob(recordingBlob);
        setNewRecordingUrl(recordingBlob ? URL.createObjectURL(recordingBlob) : null);
    }, [ recordingBlob ]);
    
    const sendRecording = async () => 
    {
        if (!newRecordingBlob) 
        {
            return;
        }

        const binaryAudio = new Uint8Array(await newRecordingBlob.arrayBuffer());

        if (binaryAudio.length > 100_000)
        {
            setNewRecordingBlob(null);
            setSelectorVisible(false);
            return;
        }

        const chatAudioComposer = new RoomUnitChatAudioComposer();
        chatAudioComposer.assignAudio(binaryAudio);

        SendMessageComposer(chatAudioComposer)

        setNewRecordingBlob(null);
        setSelectorVisible(false);
    };

    const toggleSelector = () =>
    {
        setSelectorVisible(prevValue =>
        {
            if (!prevValue && !isRecording)
            {
                setNewRecordingBlob(null);
                startRecording();
            }
            else if (prevValue && isRecording)
            {
                stopRecording();
            }

            return !prevValue
        });
    }

    return (
        <>
            <Base pointer onClick={ () => toggleSelector() } innerRef={ iconRef } className="text-black">
                <FaMicrophone />
            </Base>
            <Overlay show={ selectorVisible } target={ iconRef.current } placement="top">
                <Popover>
                    <NitroCardContentView overflow="hidden" className="bg-transparent">
                        <Flex gap={ 2 } justifyContent="between" alignItems="center">
                            { !isRecording && newRecordingUrl && <PlayerAudio audioUrl={ newRecordingUrl } /> }
                            { isRecording && mediaRecorder && <LiveAudioVisualizer
                                mediaRecorder={ mediaRecorder }
                                width={ 160 }
                                height={ 20 }
                                barWidth={ 1 }
                                gap={ 0 }
                                barColor={ '#2986cc' }
                            /> }
                            <Flex gap={ 1 }>
                                { !isRecording && <Button onClick={ sendRecording } disabled={ !newRecordingBlob || floodBlocked }><IoSend /></Button> }
                                { isRecording && <Button onClick={ stopRecording } disabled={ !!newRecordingBlob }><FaStop /></Button> }
                            </Flex>
                        </Flex>
                    </NitroCardContentView>
                </Popover>
            </Overlay>
        </>
    );
};
