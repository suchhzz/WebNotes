using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NoteDataAccess;
using NotesAPI.Abstractions;
using NotesAPI.Services;
using System.Security.Cryptography;
using System.Text;
using TokenOperations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<NotesDbContext>(o => 
    o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly("NotesAPI")));


builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(nameof(JwtOptions)));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtOptions:SecretKey").Value))
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.HttpContext.Request.Cookies["jwt"];

                context.Token = token;
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<NotesDbContext>();
builder.Services.AddScoped<INotesService, NotesService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<JwtOptions>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
        policy.AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.None,
    HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.Always
});

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
