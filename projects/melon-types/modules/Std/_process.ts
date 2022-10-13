declare type _process = {
    argv: string[];
    env: Record<string, any>;
    exit: () => void;
}