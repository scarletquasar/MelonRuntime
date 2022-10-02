/*  Internally creates a new Thread with the provided action
/  (as a Function type). The thread is a direct interop from
/  the .NET Thread object and can interact with the environment 
/  of the caller thread.
*/
function _createThread(action: Function) {
    const createThread = _$internalBinding["CreateThread"];
    
    return createThread(action);
}

export { _createThread }