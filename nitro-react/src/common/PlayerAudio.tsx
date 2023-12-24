import { FC, useEffect, useRef, useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import { FaPlay, FaStop } from 'react-icons/fa';
import { LocalizeText } from '../api';
import { Button, Flex, Text } from './';

export interface PlayerAudioProps {
    audioUrl: string;
}

export const PlayerAudio: FC<PlayerAudioProps> = (props) => 
{
    const { audioUrl = '' } = props;
    const [ isPlaying, setIsPlaying ] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [ audioCurrentTime, setAudioCurrentTime ] = useState(0);
    const [ audioBlob, setAudioBlob ] = useState<Blob | null>(null);
    const [ audioBlobUrl, setAudioBlobUrl ] = useState<string | null>('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => 
    {
        if (audioBlob && !audioBlobUrl) setAudioBlobUrl(URL.createObjectURL(audioBlob));
      
        return () =>
        {
            if(audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
        }
    }, [ audioBlob, setAudioBlobUrl, audioBlobUrl ]);
    
    useEffect(() =>
    {
        if (audioBlobUrl) audioRef.current?.play();
    }, [ audioBlobUrl ]);
    
    const fetchAudioBlob = async () => 
    {
        setLoading(true);
        
        await fetch(audioUrl)
            .then(response => response.blob())
            .then(blob => setAudioBlob(blob))
            .catch(() => setError(true));
        
        setLoading(false);
    };

    const playPauseHandler = async () => 
    {
        if (loading) return;

        if (audioUrl && !audioBlob)
            await fetchAudioBlob();
        else
        {
            if (isPlaying) 
            {
                audioRef.current?.pause();
                audioRef.current?.load();
            }
            else 
            {
                audioRef.current?.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const endedHandler = () => setIsPlaying(false);
    
    return (
        <Flex alignItems="center" gap={ 2 } onClick={ event => event.stopPropagation() }>
            { audioBlobUrl && <audio ref={ audioRef } src={ audioBlobUrl } onEnded={ endedHandler } onTimeUpdate={ () => setAudioCurrentTime(audioRef.current?.currentTime || 0) } hidden></audio> }
            <Button onClick={ playPauseHandler } disabled={ error }>{ isPlaying ? <FaStop /> : <FaPlay /> }</Button>
            { !error && audioBlobUrl && <AudioVisualizer
                currentTime={ audioCurrentTime }
                blob={ audioBlob }
                width={ 160 }
                height={ 20 }
                barWidth={ 1 }
                gap={ 0 }
                barPlayedColor={ '#16537e' }
                barColor={ '#2986cc' }
            /> }
            { error ? <Text>{ LocalizeText('generic.error') }</Text> : loading ? <Text>{ LocalizeText('generic.loading') }</Text> : !audioBlobUrl && <Text>En attente de lecture</Text> }
        </Flex>
    );
};
