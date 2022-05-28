using System.Linq;

namespace MelonJs.Models.FileSystem
{
    public class MelonFolder
    {
        public MelonFolder(string? path = null)
        {
            if(path != null && Directory.Exists(path))
            {
                FolderPath = path;
                Name = Path.GetDirectoryName(path);
                Content = Directory.GetFiles(path)
                                   .Select(x => new MelonFile(x))
                                   .ToList();
            }
        }

        public string? Name { get; set; }
        public List<MelonFile>? Content { get; set; }
        public string? FolderPath { get; set; }
    }
}
