import { useState } from 'react';

export interface recorderControls {
    startRecording: () => void;
    stopRecording: () => void;
    recordingBlob?: Blob;
    isRecording: boolean;
    recordingTime: number;
    mediaRecorder?: MediaRecorder;
}

export type MediaAudioTrackConstraints = Pick<
MediaTrackConstraints,
| 'deviceId'
| 'groupId'
| 'autoGainControl'
| 'channelCount'
| 'echoCancellation'
| 'noiseSuppression'
| 'sampleRate'
| 'sampleSize'
>;

/**
 * @returns Controls for the recording. Details of returned controls are given below
 *
 * @param `audioTrackConstraints`: Takes a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings#instance_properties_of_audio_tracks subset} of `MediaTrackConstraints` that apply to the audio track
 * @param `onNotAllowedOrFound`: A method that gets called when the getUserMedia promise is rejected. It receives the DOMException as its input.
 *
 * @details `startRecording`: Calling this method would result in the recording to start. Sets `isRecording` to true
 * @details `stopRecording`: This results in a recording in progress being stopped and the resulting audio being present in `recordingBlob`. Sets `isRecording` to false
 * @details `togglePauseResume`: Calling this method would pause the recording if it is currently running or resume if it is paused. Toggles the value `isPaused`
 * @details `recordingBlob`: This is the recording blob that is created after `stopRecording` has been called
 * @details `isRecording`: A boolean value that represents whether a recording is currently in progress
 * @details `isPaused`: A boolean value that represents whether a recording in progress is paused
 * @details `recordingTime`: Number of seconds that the recording has gone on. This is updated every second
 * @details `mediaRecorder`: The current mediaRecorder in use
 */
const useAudioRecorderState: (
    audioTrackConstraints?: MediaAudioTrackConstraints,
    onNotAllowedOrFound?: (exception: DOMException) => any,
    mediaRecorderOptions?: MediaRecorderOptions
) => recorderControls = (
    audioTrackConstraints,
    onNotAllowedOrFound,
    mediaRecorderOptions
) => 
{
    const [ isRecording, setIsRecording ] = useState(false);
    const [ recordingTime, setRecordingTime ] = useState(0);
    const [ mediaRecorder, setMediaRecorder ] = useState<MediaRecorder>();
    const [ timerInterval, setTimerInterval ] = useState<number>();
    const [ timerTimeout, setTimerTimeout ] = useState<number>();
    const [ recordingBlob, setRecordingBlob ] = useState<Blob>();

    const _startTimer = () => 
    {
        const interval = window.setInterval(() => 
        {
            setRecordingTime((time) => time + 1);
        }, 1000);
        setTimerInterval(interval);

        const timeoutId = window.setTimeout(() => 
        {
            stopRecording();
        }, 10000);
        setTimerTimeout(timeoutId);
    }

    const _stopTimer = () => 
    {
        timerInterval != null && window.clearInterval(timerInterval);
        timerTimeout != null && window.clearTimeout(timerTimeout);
        setTimerInterval(undefined);
        setTimerTimeout(undefined);
    }

    /**
   * Calling this method would result in the recording to start. Sets `isRecording` to true
   */
    const startRecording = () => 
    {
        if (timerInterval != null || timerTimeout != null) return;

        navigator.mediaDevices
            .getUserMedia({ audio: audioTrackConstraints ?? true, video: false })
            .then((stream) => 
            {
                setIsRecording(true);
                setRecordingBlob(null);
                const recorder = new MediaRecorder(
                    stream,
                    mediaRecorderOptions
                );
                setMediaRecorder(recorder);
                recorder.start(10000);
                _startTimer();

                recorder.addEventListener('dataavailable', (event) => 
                {
                    setRecordingBlob(preview => preview || new Blob([ event.data ], { type: 'audio/webm' }));
                    recorder.stream.getTracks().forEach((t) => t.stop());
                    setMediaRecorder(undefined);
                });
            })
            .catch((err: DOMException) => 
            {
                console.log(err.name, err.message, err.cause);
                onNotAllowedOrFound?.(err);
            });
    }

    /**
   * Calling this method results in a recording in progress being stopped and the resulting audio being present in `recordingBlob`. Sets `isRecording` to false
   */
    const stopRecording = () => 
    {
        // mediaRecorder?.requestData();
        mediaRecorder?.stop();
        _stopTimer();
        setRecordingTime(0);
        setIsRecording(false);
    }

    return { startRecording, stopRecording, recordingBlob, isRecording, recordingTime, mediaRecorder };
};

export const useAudioRecorder = useAudioRecorderState;
