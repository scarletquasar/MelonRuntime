const load = (path) => {
    const content = fs.read(path);
    melon_internal_script_injector(content);
}