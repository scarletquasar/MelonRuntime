/*  Internally creates a new Task<JsValue> with the provided
/  action (as a Function type). The return is a direct interop
/  instance of the Task<JsValue> and have the exact behavior.
/  
/  Experimental advices: Do not call the created Task before
/  making sure that it is finished or it will result in a
/  program deadlock (or thread deadlock in case of using
/  "Melon.dotnet.threading.createThread(action: Function)").
/  The recommended use is after [Task].isCompleted being true.
*/
function _createTask(action: Function) {
    const createTask = _$internalBinding["CreateTask"];
    
    return createTask(action);
}

export { _createTask }