using System.Text.Json.Serialization;

namespace MelonJs.Models.Project
{
    public class App
    {
        public App()
        {
            Name = "Default";
            Description = "Default";
            Author = "Victória Rose, Malu Rose";
            Version = "1.0.0.0";
            Website = "https://github.com/MelonRuntime/MelonJS";
            EntryPoint = "index.js";
        }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("author")]
        public string Author { get; set; }

        [JsonPropertyName("version")]
        public string Version { get; set; }

        [JsonPropertyName("website")]
        public string Website { get; set; }

        [JsonPropertyName("entryPoint")]
        public string EntryPoint { get; set; }
    }
}
