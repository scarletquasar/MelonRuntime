using Newtonsoft.Json;

namespace Melon.Library.Static.Generic
{
    public static class Object
    {
        public static object Clone(object value)
        {
            return JsonConvert.DeserializeObject<object>(JsonConvert.SerializeObject(value))!;
        }
    }
}
