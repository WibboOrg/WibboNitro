import { FC, useEffect, useRef, useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import { FaPlay, FaStop } from 'react-icons/fa';
import { LocalizeText } from '../api';
import { Flex, Text } from './';
import { Button } from './Button';

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
    const [ error, setError ] = useState(false);

    useEffect(() => 
    {
        const fetchAudioBlob = () => 
        {
            fetch(audioUrl)
                .then(response => response.blob())
                .then(blob => setAudioBlob(blob))
                .catch(() => setError(true));
        };

        if (audioUrl && !audioBlob) 
        {
            fetchAudioBlob();
        }

        return () => 
        {
            if (audioBlob) 
            {
                setAudioBlob(null);
            }
        };
    }, [ audioUrl, audioBlob ]);
  
    useEffect(() => 
    {
        if (audioBlob && !audioBlobUrl) setAudioBlobUrl(URL.createObjectURL(audioBlob));
      
        return () =>
        {
            if(audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
        }
    }, [ audioBlob, setAudioBlobUrl, audioBlobUrl ]);

    const playPauseHandler = () => 
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
        setIsPlaying(!isPlaying);
    };

    const endedHandler = () => 
    {
        setIsPlaying(false);
    };
  
    if (error) return <Text>{ LocalizeText('generic.error') }</Text>;
  
    if (!audioBlobUrl) return <Text>{ LocalizeText('generic.loading') }</Text>;
    
    return (
        <Flex onClick={ event => event.stopPropagation() }>
            <audio ref={ audioRef } src={ audioBlobUrl } onEnded={ endedHandler } onTimeUpdate={ () => setAudioCurrentTime(audioRef.current?.currentTime || 0) } hidden></audio>
            <Button onClick={ playPauseHandler }>{ isPlaying ? <FaStop /> : <FaPlay /> }</Button>
            <AudioVisualizer
                currentTime={ audioCurrentTime }
                blob={ audioBlob }
                width={ 160 }
                height={ 20 }
                barWidth={ 1 }
                gap={ 0 }
                barPlayedColor={ '#16537e' }
                barColor={ '#2986cc' }
            />
        </Flex>
    );
};
