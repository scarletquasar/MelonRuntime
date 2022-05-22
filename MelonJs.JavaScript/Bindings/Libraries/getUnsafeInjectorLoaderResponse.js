const getUnsafeInjectorLoaderResponse = (content) => {
    try {
        melon_internal_script_injector(content);

        return {
            success: true
        }
    }
    catch (e) {
        return {
            success: false,
            error: e.toString()
        }
    }
}