import React, { useEffect, useState, useRef } from 'react';
import { Start } from './Buttons/Start';
import { Reset } from './Buttons/Reset';
import { Heading } from '../components/Heading/Heading';

type TimerStateType = 'Active' | 'Paused' | 'Unactive';

export const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [state, setState] = useState<TimerStateType>('Unactive');

    const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

    function formatTime(time: number): string {
        return time < 10 ? `0${time}` : `${time}`;
    }

    useEffect(() => {
        if (state === 'Active') {
            intervalRef.current = setInterval(() => {
                setSeconds(seconds => {
                    if (seconds === 59) {
                        setMinutes(minutes => {
                            if (minutes === 59) {
                                setHours(prevHours => prevHours + 1);
                                return 0;
                            }
                            return minutes + 1;
                        });
                        return 0;
                    }
                    return seconds + 1;
                });
            }, 1000);
        }

        const cleanupFunction = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        return cleanupFunction;
    }, [state]);

    const isPaused = () => {
        if (state === 'Active') {
            setState('Paused');
            return;
        }

        setState('Active');
    };

    const handleReset = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setState('Unactive');
    };

    return (
        <>
            <Heading heading='h2' text='Hello Timer World!!!'></Heading>
            <div>
                {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <Start onClick={isPaused} content={state === 'Active' ? '⏸️ Pause' : '▶️ Play'}></Start>
            <Reset onClick={handleReset}></Reset>
        </>
    );
};
