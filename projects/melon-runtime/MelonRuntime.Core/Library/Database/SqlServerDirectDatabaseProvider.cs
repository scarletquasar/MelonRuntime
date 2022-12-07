using MelonRuntime.Abstractions.Library.Database;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace MelonRuntime.Core.Library.Database
{
    public class SqlServerDirectDatabaseProvider : IDirectDatabaseProvider
    {
        public int ExecuteNonQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new SqlConnection(connectionString);

            connection.Open();

            var command = new SqlCommand(sql, connection);
            var result = command.ExecuteNonQuery();

            connection.Close();

            return result;
        }

        public string ExecuteQuery(string sql, dynamic options)
        {
            var connectionString = GetConnectionString(options);
            var connection = new SqlConnection(connectionString);

            connection.Open();

            var command = new SqlCommand(sql, connection);
            var reader = command.ExecuteReader();
            var result = new DataTable();

            result.Load(reader);

            connection.Close();

            return JsonConvert.SerializeObject(result);
        }

        private static string GetConnectionString(dynamic options)
        {
            return $"Data Source={options.host},{options.port};"
                + $"Network Library=DBMSSOCN;"
                + $"Initial Catalog={options.database};"
                + $"User ID={options.user};"
                + $"Password={options.password};";
        }
    }
}
