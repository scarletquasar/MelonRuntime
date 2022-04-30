namespace MelonJs.JavaScript.Models.Web
{
    public class MelonPingReply
    {
        public MelonPingReply(List<float> results)
        {
            if(results != null)
            {
                MaxLatency = results.Max();
                MinLatency = results.Min();
                AverageLatency = results.Average();

                Results = results;
                return;
            }

            MaxLatency = 0;
            MinLatency = 0;
            AverageLatency = 0;

            Results = new();
        }

        public List<float> Results { get; set; }
        public float AverageLatency { get; set; }
        public float MaxLatency { get; set; }
        public float MinLatency { get; set; }
    }
}
