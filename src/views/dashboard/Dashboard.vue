<script setup>
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import MainChart from './MainChart.vue'
import WidgetsStatsA from './../widgets/WidgetsStatsTypeA.vue'

const tableExample = [
  {
    name: 'Test Auto 1',
    image: { src: avatar1, status: 'success' },
    createdAt: '01.05.2024 10:05:00',
  },
  {
    name: 'Test Auto 2',
    image: { src: avatar2, status: 'success' },
    createdAt: '02.05.2024 10:05:00',
  },
  {
    name: 'Test Auto 3',
    image: { src: avatar3, status: 'success' },
    createdAt: '03.05.2024 10:05:00',
  },
  {
    name: 'Test Auto 4',
    image: { src: avatar4, status: 'success' },
    createdAt: '04.05.2024 10:05:00',
  },
  {
    name: 'Test Auto 5',
    image: { src: avatar5, status: 'success' },
    createdAt: '05.05.2024 10:05:00',
  },
]
</script>

<template>
  <div>
    <WidgetsStatsA class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Statistik</h4>
                <div class="small text-body-secondary">Januar - Dezember 2024</div>
              </CCol>
            </CRow>
            <CRow>
              <MainChart style="height: 600px; max-height: 600px; margin-top: 40px" />
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow
              :xs="{ cols: 1, gutter: 4 }"
              :sm="{ cols: 2 }"
              :lg="{ cols: 4 }"
              :xl="{ cols: 5 }"
              class="mb-2 text-center"
            >
              <CCol>
                <div class="text-body-secondary">Neue Inserate</div>
                <div class="fw-semibold text-truncate">100 heute</div>
                <CProgress class="mt-2" color="success" thin :precision="1" :value="40" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Neue Inserate</div>
                <div class="fw-semibold text-truncate">105 gestern</div>
                <CProgress class="mt-2" color="info" thin :precision="1" :value="20" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Neue Inserate</div>
                <div class="fw-semibold text-truncate">200 in 7 Tagen</div>
                <CProgress class="mt-2" color="info" thin :precision="1" :value="20" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Neue Inserate</div>
                <div class="fw-semibold text-truncate">230 in 14 Tagen</div>
                <CProgress class="mt-2" color="warning" thin :precision="1" :value="60" />
              </CCol>
              <CCol>
                <div class="text-body-secondary">Neue Inserate</div>
                <div class="fw-semibold text-truncate">20 in 30 Tagen</div>
                <CProgress class="mt-2" color="danger" thin :precision="1" :value="80" />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Letzte 5 Inserate </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary"> Name </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary"> Datum </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in tableExample" :key="item.name">
                  <CTableDataCell class="text-center">
                    <CAvatar size="md" :src="item.image.src" :status="item.image.status" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{{ item.name }}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="fw-semibold text-nowrap">
                      {{ item.createdAt }}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
