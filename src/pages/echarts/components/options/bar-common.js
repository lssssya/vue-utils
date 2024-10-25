const color = {
  text: 'rgba(0, 0, 0, 0.7)',
  axis: 'rgba(0, 0, 0, 0.3)'
}
const commonOptions = {
  axisLine: {
    lineStyle: {
      color: color.axis
    }
  },
  splitLine: {
    lineStyle: {
      color: color.axis,
      type: 'dashed',
      opacity: 0.4
    }
  },
  axisLabel: {
    interval: 0,
    textStyle: {
      fontSize: 12,
      color: color.text
    }
  }
}

export default {
  dataset: {
    source: [
      { name: '1月', value: '820', max: 2000 },
      { name: '2月', value: '932', max: 2000 },
      { name: '3月', value: '901', max: 2000 },
      { name: '4月', value: '934', max: 2000 },
      { name: '5月', value: '1290', max: 2000 }
    ]
  },
  grid: {
    top: '10%',
    left: 48,
    right: 24,
    bottom: '8%'
  },
  xAxis: {
    type: 'category',
    containLabel: true,
    splitLine: { show: false },
    axisLine: commonOptions.axisLine,
    axisLabel: commonOptions.axisLabel,
    axisTick: { show: false }
  },
  yAxis: [
    {
      type: 'value',
      splitLine: commonOptions.splitLine,
      axisLine: commonOptions.axisLine,
      axisLabel: commonOptions.axisLabel,
      axisTick: { show: false }
    }
  ],
  series: [
    {
      encode: {
        x: 'name',
        y: 'value'
      },
      name: '人',
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: 'rgb(80, 162, 249)'
      }
    }
  ]
}
