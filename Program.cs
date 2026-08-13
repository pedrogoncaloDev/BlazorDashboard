using System;
using System.Net.Http;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorDashboard;
using Microsoft.Extensions.DependencyInjection; 
using MudBlazor.Services; 

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddHttpClient("DashboardApi", client =>
{
    client.BaseAddress = new Uri("http://localhost:3001/");
});

builder.Services.AddSingleton<ThemeService>();
builder.Services.AddMudServices();
await builder.Build().RunAsync();