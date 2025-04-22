using Microsoft.EntityFrameworkCore;
using Bookstore.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// ✅ CORS policy that supports both local and deployed frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBlah", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://wonderful-glacier-0aee09d1e.6.azurestaticapps.net" // ✅ your deployed frontend
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Make sure this matches the policy name above
app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
