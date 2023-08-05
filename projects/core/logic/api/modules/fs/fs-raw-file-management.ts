import { Task } from "../dotnet/dotnet-threading-core";
import { _nextTick } from "../std/async/_nextTick";
import { 
    ReadFileError, 
    TransactFileError, 
    TransactDirectoryError, 
    WriteFileError 
} from "./fs-default-errors";

function copyFile(from: string, to: string) {
    try {
        _$internalBinding["CopyFile"](from, to, true);
    }
    catch(e) {
        throw new TransactFileError(from, to, e);
    }
}

async function copyFileAsync(from: string, to: string) {
    try {
        await Promise.resolve(copyFile(from, to));
    }
    catch(e) {
        throw new TransactFileError(from, to, e);
    }
}

function writeText(path: string, content: string) {
    try {
        _$internalBinding["WriteFileText"](path, content);
    }
    catch(e) {
        throw new WriteFileError(path, e);
    }
}

async function writeTextAsync(path: string, content: string) {
    const action = () => _$internalBinding["WriteFileText"](path, content);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new WriteFileError(path, e);
    }
}

function writeBytes(path: string, bytes: number[]) {
    try {
        _$internalBinding["WriteFileBytes"](path, bytes);
    }
    catch(e) {
        throw new WriteFileError(path, e);
    }
}

async function writeBytesAsync(path: string, bytes: number[]) {
    const task = <Task<number[]>>_$internalBinding["WriteFileBytesAsync"](path, bytes);

    try {
        await Promise.resolve(task.result);
    }
    catch(e) {
        throw new WriteFileError(path, e);
    }
}

function renameFile(path: string, newName: string) {
    try {
        _$internalBinding["RenameFile"](path, newName);
    }
    catch(e) {
        throw new TransactFileError(path, newName, e);
    }
}

async function renameFileAsync(path: string, newName: string) {
    const action = () => _$internalBinding["RenameFile"](path, newName);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new TransactFileError(path, newName, e);
    }
}

function moveFile(from: string, to: string) {
    try {
        _$internalBinding["MoveFile"](from, to, true);
    }
    catch(e) {
        throw new TransactFileError(from, to, e);
    }
}

async function moveFileAsync(from: string, to: string) {
    const action = () => _$internalBinding["MoveFile"](from, to, true);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new TransactFileError(from, to, e);
    }
}

function readBytes(path: string): number[] {
    try {
        return _$internalBinding["ReadFileBytes"](path);
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

async function readBytesAsync(path: string): Promise<number[]> {
    const task = <Task<number[]>>_$internalBinding["ReadFileBytesAsync"](path);

    try {
        return await Promise.resolve(task.result);
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

function readText(path: string): string {
    try { 
        return _$internalBinding["ReadFileText"](path);
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

async function readTextAsync(path: string): Promise<string> {
    const task = <Task<string>>_$internalBinding["ReadFileTextAsync"](path);

    try {
        return await Promise.resolve(task.result);
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

function deleteFile(path: string) {
    try {
        _$internalBinding["DeleteFile"](path);
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

async function deleteFileAsync(path: string) {
    const action = () => _$internalBinding["DeleteFile"](path);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new ReadFileError(path, e);
    }
}

function createDirectory(path: string) {
    try {
        _$internalBinding["CreateDirectory"](path);
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

async function createDirectoryAsync(path: string) {
    const action = () => _$internalBinding["DeleteFile"](path);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

function deleteDirectory(path: string) {
    try {
        _$internalBinding["DeleteDirectory"](path);
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

async function deleteDirectoryAsync(path: string) {
    const action = () => _$internalBinding["DeleteDirectory"](path);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

function renameDirectory(path: string, newName: string) {
    try {
        _$internalBinding["RenameDirectory"](path, newName);
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

async function renameDirectoryAsync(path: string, newName: string) {
    const action = () => _$internalBinding["RenameDirectory"](path, newName);

    try {
        await Promise.resolve(action());
    }
    catch(e) {
        throw new TransactDirectoryError(path, e);
    }
}

export {  
    writeText,
    writeTextAsync,
    writeBytes,
    writeBytesAsync,
    copyFile, 
    copyFileAsync,
    renameFile,
    renameFileAsync,
    moveFile,
    moveFileAsync,
    readBytes,
    readBytesAsync,
    readText,
    readTextAsync,
    deleteFile,
    deleteFileAsync,
    createDirectory,
    createDirectoryAsync,
    deleteDirectory,
    deleteDirectoryAsync,
    renameDirectory,
    renameDirectoryAsync
}