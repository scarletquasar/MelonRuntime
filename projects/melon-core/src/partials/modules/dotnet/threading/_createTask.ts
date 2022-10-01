import { _Realm } from "../constructors/_Realm";

function _createTask(...args: any[]) {
    let tempRealm = new _Realm();
    
    tempRealm.setInstance("task", "System.Threading.Tasks:Task", ...args);
    
    return tempRealm.get("task");
}

export { _createTask }