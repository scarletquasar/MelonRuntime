using System.Text;

namespace MelonJs.Static.Tools.Output
{
    public static class MelonConvert
    {
        public static byte[] ToByteArray(string data, string encoding)
        {
            return encoding.ToUpperInvariant() switch
            {
                "UTF8" => Encoding.UTF8.GetBytes(data),
                "UTF7" => Encoding.UTF7.GetBytes(data),
                "UTF32" => Encoding.UTF32.GetBytes(data),
                "ASCII" => Encoding.ASCII.GetBytes(data),
                _ => Encoding.Unicode.GetBytes(data),
            };
        }
    }
}
