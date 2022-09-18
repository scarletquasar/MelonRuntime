using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace Melon.Library.Static.Database
{
    public static class SqlServerStatic
    {
        public static int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionString =
                $"Data Source={options.host},{options.port};"
                + $"Network Library=DBMSSOCN;"
                + $"Initial Catalog={options.database};"
                + $"User ID={options.user};"
                + $"Password={options.password};";

            var connection = new SqlConnection(connectionString);

            connection.Open();

            var command = new SqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public static string ExecuteQuery(string sql, dynamic options)
        {
            var connectionString =
                $"Data Source={options.host},{options.port};"
                + $"Network Library=DBMSSOCN;"
                + $"Initial Catalog={options.database};"
                + $"User ID={options.user};"
                + $"Password={options.password};";

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
