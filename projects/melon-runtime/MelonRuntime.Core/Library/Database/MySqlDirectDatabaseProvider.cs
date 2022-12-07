using MelonRuntime.Abstractions.Library.Database;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Data;

namespace MelonRuntime.Core.Library.Database
{
    public class MySqlDirectDatabaseProvider : IDirectDatabaseProvider
    {
        public int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new MySqlConnection(connectionString);

            connection.Open();

            var command = new MySqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public string ExecuteQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new MySqlConnection(connectionString);

            connection.Open();

            var command = new MySqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }

        private static string GetConnectionString(dynamic options)
        {
            var connectionParams = new MySqlConnectionStringBuilder
            {
                Server = options.host,
                Port = Convert.ToInt32(options.port),
                UserID = options.user,
                Database = options.database,
                Password = options.password
            };

            return connectionParams.ConnectionString;
        }
    }
}
