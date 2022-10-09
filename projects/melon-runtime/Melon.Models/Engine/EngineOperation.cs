using Jint.Native;

namespace Melon.Models.Engine
{
    public class EngineOperation : IDisposable
    {
        private string _operationBase;
        private List<string> _operationItems;
        private readonly Jint.Engine _engine;

        public EngineOperation(Jint.Engine engine)
        {
            _operationBase = string.Empty;
            _operationItems = new();
            _engine = engine;
        }

        public EngineOperation WithBase(string baseName)
        {
            _operationBase = baseName;
            return this;
        }

        public EngineOperation WithProperty(string property)
        {
            _operationItems.Add($"['{property}']");
            return this;
        }

        public void Set(string value)
        {
            _operationItems.Add(" = " + value);
            var finalOperation = _operationBase + string.Join("", _operationItems);
            _engine.Execute(finalOperation);
        }

        public T As<T>()
        {
            var finalOperation = _operationBase + string.Join("", _operationItems);

            if (typeof(T) == typeof(sbyte))
            {
                return (T)(object)Convert.ToSByte(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(byte))
            {
                return (T)(object)Convert.ToByte(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(short))
            {
                return (T)(object)Convert.ToInt16(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(ushort))
            {
                return (T)(object)Convert.ToUInt16(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(int))
            {
                return (T)(object)Convert.ToInt32(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(uint))
            {
                return (T)(object)Convert.ToUInt32(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(long))
            {
                return (T)(object)Convert.ToInt64(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(ulong))
            {
                return (T)(object)Convert.ToUInt64(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(float))
            {
                return (T)(object)Convert.ToSingle(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(double))
            {
                return (T)(object)Convert.ToDouble(_engine.Evaluate(finalOperation));
            }

            if (typeof(T) == typeof(decimal))
            {
                return (T)(object)Convert.ToDecimal(_engine.Evaluate(finalOperation));
            }

            return (T)(object)_engine.Evaluate(finalOperation);
        }

        public void Dispose()
        {
            GC.Collect();
            GC.SuppressFinalize(this);
        }
    }
}
