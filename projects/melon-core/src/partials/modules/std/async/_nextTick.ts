async function _nextTick(delay?: number) {
    const basicAwaiter = async () => null;
    let then = 0;

    if(delay) {
        const now = new Date().getTime();

        while(then < now + delay) {
            then = new Date().getTime();
            await basicAwaiter();
        }

        return now - then;
    }

    return then;
}

export { _nextTick }