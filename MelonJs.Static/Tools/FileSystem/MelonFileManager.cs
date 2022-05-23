namespace MelonJs.Static.Tools.FileSystem
{
    public static class MelonFileManager
    {
        public static void Copy(string from, string to)
        {
            if(File.Exists(from))
            {
                File.Copy(from, to);
                return;
            }

            throw new Exception($"Copy failed. The target file \"{from}\" does not exist.");
        }

        public static void Move(string from, string to)
        {
            if (File.Exists(from))
            {
                File.Move(from, to);
                return;
            }

            throw new Exception($"Move failed. The target file \"{from}\" does not exist.");
        }

        public static void Delete(string target)
        {
            if (File.Exists(target))
            {
                File.Delete(target);
                return;
            }

            throw new Exception($"Delete failed. The target file \"{target}\" does not exist.");
        }

        public static void WriteBytes(string path, byte[] bytes)
        {
            File.WriteAllBytes(path, bytes);
        }

        public static void WriteText(string path, string text)
        {
            File.WriteAllText(path, text);
        }

        public static string ReadText(string target)
        {
            if (File.Exists(target))
            {
                return File.ReadAllText(target);
            }

            throw new Exception($"Read failed. The target file \"{target}\" does not exist.");
        }
    }
}
