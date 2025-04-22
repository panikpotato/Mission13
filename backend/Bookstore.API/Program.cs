using Microsoft.EntityFrameworkCore;
using Bookstore.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// ✅ UPDATED CORS to allow localhost AND deployed frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBlah", policy =>
    {
        policy.WithOrigins(
    "http://localhost:3000",
    "https://proud-sand-0a0a922fe.6.azurestaticapps.net" // Updated to match your actual frontend URL
)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah"); // ✅ Enable CORS
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
