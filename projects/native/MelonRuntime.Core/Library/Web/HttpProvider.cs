using DotnetFetch;
using DotnetFetch.Models;
using MelonRuntime.Domain.Core.Library.Web;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Dynamic;
using System.Text;
using System.Text.Json.Nodes;

namespace MelonRuntime.Core.Library.Web
{
    public static class HttpProvider
    {
        public static async Task<HttpRequestResponse> RequestAsync(
            string target, 
            string method, 
            string body, 
            string headers)
        {
            var task = Task.Factory.StartNew(() => Request(target, method, body, headers));
            return await task;
        }

        public static HttpRequestResponse Request(string target, string method, string body, string headers)
        {
            HttpResponseMessage result = new();

            var headerDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(headers);
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

            return new()
            {
                Body = result.Content.ReadAsStringAsync().Result,
                Headers = result.Headers,
                Latency = timer.ElapsedMilliseconds,
                Ok = result.IsSuccessStatusCode,
                StatusCode = ((int)result.StatusCode)
            };
        }

        public static Task<Response> Fetch(string resource, ExpandoObject? options = null)
        {
            var optionsString = JsonConvert.SerializeObject(options);
            var optionsBytes = Encoding.UTF8.GetBytes(optionsString);
            var optionsStream = new MemoryStream(optionsBytes);

            var json = (JsonObject)JsonNode.Parse(optionsStream)!;

            return GlobalFetch.Fetch(resource, json);
        }
    }
}
