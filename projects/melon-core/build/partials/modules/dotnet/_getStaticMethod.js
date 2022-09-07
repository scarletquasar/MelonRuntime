function _getStaticMethod(expression) {
    const parts = expression.split(":");
    const namespace = parts[0];
    const type = parts[1];
    const method = parts[2];
    const finalMethod = function (...args) {
        const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];
        return callStaticMethodBinding(namespace, type, method, [...args]);
    };
    return finalMethod;
}
export { _getStaticMethod };
