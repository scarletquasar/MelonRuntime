namespace MelonJs.Models.FileSystem
{
    public class MelonFile
    {
        public MelonFile(
            string path, 
            string encoding = "utf8", 
            long fileSizeLimit = 1000, 
            string[]? notAllowedFileNameExpressions = null,
            string[]? notAllowedFileExtensions = null)
        {
            if(File.Exists(path))
            {
                FilePath = path;
                Encoding = encoding;
                Bytes = File.ReadAllBytes(path);
                Name = Path.GetFileName(path);
                CreationTime = File.GetCreationTime(path);
                LastWriteTime = File.GetLastWriteTime(path);
                FileSizeLimit = fileSizeLimit;
                NotAllowedFileExtensions = notAllowedFileExtensions;
                NotAllowedFileNameExpressions = notAllowedFileNameExpressions;
            }
        }

        public string? Name { get; set; }
        public string? Content { get; set; }
        public byte[]? Bytes { get; set; }
        public string? Encoding { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastWriteTime { get; set; }
        public long FileSizeLimit { get; set; }
        public string[]? NotAllowedFileNameExpressions { get; set; }
        public string[]? NotAllowedFileExtensions { get; set; }
        public string? FilePath { get; set; }
    }
}