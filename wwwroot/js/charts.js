let dashboardCharts = {};

function initializeDashboardCharts(options) {
    try {
        console.log('Inicializando gráficos do dashboard...');
        
        // Gráfico de Linha
        const lineChartElement = document.getElementById('lineChart');
        if (lineChartElement) {
            dashboardCharts.lineChart = echarts.init(lineChartElement);
            dashboardCharts.lineChart.setOption(options.lineChart);
            console.log('Gráfico de linha inicializado');
        }

        // Gráfico de Pizza
        const pieChartElement = document.getElementById('pieChart');
        if (pieChartElement) {
            dashboardCharts.pieChart = echarts.init(pieChartElement);
            dashboardCharts.pieChart.setOption(options.pieChart);
            console.log('Gráfico de pizza inicializado');
        }

        // Gráfico de Barras
        const barChartElement = document.getElementById('barChart');
        if (barChartElement) {
            dashboardCharts.barChart = echarts.init(barChartElement);
            dashboardCharts.barChart.setOption(options.barChart);
            console.log('Gráfico de barras inicializado');
        }

        // Gráfico de Área
        const areaChartElement = document.getElementById('areaChart');
        if (areaChartElement) {
            dashboardCharts.areaChart = echarts.init(areaChartElement);
            dashboardCharts.areaChart.setOption(options.areaChart);
            console.log('Gráfico de área inicializado');
        }

        // Redimensionar gráficos quando a janela mudar de tamanho
        window.addEventListener('resize', function() {
            Object.values(dashboardCharts).forEach(chart => {
                if (chart && !chart.isDisposed()) {
                    chart.resize();
                }
            });
        });

        console.log('Todos os gráficos inicializados com sucesso');
        
    } catch (error) {
        console.error('Erro ao inicializar gráficos:', error);
    }
}

function updateDashboardChartsTheme(options) {
    try {
        console.log('Atualizando tema dos gráficos...');
        
        if (dashboardCharts.lineChart && !dashboardCharts.lineChart.isDisposed()) {
            dashboardCharts.lineChart.setOption(options.lineChart);
        }
        if (dashboardCharts.pieChart && !dashboardCharts.pieChart.isDisposed()) {
            dashboardCharts.pieChart.setOption(options.pieChart);
        }
        if (dashboardCharts.barChart && !dashboardCharts.barChart.isDisposed()) {
            dashboardCharts.barChart.setOption(options.barChart);
        }
        if (dashboardCharts.areaChart && !dashboardCharts.areaChart.isDisposed()) {
            dashboardCharts.areaChart.setOption(options.areaChart);
        }
        
        console.log('Tema dos gráficos atualizado');
    } catch (error) {
        console.error('Erro ao atualizar tema dos gráficos:', error);
    }
}

// Função para verificar se ECharts está carregado
function isEChartsLoaded() {
    return typeof echarts !== 'undefined';
}