namespace MelonJs.JavaScript.Models.Web
{
    public class MelonPingReply
    {
        public MelonPingReply(List<float> results)
        {
            MaxLatency = results.Max();
            MinLatency = results.Min();
            AverageLatency = results.Average();

            Results = results;
        }

        public List<float> Results { get; set; }
        public float AverageLatency { get; set; }
        public float MaxLatency { get; set; }
        public float MinLatency { get; set; }
    }
}
