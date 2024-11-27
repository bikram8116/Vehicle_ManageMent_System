using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly VehicleRepository _vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllVehicles()
    {
        var vehicles = await _vehicleRepository.GetAllVehiclesAsync();
        return Ok(vehicles);
    }
    [HttpGet("{id}")]
public async Task<IActionResult> GetVehicleById(int id)
{
    var vehicle = await _vehicleRepository.GetVehicleByIdAsync(id);
    if (vehicle == null)
    {
        return NotFound("Vehicle not found");
    }
    return Ok(vehicle);  // Returns the vehicle with 200 OK if found
}


    [HttpPost]
    public async Task<IActionResult> AddVehicle([FromBody] Vehicle vehicle)
    {
        var result = await _vehicleRepository.AddVehicleAsync(vehicle);
        return Ok(result);
    }

     [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody] Vehicle vehicle)
    {
        // if (vehicle.Id != id)
        // {
        //     return BadRequest("Vehicle ID mismatch");
        // }

        var result = await _vehicleRepository.UpdateVehicleAsync(vehicle);
        if (result == 0)
        {
            return NotFound("Vehicle not found");
        }
        return NoContent();  // Returns 204 No Content if the update is successful
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        var result = await _vehicleRepository.DeleteVehicleAsync(id);
        return Ok(result);
    }
}
