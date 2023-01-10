var builder = WebApplication.CreateBuilder(args);
var LocalHost = "localhost";
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: LocalHost,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
