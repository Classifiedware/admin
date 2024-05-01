<script setup>
import { ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils'

const mainChartRef = ref()
const data = {
  labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  datasets: [
    {
      label: 'Inserate',
      backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
      data: [
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        1100,
        1200,
      ],
    },
  ],
}
</script>

<template>
  <CChart
    type="bar"
    :data="data"
    labels="months"
    ref="mainChartRef" />
</template>
