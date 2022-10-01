import { _Realm } from "../constructors/_Realm";

function _createThread(...args: any[]) {
    let tempRealm = new _Realm();
    
    tempRealm.setInstance("thread", "System.Threading:Thread", ...args);
    
    return tempRealm.get("thread");
}

export { _createThread }