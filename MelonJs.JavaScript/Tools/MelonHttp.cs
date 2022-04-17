using System.Net.Http.Headers;
using System.Text.Json;

namespace MelonJs.JavaScript.Tools
{
    public static class MelonHttp
    {
        public static async Task<string> Fetch(
            string target, 
            string method = "GET", 
            string body = "{}",
            string headers = "{}")
        {
            HttpResponseMessage result = new();

            var headerDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(headers);
            var bodyObject = new StringContent(body);

            var client = new HttpClient
            {
                BaseAddress = new Uri(target)
            };

            foreach(var item in headerDictionary ?? new())
            {
                client.DefaultRequestHeaders.Add(item.Key, item.Value);
            }

            switch(method)
            {
                case "GET":
                    result = await client.PostAsync(target, bodyObject);
                    break;
            } 

            return JsonSerializer.Serialize(result);
        }
    }
}