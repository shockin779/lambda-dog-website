const expectExport = require("expect");
import wait from './wait';

// async test with the done method way
// test('wait for promise to resolve', (done) => {
//     wait(3).then(result => {
//         expect(result).toBe('hurray!');
//         done();
//     });
// })
jest.useFakeTimers();

test('wait for promise to resolve', async () => {
    const spy = jest.fn();

    const waitFn = wait(3, spy);

    jest.runAllTimers();

    const result = await waitFn;

    expect(result).toBe('hurray!');
    
    expect(spy).toHaveBeenCalledWith('resolve finished');
    expect(spy).toHaveBeenCalledTimes(1);
})


// async test with the return Promise way
// test('wait for promise to resolve', () => {
//     return wait(3).then(result => {
//         expect(result).toBe('hurray!');
//     });
// })

// test('wait for promise to resolve', async () => {
//     const spy = jest.fn();

//     const result = await wait(3);
//     expect(result).toBe('hurray!');
// });