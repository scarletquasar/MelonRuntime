const deep_clone = (target) => {
    return JSON.parse(JSON.stringify(eval(target)));
}