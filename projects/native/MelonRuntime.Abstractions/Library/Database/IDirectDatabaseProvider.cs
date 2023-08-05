namespace MelonRuntime.Abstractions.Library.Database
{
    public interface IDirectDatabaseProvider
    {
        public int ExecuteNonQuery(string sql, dynamic options);
        public string ExecuteQuery(string sql, dynamic options);
    }
}
