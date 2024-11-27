using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

public class VehicleRepository
{
    private readonly string _connectionString;

    public VehicleRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("VehicleDb");
    }

    public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            return await connection.QueryAsync<Vehicle>("GetAllVehicles", commandType: CommandType.StoredProcedure);
        }
    }
    public async Task<Vehicle> GetVehicleByIdAsync(int id)
{
    using (var connection = new SqlConnection(_connectionString))
    {
        var parameters = new { Id = id };
        return await connection.QueryFirstOrDefaultAsync<Vehicle>("GetVehicleById", parameters, commandType: CommandType.StoredProcedure);
    }
}


    public async Task<int> AddVehicleAsync(Vehicle vehicle)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var parameters = new
            {
                vehicle.CarModel,
                vehicle.CarMake,
                vehicle.YearOfMfg,
                vehicle.BasePrice
            };
            return await connection.ExecuteAsync("AddVehicle", parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<int> UpdateVehicleAsync(Vehicle vehicle)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var parameters = new
            {
                vehicle.Id,
                vehicle.CarModel,
                vehicle.CarMake,
                vehicle.YearOfMfg,
                vehicle.BasePrice
            };
            return await connection.ExecuteAsync("UpdateVehicle", parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<int> DeleteVehicleAsync(int id)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            return await connection.ExecuteAsync("DeleteVehicle", new { Id = id }, commandType: CommandType.StoredProcedure);
        }
    }
}
