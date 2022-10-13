using Npgsql;
using System.Data;
using Newtonsoft.Json;

namespace Melon.Library.Static.Database
{
    public static class PgStatic
    {
        public static int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionParams = new NpgsqlConnectionStringBuilder
            {
                Host = options.host,
                Port = Convert.ToInt32(options.port),
                Username = options.user,
                Database = options.database,
                Password = options.password
            };

            var connection = new NpgsqlConnection(connectionParams.ConnectionString);

            connection.Open();

            var command = new NpgsqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, dynamic options)
        {
            var connectionParams = new NpgsqlConnectionStringBuilder
            {
                Host = options.host,
                Port = Convert.ToInt32(options.port),
                Username = options.user,
                Database = options.database,
                Password = options.password
            };

            var connection = new NpgsqlConnection(connectionParams.ConnectionString);

            connection.Open();

            var command = new NpgsqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }
    }
}
