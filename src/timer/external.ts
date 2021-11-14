import { sleep } from './sleep';
import { TimerData } from './types';

export async function updateSpentTime({now, prevTime}: TimerData) {
    const delta = Math.round((now - prevTime) / 1000);
    await sleep(0);
    console.log('updateSpentTime done', delta);
}
