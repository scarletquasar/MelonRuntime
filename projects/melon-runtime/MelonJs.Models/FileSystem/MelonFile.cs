namespace MelonJs.Models.FileSystem
{
    public class MelonFile
    {
        public MelonFile(string? path = null)
        {
            if(path != null && File.Exists(path))
            {
                FilePath = path;
                Encoding = "utf-8";
                Bytes = File.ReadAllBytes(path);
                Name = Path.GetFileName(path);
                CreationTime = File.GetCreationTime(path);
                LastWriteTime = File.GetLastWriteTime(path);
                return;
            }

            throw new Exception($"Invalid path \"${path}\"");
        }

        public string? Name { get; set; }
        public byte[]? Bytes { get; set; }
        public string? Encoding { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastWriteTime { get; set; }
        public string? FilePath { get; set; }
    }
}