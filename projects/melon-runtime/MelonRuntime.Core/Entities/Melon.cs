using Esprima;
using Jint;
using Jint.Native;
using Jint.Runtime;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.JavaScript;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using Newtonsoft.Json;
using MelonRuntime.JintExtensions;

namespace MelonRuntime.Core.Entities
{
    public class Melon : IMelon<JsValue>, IDisposable
    {
        private readonly IJavaScriptEngine<JsValue> _engineProvider;
        private readonly ObservableCollection<JsValue> _output;
        private readonly ObservableCollection<Exception> _runtimeErrors;
        private readonly ObservableCollection<Exception> _externalErrors;
        private readonly Dictionary<string, IRealm> _realms;
        private readonly Dictionary<string, object> _environmentVariables;

        public Melon(IJavaScriptEngine<JsValue> engineProvider)
        {
            _engineProvider = engineProvider;
            _output = new();
            _runtimeErrors = new();
            _externalErrors = new();
            _realms = new Dictionary<string, IRealm>();
            _environmentVariables = new();
        }

        public Melon()
        {
            _engineProvider = new JintProvider();
            _output = new();
            _runtimeErrors = new();
            _externalErrors = new();
            _realms = new Dictionary<string, IRealm>();
            _environmentVariables = new();
        }

        public void LoadFile(string path, bool isModule)
        {
            if(!isModule)
            {
                var content = File.ReadAllText(path);
                SendInstructions(content);
                return;
            }

            try
            {
                _engineProvider.ImportModule(path);
            }
            catch (Exception e) when (e is ParserException || e is JavaScriptException)
            {
                _runtimeErrors.Add(e);
            }
            catch (Exception e)
            {
                _externalErrors.Add(e);
            }
        }

        public JsValue InteropInvoke(JsValue target)
        {
            return _engineProvider.InteropInvoke(target);
        }

        public void Dispose()
        {
            _output.Clear();
            _runtimeErrors.Clear();
            _externalErrors.Clear();

            GC.SuppressFinalize(this);

            ((IDisposable)_engineProvider).Dispose();
        }

        public string? EvaluateInstructions(string instructions)
        {
            return HandleInstructions(instructions);
        }

        public JsValue EvaluateInstructionsDirectly(string instructions)
        {
            return _engineProvider.EvaluateInstructions(instructions);
        }

        public void SendInstructions(string instructions)
        {
            HandleInstructions(instructions);
        }

        public Dictionary<string, object> GetEnvironmentVariables()
        {
            return _environmentVariables;
        }

        public Dictionary<string, IRealm> GetRealms()
        {
            return _realms;
        }

        public List<Exception> GetRuntimeErrors()
        {
            return _runtimeErrors.ToList(); 
        }

        public List<Exception> GetExternalErrors()
        {
            return _externalErrors.ToList();
        }

        public List<JsValue> GetOutput()
        {
            return _output.ToList();
        }

        private string? HandleInstructions(string instructions)
        {
            JsValue output = JsValue.Undefined;
            Exception? runtimeError = null;
            Exception? externalError = null;

            try
            {
                output = _engineProvider.EvaluateInstructions(instructions);

                _output.Add(output);
            }
            catch (Exception e) when (e is ParserException || e is JavaScriptException)
            {
                _runtimeErrors.Add(e);
            }
            catch (Exception e)
            {
                _externalErrors.Add(e);
            }

            string? finalOutput = null;

            if (output.IsNumber()) finalOutput = output.AsNumber().ToString();
            if (output.IsBoolean()) finalOutput = output.AsBoolean().ToString();
            if (output.IsRegExp()) finalOutput = output.AsRegExp().ToString();

            return finalOutput?.ToString() ?? runtimeError?.ToString() ?? externalError?.ToString();
        }

        public void AddOutputAction(Action<object> action)
        {
            _output.CollectionChanged += new NotifyCollectionChangedEventHandler(
                delegate (object? sender, NotifyCollectionChangedEventArgs e)
                {
                    if (e.Action == NotifyCollectionChangedAction.Add)
                    {
                        var value = "undefined";
                        var output = _output.Last();

                        if (output.IsNumber()) value = output.AsNumber().ToString();
                        if (output.IsBoolean()) value = output.AsBoolean().ToString();
                        if (output.IsRegExp()) value = output.AsRegExp().ToString();
                        if (output.IsString()) value = output.AsString();

                        if (output.IsObject())
                        {
                            try
                            {
                                value = JsonConvert.SerializeObject(output.AsDictionary(false));
                            }
                            catch
                            {
                                value = output.AsFunctionString();
                            }
                        }

                        if (output.IsArray()) value = output.AsArray().ToString();

                        action(value);
                    }
                }
            );
        }

        public void AddRuntimeErrorAction(Action<Exception> action)
        {
            _runtimeErrors.CollectionChanged += new NotifyCollectionChangedEventHandler(
                delegate (object? sender, NotifyCollectionChangedEventArgs e)
                {
                    if (e.Action == NotifyCollectionChangedAction.Add)
                    {
                        foreach (dynamic item in e.NewItems!)
                        {
                            action(item);
                        }
                    }
                }
            );
        }

        public void AddExternalErrorAction(Action<Exception> action)
        {
            _externalErrors.CollectionChanged += new NotifyCollectionChangedEventHandler(
                delegate (object? sender, NotifyCollectionChangedEventArgs e)
                {
                    if (e.Action == NotifyCollectionChangedAction.Add)
                    {
                        foreach (dynamic item in e.NewItems!)
                        {
                            action(item);
                        }
                    }
                }
            );
        }

        public void SetInteropValue(string identifier, object value)
        {
            _engineProvider.SetInteropValue(identifier, value);
        }
    }
}