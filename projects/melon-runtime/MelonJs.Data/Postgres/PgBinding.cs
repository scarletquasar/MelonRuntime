using Npgsql;
using System.Data;

namespace MelonJs.Data.Postgres
{
    public class PgBinding
    {
        private readonly NpgsqlConnection _connection;
        public List<string> _blockedExpressions = new();

        public PgBinding(string connectionString, List<string> blockedExpressions)
        {
            _connection = new NpgsqlConnection(connectionString);
            _blockedExpressions = blockedExpressions;
        }

        public int ExecuteNonQuery(string sql)
        {
            _connection.Open();

            if (_blockedExpressions.Contains(sql))
            {
                throw new Exception("Blocked expressions are not allowed.");
            }

            var command = new NpgsqlCommand(sql, _connection);
            var result = command.ExecuteNonQuery();

            _connection.Close();

            return result;  
        }

        public DataTable ExecuteQuery(string sql)
        {
            _connection.Open();

            if (_blockedExpressions.Contains(sql))
            {
                throw new Exception("Blocked expressions are not allowed.");
            }

            var command = new NpgsqlCommand(sql, _connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            _connection.Close();

            return result;
        }
    }
}
