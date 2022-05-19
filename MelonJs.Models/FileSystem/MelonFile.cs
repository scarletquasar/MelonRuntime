using System.Text.Json.Serialization;

namespace MelonJs.Models.FileSystem
{
    public class MelonFile
    {
        public MelonFile(string path)
        {
            if(File.Exists(path))
            {
                FilePath = path;
                Encoding = "ascii";
                Bytes = File.ReadAllBytes(path);
                Name = Path.GetFileName(path);
                CreationTime = File.GetCreationTime(path);
                LastWriteTime = File.GetLastWriteTime(path);
                return;
            }

            //IMPLEMENT THROW IF FILE NOT EXISTS
        }

        public string? Name { get; set; }
        public byte[]? Bytes { get; set; }
        public string? Encoding { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastWriteTime { get; set; }
        public string? FilePath { get; set; }
    }
}