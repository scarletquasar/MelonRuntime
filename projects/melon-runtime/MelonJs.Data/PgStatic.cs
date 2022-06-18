using Npgsql;
using System.Data;
using Newtonsoft.Json;

namespace MelonJs.Data
{
    public static class PgStatic
    {
        public static int ExecuteNonQuery(string sql, string connectionString)
        {
            var connection = new NpgsqlConnection(connectionString);

            connection.Open();

            var command = new NpgsqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, string connectionString)
        {
            var connection = new NpgsqlConnection(connectionString);

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