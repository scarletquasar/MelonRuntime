using System.Data;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace MelonJs.Data
{
    public static class MySqlStatic
    {
        public static int ExecuteNonQuery(string sql, string connectionString)
        {
            var connection = new MySqlConnection(connectionString);

            connection.Open();

            var command = new MySqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, string connectionString)
        {
            var connection = new MySqlConnection(connectionString);

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