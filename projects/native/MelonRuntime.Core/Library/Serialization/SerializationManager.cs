using Newtonsoft.Json;

namespace MelonRuntime.Core.Library.Serialization
{
    public static class SerializationManager
    {
        public static string Serialize(object? value) 
        {
            return JsonConvert.SerializeObject(value);
        }

        public static object? Deserialize(string value) 
        {
            return JsonConvert.DeserializeObject(value);
        }
    }
}
