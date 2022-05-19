namespace MelonJs.Models.FileSystem
{
    public class MelonFile
    {
        public MelonFile(string path)
        {
            if(File.Exists(path))
            {
                Bytes = File.ReadAllBytes(path);
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
        public string? Path { get; set; }
    }
}