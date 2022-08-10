using System.Diagnostics;
using System.Text.Json;
using Melon.Library.Models.Web;

namespace Melon.Library.Static.Web
{
    public static class Http
    {
        public static HttpResponse Request(string target, string method, string body, string headers)
        {
            HttpResponseMessage result = new();

            var headerDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(headers);
            var bodyObject = new StringContent(body);

            var client = new HttpClient
            {
                BaseAddress = new Uri(target)
            };

            foreach (var item in headerDictionary ?? new())
            {
                client.DefaultRequestHeaders.Add(item.Key, item.Value);
            }

            var timer = new Stopwatch();
            timer.Start();

            switch (method)
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

            timer.Stop();

            return new HttpResponse
            {
                Body = result.Content.ReadAsStringAsync().Result,
                Headers = result.Headers,
                Latency = timer.ElapsedMilliseconds,
                Ok = result.IsSuccessStatusCode,
                StatusCode = (uint)result.StatusCode
            };
        }
    }
}