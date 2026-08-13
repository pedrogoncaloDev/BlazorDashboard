let dashboardCharts = {};
let lastChartsData = null;

function initializeDashboardCharts(theme, data) {
    if (!window.echarts) {
        console.error("❌ ECharts não está carregado.");
        return;
    }

    if (data) {
        lastChartsData = data;
    } else {
        data = lastChartsData;
    }

    if (!data) {
        console.error("❌ Nenhum dado de gráfico disponível.");
        return;
    }

    const colors = theme === "dark" ? {
        text: "#f0f0f0",
        grid: "#555",
        bg: "transparent"
    } : {
        text: "#2c3e50",
        grid: "#ddd",
        bg: "transparent"
    };

    const lineOption = {
        backgroundColor: colors.bg,
        title: { textStyle: { color: colors.text } },
        tooltip: { trigger: "axis" },
        legend: { data: ["Vendas", "Meta"], textStyle: { color: colors.text } },
        xAxis: { type: "category", boundaryGap: false, data: data.lineChart.months, axisLabel: { color: colors.text } },
        yAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        series: [
            { name: "Vendas", type: "line", data: data.lineChart.vendas, itemStyle: { color: "#3498db" }, smooth: true },
            { name: "Meta", type: "line", data: data.lineChart.meta, itemStyle: { color: "#e74c3c" }, smooth: true }
        ]
    };

    const pieOption = {
        backgroundColor: colors.bg,
        title: { left: "center", textStyle: { color: colors.text } },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left", textStyle: { color: colors.text } },
        series: [{
            type: "pie",
            radius: "50%",
            data: data.pieChart
        }]
    };

    const barOption = {
        backgroundColor: colors.bg,
        title: { textStyle: { color: colors.text } },
        xAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        yAxis: { type: "category", data: data.barChart.categories, axisLabel: { color: colors.text } },
        series: [{ type: "bar", data: data.barChart.values, itemStyle: { color: "#3498db" } }]
    };

    const areaOption = {
        backgroundColor: colors.bg,
        title: { textStyle: { color: colors.text } },
        xAxis: { type: "category", boundaryGap: false, data: data.areaChart.days, axisLabel: { color: colors.text } },
        yAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        series: [{
            type: "line",
            data: data.areaChart.values,
            areaStyle: { color: "rgba(52,152,219,0.3)" },
            itemStyle: { color: "#3498db" },
            smooth: true
        }]
    };

    dashboardCharts.lineChart = echarts.init(document.getElementById("lineChart"));
    dashboardCharts.pieChart = echarts.init(document.getElementById("pieChart"));
    dashboardCharts.barChart = echarts.init(document.getElementById("barChart"));
    dashboardCharts.areaChart = echarts.init(document.getElementById("areaChart"));

    dashboardCharts.lineChart.setOption(lineOption);
    dashboardCharts.pieChart.setOption(pieOption);
    dashboardCharts.barChart.setOption(barOption);
    dashboardCharts.areaChart.setOption(areaOption);

    window.addEventListener("resize", () => {
        Object.values(dashboardCharts).forEach(c => c && c.resize());
    });
}

function updateDashboardChartsTheme(theme) {
    initializeDashboardCharts(theme, null);
}

function isEChartsLoaded() {
    return typeof echarts !== "undefined";
}

window.initializeDashboardCharts = initializeDashboardCharts;
window.updateDashboardChartsTheme = updateDashboardChartsTheme;
window.isEChartsLoaded = isEChartsLoaded;
