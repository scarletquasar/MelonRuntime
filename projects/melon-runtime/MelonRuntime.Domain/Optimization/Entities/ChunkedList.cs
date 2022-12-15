namespace MelonRuntime.Domain.Optimization.Entities
{
    public class ChunkedList<T> : LinkedList<LinkedList<T>>
    {
        public ChunkedList(IReadOnlyCollection<T> values, int groupQuantity)
        {
            var count = values is T[] v ? v.Length : values.Count();

            for (var i = 0; i < count; i += groupQuantity)
            {
                var even = new LinkedList<T>();

                for (int currentQuantity = 0; currentQuantity < groupQuantity; currentQuantity++)
                {
                    if (count > (i + currentQuantity))
                    {
                        var currentIndex = i + currentQuantity;
                        even.AddLast(values.ElementAt(currentIndex));
                    }
                }

                AddLast(even);
            }
        }
    }
}
