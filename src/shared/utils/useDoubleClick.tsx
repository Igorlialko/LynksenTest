import {
  MouseEvent,
  MouseEventHandler,
  TouchEvent,
  TouchEventHandler,
  useCallback,
  useRef,
} from 'react';

type EmptyCallback = () => void;

export type CallbackFunction<Target = Element> =
  | MouseEventHandler<Target>
  | TouchEventHandler<Target>
  | EmptyCallback;
export type DoubleTapCallback<Target = Element> = CallbackFunction<Target> | null;

export interface DoubleTapOptions<Target = Element> {
  onSingleTap?: CallbackFunction<Target>;
}

export type DoubleTapResult<Target, Callback> = Callback extends CallbackFunction<Target>
  ? {
      onClick: any;
    }
  : Callback extends null
  ? Record<string, never>
  : never;

export function useDoubleClick<
  Target = Element,
  Callback extends DoubleTapCallback<Target> = DoubleTapCallback<Target>
>(
  callback: Callback,
  threshold = 300,
  options: DoubleTapOptions<Target> = {}
): DoubleTapResult<Target, Callback> {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handler = useCallback<CallbackFunction<Target>>(
    (event: MouseEvent<Target> & TouchEvent<Target>) => {
      // console.log('handler', event);
      if (!timer.current) {
        timer.current = setTimeout(() => {
          if (options.onSingleTap) {
            options.onSingleTap(event);
          }
          timer.current = null;
        }, threshold);
      } else {
        clearTimeout(timer.current);
        timer.current = null;
        callback && callback(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, threshold, options.onSingleTap]
  );

  return (
    callback
      ? {
          onClick: handler,
        }
      : {}
  ) as DoubleTapResult<Target, Callback>;
}
