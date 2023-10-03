import { useEffect, useRef, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';
import CountUp from 'react-countup';

import s from './PreloaderPercentage.module.scss';

interface PreloaderPercentageProps {
  size?: number;
  className?: string;
  finishAnimation?: boolean;
}

export const PreloaderPercentage = ({ size = 96, finishAnimation }: PreloaderPercentageProps) => {
  const [progress, setProgress] = useState(0);

  const initialTimerRef = useRef<number>();
  const continueProgressRef = useRef<number>();
  const moreThen80PercentageRef = useRef<number>();

  useEffect(() => {
    const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

    // Fill processing from 0 to 30-40% (random value) in the first 1-2 seconds
    const initialFill = Math.floor(Math.random() * 11) + 30;
    let currentProgress = 0;

    const initialTimer = window.setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 2;

      if (currentProgress >= initialFill) {
        currentProgress = initialFill;

        clearInterval(initialTimer);
        continueProgress();
      }

      setProgress(currentProgress);
    }, 100);

    initialTimerRef.current = initialTimer;

    const continueProgress = () => {
      // Add 8-15% (random value) every 2-3 seconds
      const continueTimer = window.setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 8;

        if (currentProgress >= 80) {
          clearInterval(continueTimer);
          moreTran80Percent();
        }

        setProgress(currentProgress);
      }, getRandomValue(1000, 2000));

      continueProgressRef.current = continueTimer;
    };

    const moreTran80Percent = () => {
      // Add 1-3% (random value) every 4-6 seconds after 80 percents
      const continueTimer = window.setInterval(() => {
        currentProgress += Math.floor(Math.random() * 3) + 1;

        if (currentProgress >= 99) {
          currentProgress = 99;
          clearInterval(continueTimer);
        }

        setProgress(currentProgress);
      }, getRandomValue(4000, 6000));

      moreThen80PercentageRef.current = continueTimer;
    };

    return () => {
      clearInterval(initialTimer);
      // @ts-ignore
      clearInterval(continueProgress);
      // @ts-ignore
      clearInterval(moreTran80Percent);

      clearInterval(continueProgressRef.current);
      clearInterval(moreThen80PercentageRef.current);
    };
  }, []);

  useEffect(() => {
    if (finishAnimation) {
      setProgress(100);

      clearInterval(initialTimerRef.current);
      clearInterval(continueProgressRef.current);
      clearInterval(moreThen80PercentageRef.current);

      initialTimerRef.current = undefined;
      continueProgressRef.current = undefined;
      moreThen80PercentageRef.current = undefined;
    }
  }, [finishAnimation]);

  return (
    <div className={s.preloaderPercentage}>
      <Box marginBottom='24px' sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          sx={{ '&.MuiCircularProgress-colorPrimary': { color: '#8c6ced' } }}
          thickness={2}
          variant='determinate'
          value={progress}
          size={size}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className={s.percent}>
            <CountUp delay={2000} preserveValue end={progress} />%
          </span>
        </Box>
      </Box>
    </div>
  );
};
