using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace MelonJs.Data
{
    public static class SqlServerStatic
    {
        public static int ExecuteNonQuery(string sql, string connectionString)
        {
            var connection = new SqlConnection(connectionString);

            connection.Open();

            var command = new SqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, string connectionString)
        {
            var connection = new SqlConnection(connectionString);

            connection.Open();

            var command = new SqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }
    }
}