using MelonJs.JavaScript.Models.Web;
using System.Net.Http.Headers;
using System.Text.Json;

namespace MelonJs.JavaScript.Tools.Web
{
    public static class MelonHttp
    {
        public static MelonHttpResponse Request(string target, string method, string body, string headers)
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
                    result = client.GetAsync(target).Result;
                    break;

                case "POST":
                    result = client.PostAsync(target, bodyObject).Result;
                    break;

                case "PUT":
                    result = client.PutAsync(target, bodyObject).Result;
                    break;

                case "PATCH":
                    result = client.PatchAsync(target, bodyObject).Result;
                    break;

                case "DELETE":
                    result = client.DeleteAsync(target).Result;
                    break;
            } 

            return new MelonHttpResponse
            {
                Response = result.Content.ReadAsStringAsync().Result,
                Headers = result.Headers
            };
        }
    }
}