const chartOptions = {
  chart: {
    height: 200,
    type: 'radialBar',
    toolbar: {
      show: false,
    }
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      },
      dataLabels: {
        show: true,
        name: {
          show: false,
        },
        value: {
          color: "#f48118",
          fontSize: "20px",
          fontWeight: "800"
        }
      },
    },
  },
  stroke: {
    lineCap: 'round'
  },
  fill: {
    colors: ["#f48118"]
  },
  labels: ['Questions'],
};

export { chartOptions }