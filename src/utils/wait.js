const wait = (seconds, cb) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('hurray!');
            cb("resolve finished");
        }, seconds * 1000);
    })
}

export default wait;