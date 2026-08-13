using System.Collections.Generic;

namespace BlazorDashboard.Models;

public class StatCardData
{
    public string Key { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
    public string Value { get; set; } = "";
    public string Trend { get; set; } = "";
    public string TrendType { get; set; } = "";
}

public class SecondaryStatData
{
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
    public string Value { get; set; } = "";
}

public class LineChartData
{
    public List<string> Months { get; set; } = new();
    public List<double> Vendas { get; set; } = new();
    public List<double> Meta { get; set; } = new();
}

public class PieSliceData
{
    public double Value { get; set; }
    public string Name { get; set; } = "";
}

public class BarChartData
{
    public List<string> Categories { get; set; } = new();
    public List<double> Values { get; set; } = new();
}

public class AreaChartData
{
    public List<string> Days { get; set; } = new();
    public List<double> Values { get; set; } = new();
}

public class DashboardData
{
    public List<StatCardData> Stats { get; set; } = new();
    public List<SecondaryStatData> SecondaryStats { get; set; } = new();
    public LineChartData LineChart { get; set; } = new();
    public List<PieSliceData> PieChart { get; set; } = new();
    public BarChartData BarChart { get; set; } = new();
    public AreaChartData AreaChart { get; set; } = new();
}
