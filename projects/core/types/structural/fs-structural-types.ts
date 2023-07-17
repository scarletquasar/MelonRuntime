type FsReadText = (path: string) => string;
type FsWriteText = (path: string, content: string) => void;
type FsReadBytes = (path: string) => number[];
type FsWriteBytes = (path: string, bytes: number[]) => void;
type FsReadTextAsync = (path: string) => Promise<string>;
type FsWriteTextAsync = (path: string, content: string) => Promise<void>;
type FsReadBytesAsync = (path: string) => Promise<number[]>;
type FsWriteBytesAsync = (path: string, bytes: number[]) => Promise<void>;
type FsDeleteFile = (path: string) => void;
type FsDeleteFileAsync = (path: string) => Promise<void>;
type FsMoveFile = (path: string, newPath: string) => void;
type FsMoveFileAsync = (path: string, newPath: string) => Promise<void>;
type FsCopyFile = (path: string, newPath: string) => void;
type FsCopyFileAsync = (path: string, newPath: string) => Promise<void>;
type FsRenameFile = (path: string, newName: string) => void;
type FsRenameFileAsync = (path: string, newName: string) => Promise<void>;
type FsCreateDirectory = (path: string) => void;
type FsCreateDirectoryAsync = (path: string) => Promise<void>;
type FsDeleteDirectory = (path: string) => void;
type FsDeleteDirectoryAsync = (path: string) => Promise<void>;
type FsRenameDirectory = (path: string, newName: string) => void;
type FsRenameDirectoryAsync = (path: string, newName: string) => Promise<void>;

export {
  FsReadText,
  FsWriteText,
  FsReadBytes,
  FsWriteBytes,
  FsReadTextAsync,
  FsWriteTextAsync,
  FsReadBytesAsync,
  FsWriteBytesAsync,
  FsDeleteFile,
  FsDeleteFileAsync,
  FsMoveFile,
  FsMoveFileAsync,
  FsCopyFile,
  FsCopyFileAsync,
  FsRenameFile,
  FsRenameFileAsync,
  FsCreateDirectory,
  FsCreateDirectoryAsync,
  FsDeleteDirectory,
  FsDeleteDirectoryAsync,
  FsRenameDirectory,
  FsRenameDirectoryAsync,
}