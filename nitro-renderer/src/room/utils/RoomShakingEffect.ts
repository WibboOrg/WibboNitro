import { GetTickerTime } from '../../pixi-proxy';

export class RoomShakingEffect
{
    public static STATE_NOT_INITIALIZED: number = 0;
    public static STATE_START_DELAY: number = 1;
    public static STATE_RUNNING: number = 2;
    public static STATE_OVER: number = 3;

    private static _currentState: number = 0;
    private static _isVisualizationOn: boolean = false;
    private static _visualizationTimeout: number | null = null;
    private static _visualizationStartTime: number = 0;
    private static _visualizationDuration: number = 20000;
    private static _visualizationDelay: number = 5000;

    public static init(duration: number, delay: number): void
    {
        this._visualizationStartTime = GetTickerTime();
        this._visualizationDuration = duration;
        this._visualizationDelay = delay;
        this._currentState = 1;
    }

    public static turnVisualizationOn(): void
    {
        if(this._currentState === 0 || this._currentState === 3) return;

        if(!this._visualizationTimeout)
        {
            this._visualizationTimeout = setTimeout(() => this.turnVisualizationOff(), this._visualizationDelay);
        }

        const elapsedTime = GetTickerTime() - this._visualizationStartTime;

        if(elapsedTime > this._visualizationDuration + this._visualizationDelay)
        {
            this._currentState = 3;
            return;
        }

        this._isVisualizationOn = true;

        if(elapsedTime < this._visualizationDuration)
        {
            this._currentState = 1;
            return;
        }

        this._currentState = 2;
        const progress = (elapsedTime - this._visualizationDuration) / this._visualizationDelay;
        this._visualizationStartTime = progress;
    }

    public static turnVisualizationOff(): void
    {
        this._isVisualizationOn = false;

        if(this._visualizationTimeout)
        {
            clearTimeout(this._visualizationTimeout);
            this._visualizationTimeout = null;
        }
    }

    public static isVisualizationOn(): boolean
    {
        return this._isVisualizationOn && this.isRunning();
    }

    private static isRunning(): boolean
    {
        return this._currentState === 1 || this._currentState === 2;
    }
}