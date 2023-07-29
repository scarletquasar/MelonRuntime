using MelonRuntime.Abstractions.Library.Database;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace MelonRuntime.Core.Library.Database
{
    public class PostgreSQLDirectDatabaseProvider : IDirectDatabaseProvider
    {
        public int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new NpgsqlConnection(connectionString);

            connection.Open();

            var command = new NpgsqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public string ExecuteQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new NpgsqlConnection(connectionString);

            connection.Open();

            var command = new NpgsqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }

        private static string GetConnectionString(dynamic options)
        {
            var connectionParams = new NpgsqlConnectionStringBuilder
            {
                Host = options.host,
                Port = Convert.ToInt32(options.port),
                Username = options.user,
                Database = options.database,
                Password = options.password
            };

            return connectionParams.ConnectionString;
        }
    }
}
