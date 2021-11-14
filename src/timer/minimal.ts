import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { updateSpentTime } from './external';

export const start =  createEvent();
export const update =  createEvent();
export const startNow = start.map(() => ({ now: Date.now() }));


export const $prevTime =  createStore<number>(NaN)
    .on(startNow, (_, { now }) => {
        console.log('store with actual date', now);
        return now;
    });

export const $updatedHappened =  createStore<boolean>(false)
    .on(update, () => {
        return true;
    });

export const intervalFx =  createEffect(() => {
    setInterval(async() => {
        console.log('update from set interval');
        update();
    }, 1000);
});
export const updateFx =  createEffect(updateSpentTime);

forward({
    from: startNow,
    to: intervalFx
});

sample({
    source: $prevTime,
    clock: update,
    fn: (source, clock) => ({
        prevTime: source,
        now: 222,
    }),
    target: updateFx,
})
