<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsC
        class="mb-3"
        inverse
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
        inverse
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
        inverse
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
        inverse
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
