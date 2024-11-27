var builder = WebApplication.CreateBuilder(args);

// Add CORS services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
       
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Register the repository
builder.Services.AddSingleton<VehicleRepository>();

// Register the controllers
builder.Services.AddControllers();

var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
