var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
  options.AddPolicy(
    name: MyAllowSpecificOrigins,
    policy => policy.WithOrigins().AllowAnyOrigin()
  );
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

//app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
