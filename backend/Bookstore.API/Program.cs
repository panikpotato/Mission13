using Microsoft.EntityFrameworkCore;
using Bookstore.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// ✅ CORS policy for local and deployed frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBlah", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://your-frontend-site.com" // optional: replace with actual if deployed
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

app.UseCors("AllowReactAppBlah");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
