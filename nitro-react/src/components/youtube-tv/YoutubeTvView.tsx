import { EditTvComposer, YoutubeTvEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo, useState } from 'react';
//import ReactPlayer from 'react-player/youtube';
import { GetConfiguration, SendMessageComposer } from '../../api';
import { Button, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useMessageEvent } from '../../hooks';

export const YoutubeTvView: FC<{}> = props =>
{
    const [ itemId, setItemId ] = useState<number>(-1);
    const [ videoId, setVideoId ] = useState<string>('');
    const [ videoLink, setVideoLink ] = useState<string>('');
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isEdit, setIsEdit ] = useState<boolean>(false);
    
    useMessageEvent<YoutubeTvEvent>(YoutubeTvEvent, event =>
    {
        const parser = event.getParser();

        setItemId(parser.id);
        setVideoId(parser.videoCode);
        setIsOpen(true);
    });

    const close = useCallback(() => 
    {
        setIsOpen(false);
        setIsEdit(false);
    }, []);

    const edit = useCallback(() =>
    {
        setIsEdit(true);
    }, []);

    const editVideo = useCallback(() =>
    {
        if (videoLink.trim() == '') return;

        if (itemId === 0) return;

        SendMessageComposer(new EditTvComposer(itemId, videoLink));

        setVideoLink('');

        close();
    }, [ videoLink, itemId, close ]);
  
    const getYoutubeOpts = useMemo(() =>
    {
        return {
            playerVars: {
                autoplay: 1,
                disablekb: 1,
                controls: 1,
                modestbranding: 1,
                origin: GetConfiguration<string>('url.prefix')
            }
        }
    }, [ ]);

    const origineUrl = useMemo(() => GetConfiguration<string>('url.prefix'), [ ]);

    if(!isOpen) return null;

    return (
        <NitroCardView className="youtube-tv-widget">
            { itemId > 0 && <NitroCardHeaderView headerText={ 'Tv Youtube' } onCloseClick={ close } onEditClick={ edit } /> }
            { itemId === 0 && <NitroCardHeaderView headerText={ 'Tv Youtube' } onCloseClick={ close } /> }
            <NitroCardContentView grow gap={ 0 }>
                <div className="youtube-video-container d-flex w-100 h-100">
                    { (videoId && videoId.length > 0 && !isEdit) &&
                        /*<ReactPlayer config={ getYoutubeOpts } playing={ true } width="100%" height="100%" url={ `https://www.youtube.com/watch?v=${ videoId }` }></ReactPlayer>*/
                        <iframe allowFullScreen={ true } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" width="100%" height="100%" src={ `https://www.youtube.com/embed/${ videoId }` + '?autoplay=1&mute=0&controls=1&origin=' + origineUrl + '&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1&widgetid=3' }></iframe>
                    }
                    { ((!videoId || videoId.length === 0) || isEdit) &&
                            <div className="w-100 h-100 justify-content-center align-items-center d-flex">
                                <Flex gap={ 1 }>
                                    <input type="text" className="form-control form-control" placeholder="https://www.youtube.com/watch?v=iVJD33AZCs0" value={ videoLink } onChange={ event => setVideoLink(event.target.value) } />
                                    <Button variant="primary" onClick={ editVideo }>Editer</Button>
                                </Flex>
                            </div>
                    }
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
