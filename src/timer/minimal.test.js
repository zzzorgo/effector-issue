import { allSettled, fork } from 'effector';
import { updateSpentTime } from './external';
import { $prevTime, $updatedHappened, start } from './minimal';
import { sleep } from './sleep';

jest.mock('./external', () => ({
    updateSpentTime: jest.fn(async function() {}),
    getTime: jest.fn(async function() {}),
}));

test('should not be NaN', async () => {
    const scope = fork();

    await allSettled(start, {
        scope,
        params: 123,
    });

    expect(isNaN(scope.getState($prevTime))).toBe(false);
    await sleep(2500);

    const prevTimeStoreValue = updateSpentTime.mock.calls[0][0].prevTime;


    // expect(updateSpentTime).toBeCalledWith([]);
    expect(scope.getState($updatedHappened)).toBe(true);
    expect(isNaN(prevTimeStoreValue)).toBe(false);

});
