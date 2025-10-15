let dashboardCharts = {};

function initializeDashboardCharts(theme) {
    if (!window.echarts) {
        console.error("❌ ECharts não está carregado.");
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
        xAxis: { type: "category", boundaryGap: false, data: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"], axisLabel: { color: colors.text } },
        yAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        series: [
            { name: "Vendas", type: "line", data: [12000,15000,18000,22000,25000,28000,32000,35000,38000,42000,45000,48000], itemStyle: { color: "#3498db" }, smooth: true },
            { name: "Meta", type: "line", data: [10000,13000,17000,21000,25000,29000,33000,37000,41000,45000,49000,53000], itemStyle: { color: "#e74c3c" }, smooth: true }
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
            data: [
                { value: 35, name: "Eletrônicos" },
                { value: 25, name: "Roupas" },
                { value: 20, name: "Casa" },
                { value: 12, name: "Esportes" },
                { value: 8, name: "Livros" }
            ]
        }]
    };

    const barOption = {
        backgroundColor: colors.bg,
        title: { textStyle: { color: colors.text } },
        xAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        yAxis: { type: "category", data: ["Fone Bluetooth", "Smart TV", "Tênis Nike", "Notebook Dell", "iPhone 15"], axisLabel: { color: colors.text } },
        series: [{ type: "bar", data: [980, 1320, 1560, 1890, 2450], itemStyle: { color: "#3498db" } }]
    };

    const areaOption = {
        backgroundColor: colors.bg,
        title: { textStyle: { color: colors.text } },
        xAxis: { type: "category", boundaryGap: false, data: ["1", "5", "10", "15", "20", "25", "30"], axisLabel: { color: colors.text } },
        yAxis: { type: "value", axisLabel: { color: colors.text }, splitLine: { lineStyle: { color: colors.grid } } },
        series: [{
            type: "line",
            data: [1200,1800,2200,1900,2500,2800,3200],
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
    initializeDashboardCharts(theme);
}

function isEChartsLoaded() {
    return typeof echarts !== "undefined";
}

window.initializeDashboardCharts = initializeDashboardCharts;
window.updateDashboardChartsTheme = updateDashboardChartsTheme;
window.isEChartsLoaded = isEChartsLoaded;