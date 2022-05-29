using System.Text;

namespace MelonJs.Static.Tools.Output
{
    public static class MelonConvert
    {
        public static byte[] FromStringToByteArray(string data, string encoding)
        {
            return encoding.ToUpperInvariant() switch
            {
                "UTF8" => Encoding.UTF8.GetBytes(data),
                "UTF7" => Encoding.UTF7.GetBytes(data),
                "UTF32" => Encoding.UTF32.GetBytes(data),
                "ASCII" => Encoding.ASCII.GetBytes(data),
                _ => Encoding.Unicode.GetBytes(data)
            };
        }

        public static string FromByteArrayToString(byte[] bytes, string encoding)
        {
            Console.WriteLine(encoding);

            return encoding.ToUpperInvariant() switch
            {
                "UTF8" => Encoding.UTF8.GetString(bytes),
                "UTF7" => Encoding.UTF7.GetString(bytes),
                "UTF32" => Encoding.UTF32.GetString(bytes),
                "ASCII" => Encoding.ASCII.GetString(bytes),
                _ => Encoding.Unicode.GetString(bytes)
            };
        }
    }
}
