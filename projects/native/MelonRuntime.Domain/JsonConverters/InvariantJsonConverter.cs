using Newtonsoft.Json;

namespace MelonRuntime.Domain.JsonConverters
{
    public class InvariantJsonConverter<T> : JsonConverter<T>
    {
#pragma warning disable CS8765
        public override T ReadJson(JsonReader reader, Type objectType,
#pragma warning restore CS8765 
        T existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS8765 
        public override void WriteJson(JsonWriter writer,
#pragma warning restore CS8765 
        T value, JsonSerializer serializer)
        {
            writer.WriteRawValue(value?.ToString());
        }
    }
}