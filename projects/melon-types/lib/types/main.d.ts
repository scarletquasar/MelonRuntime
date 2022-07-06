/// <reference path="./Tools/std.d.ts" />
/// <reference path="./Tools/http.d.ts" />
/// <reference path="./Tools/fs.d.ts" />
/// <reference path="./Tools/environment.d.ts" />
/// <reference path="./Tools/debug.d.ts" />
/// <reference path="./Tools/data.d.ts" />
/// <reference path="./Tools/console.d.ts" />
/// <reference path="./Tools/application.d.ts" />
/// <reference path="./Tools/xrequire.d.ts" />
/// <reference path="./Constructors/Queue.d.ts" />
/// <reference path="./Constructors/PingResponse.d.ts" />
/// <reference path="./Constructors/Response.d.ts" />
/// <reference path="./Constructors/IndexedArray.d.ts" />
/// <reference path="./Constructors/HttpRoute.d.ts" />
/// <reference path="./Constructors/HttpApplication.d.ts" />
/// <reference path="./Constructors/Enumerable.d.ts" />
/// <reference path="./Constructors/Empty.d.ts" />
/// <reference path="./Constructors/Promise.d.ts" />
/// <reference path="./Constructors/ConstructorAssembler.d.ts" />
/// <reference path="./Constructors/Numbers/BigFloat.d.ts" />
/// <reference path="./Constructors/Numbers/NumberPeriod.d.ts" />
/// <reference path="./Constructors/Async/AsyncLoop.d.ts" />
/// <reference path="./Constructors/Async/AsyncTask.d.ts" />
/// <reference path="./Constructors/FileSystem/FileInfo.d.ts" />
/// <reference path="./Constructors/FileSystem/FolderInfo.d.ts" />
/// <reference path="./Constructors/FileSystem/MFile.d.ts" />
/// <reference path="./Constructors/FileSystem/MFolder.d.ts" />

import { FileInfoConstructorInternal } from "./Constructors/FileSystem/FileInfo";

declare module Melon {
    export class Queue extends QueueConstructorInternal {}
    export class PingResponse extends PingResponseConstructorInternal {}
    export class Response extends MResponseConstructorInternal {}
    export class Promise extends MPromiseConstructorInternal {}
    export class IndexedArray<T> extends IndexedArrayConstructorInternal<T> {}
    export class HttpRoute extends HttpRouteConstructorInternal {}
    export class HttpApplication extends HttpApplicationConstructorInternal {}
    export class Enumerable<T> extends EnumerableConstructorInternal<T> {}
    export class Empty extends EmptyConstructorInternal {}
    export class ConstructorAssembler extends ConstructorAssemblerConstructorInternal {}
    export class BigFloat extends BigFloatConstructorInternal {}
    export class FileInfo extends FileInfoConstructorInternal {}
    export class FolderInfo extends FolderInfoConstructorInternal {}
    export class File extends MFileConstructorInternal {}
    export class Folder extends MFolderConstructorInternal {}
    export class AsyncTask extends AsyncTaskConstructorInternal {}
    export class AsyncLoop extends AsyncLoopConstructorInternal {}
    export const console: MConsole;
    export function xrequire(target: DotnetAssignable): DotnetHandler;
    export function xrequire(target: DotnetExternalAssignable): DotnetHandler;
    export const std: Std;
    export const require: (module: string) => any;
    export const load: (path: string, options?: Record<string, boolean>) => Record<string, any> | Record<string, any>[];
    export const http: Http;
    export const fs: Fs;
    export const environment: Environment;
    export const debug: Debug;
    export const data: Data;
    export const application: Application;
}