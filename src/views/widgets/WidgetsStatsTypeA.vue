<script setup>
import { onMounted, ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils'

const widgetChartRef1 = ref()
const widgetChartRef2 = ref()

onMounted(() => {
  document.documentElement.addEventListener('ColorSchemeChange', () => {
    if (widgetChartRef1.value) {
      widgetChartRef1.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
      widgetChartRef1.value.chart.update()
    }

    if (widgetChartRef2.value) {
      widgetChartRef2.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
      widgetChartRef2.value.chart.update()
    }
  })
})
</script>

<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC
        class="mb-3"
        color="info"
        value="1005"
        :progress="{ color: 'light', value: 100 }"
        title="Inserate"
      >
        <template #icon><CIcon icon="cil-pencil" height="36" /></template>
        <template #title>Inserate</template>
      </CWidgetStatsC>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC
        class="mb-3"
        color="secondary"
        value="50"
        :progress="{ color: 'light', value: 100 }"
        title="Eigenschaften"
      >
        <template #icon><CIcon icon="cil-puzzle" height="36" /></template>
        <template #title>Eigenschaften</template>
      </CWidgetStatsC>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC
        class="mb-3"
        color="success"
        value="50"
        :progress="{ color: 'light', value: 100 }"
        title="Eigenschaften Optionen"
      >
        <template #icon><CIcon icon="cil-star" height="36" /></template>
        <template #title>Eigenschaften Optionen</template>
      </CWidgetStatsC>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC
        class="mb-3"
        color="danger"
        value="50"
        :progress="{ color: 'light', value: 100 }"
        title="Admin"
      >
        <template #icon><CIcon icon="cil-people" height="36" /></template>
        <template #title>Admin</template>
      </CWidgetStatsC>
    </CCol>
  </CRow>
</template>
