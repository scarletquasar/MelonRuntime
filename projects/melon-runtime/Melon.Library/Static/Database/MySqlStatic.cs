using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Data;

namespace Melon.Library.Static.Database
{
    public static class MySqlStatic
    {
        public static int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionParams = new MySqlConnectionStringBuilder
            {
                Server = options.host,
                Port = options.port,
                UserID = options.user,
                Database = options.database,
                Password = options.password
            };

            var connection = new MySqlConnection(connectionParams.ConnectionString);

            connection.Open();

            var command = new MySqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, dynamic options)
        {
            var connectionParams = new MySqlConnectionStringBuilder
            {
                Server = options.host,
                Port = options.port,
                UserID = options.user,
                Database = options.database,
                Password = options.password
            };

            var connection = new MySqlConnection(connectionParams.ConnectionString);

            connection.Open();

            var command = new MySqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }
    }
}
