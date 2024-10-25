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
  xAxis: {
    type: 'value',
    axisLabel: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: {
      inside: true,
      formatter: (name, index) => {
        return `{value|${ name }}`
      },
      rich: {
        value: {
          fontSize: 14,
          padding: [0, 0, 0, -32]
        }
      }
    }
  },
  series: [
    {
      silent: true,
      name: 'data',
      type: 'bar',
      encode: {
        y: 'name',
        x: 'value'
      },
      z: 10,
      barWidth: 10,
      itemStyle: {
        barBorderRadius: 5
      }
    },
    {
      silent: true,
      name: 'background',
      type: 'bar',
      encode: {
        y: 'name',
        x: 'max'
      },
      z: 3,
      barWidth: 10,
      barGap: '-100%',
      label: {
        show: true,
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 14,
        offset: [4, -16],
        position: 'insideRight',
        formatter: params => {
          return `${ params.data.value }`
        }
      },
      itemStyle: {
        normal: {
          color: '#E4E9ED',
          barBorderRadius: 5
        }
      }
    }
  ]
}
