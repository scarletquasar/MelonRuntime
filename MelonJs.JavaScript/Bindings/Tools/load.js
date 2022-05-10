function load(path) {
    if (!Array.isArray(path)) {
        const content = fs.read(path);
        return eval(content);
    }

    const results = [];

    path.forEach(x => {
        const content = fs.read(path);
        results.push(eval(content));
    });

    return results;
}