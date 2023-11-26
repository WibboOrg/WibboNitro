import { FC, useEffect, useRef } from 'react';
import { DispatchMouseEvent, DispatchTouchEvent, GetNitroInstance } from '../../api';
import { Base } from '../../common';
import { useRoom } from '../../hooks';
import { RoomSpectatorView } from './spectator/RoomSpectatorView';
import { RoomWidgetsView } from './widgets/RoomWidgetsView';

export const RoomView: FC<{}> = props =>
{
    const { roomSession = null } = useRoom();
    const elementRef = useRef<HTMLDivElement>();

    useEffect(() =>
    {
        const canvas = GetNitroInstance().application.renderer.view;

        if(!canvas) return;

        canvas.onclick = (event: MouseEvent) => DispatchMouseEvent(event);
        canvas.onmousemove = (event: MouseEvent) => DispatchMouseEvent(event);
        canvas.onmousedown = (event: MouseEvent) => DispatchMouseEvent(event);
        canvas.onmouseup = (event: MouseEvent) => DispatchMouseEvent(event);

        canvas.ontouchstart = (event: TouchEvent) => DispatchTouchEvent(event);
        canvas.ontouchmove = (event: TouchEvent) => DispatchTouchEvent(event);
        canvas.ontouchend = (event: TouchEvent) => DispatchTouchEvent(event);
        canvas.ontouchcancel = (event: TouchEvent) => DispatchTouchEvent(event);

        const element = elementRef.current;

        if(!element) return;

        element.appendChild(canvas);
    }, []);

    return (
        <Base fit innerRef={ elementRef } className={ (!roomSession && 'd-none') }>
            { roomSession &&
                <>
                    <RoomWidgetsView />
                    { roomSession.isSpectator && <RoomSpectatorView /> }
                </> }
        </Base>
    );
}
