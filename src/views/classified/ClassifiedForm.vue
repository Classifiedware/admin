<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Classified Create/Edit</strong>
        </CCardHeader>
        <CCardBody>
            <CForm @submit.prevent="onSaveClassified">

              <CRow class="mb-3">
                <CFormLabel for="classifiedName" class="col-sm-2 col-form-label">Name</CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    id="classifiedName"
                    type="text"
                    placeholder="Ein Auto mit einer guten Ausstattung"
                  />
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedDescription" class="col-sm-2 col-form-label">Beschreibung</CFormLabel>
                <div class="col-sm-10">
                  <CFormTextarea
                    id="classifiedDescription"
                    rows="3"
                  ></CFormTextarea>
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedPrice" class="col-sm-2 col-form-label">Preis</CFormLabel>
                <div class="col-sm-2">
                  <CFormInput
                    id="classifiedPrice"
                    type="text"
                    placeholder="47.490"
                  />
                </div>
                <div class="col-sm-2">
                  <CInputGroupText>€</CInputGroupText>
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedOfferNumber" class="col-sm-2 col-form-label">Angebotsnummer</CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    id="classifiedOfferNumber"
                    type="text"
                    placeholder="ABC00000000"
                  />
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedProperties" class="col-sm-2 col-form-label">Ausstattung</CFormLabel>

                <div class="col-sm-10">
                  <CNav variant="tabs" role="tablist">
                    <CNavItem v-for="groupOption in groupOptions">
                      <CNavLink
                        href="javascript:void(0);"
                        :active="propertyGroupEquipmentActiveId === groupOption.id"
                        @click="() => {propertyGroupEquipmentActiveId = groupOption.id}"
                      >
                        {{ groupOption.name }}
                      </CNavLink>
                    </CNavItem>

                  </CNav>
                  <CTabContent>
                    <CTabPane v-for="groupOption in groupOptions"
                              role="tabpanel"
                              :aria-labelledby="`propertyGroupTab-${groupOption.id}`"
                              :visible="propertyGroupEquipmentActiveId === groupOption.id">
                      <CFormCheck v-for="optionValue in groupOption.optionValues"
                                  :id="`propertyGroup-${groupOption.id}-groupOption-${optionValue.id}`"
                                  :value="optionValue.id"
                                  :label="optionValue.value"
                                  v-model="checkedGroupOptionIds"
                      />
                    </CTabPane>
                  </CTabContent>

                </div>

              </CRow>

              <CRow class="mb-3">
                <CCol xs="12">
                  <CButton color="primary" type="submit">Speichern</CButton>
                </CCol>
              </CRow>

            </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script setup>
import { ref } from "vue";
import { createPropertyApiService } from "../../service/property.api.service.factory.ts";

const propertyGroupEquipmentActiveId = ref('');

const propertyApiService = createPropertyApiService();
const groupOptions = ref([]);
const checkedGroupOptionIds = ref([]);

propertyApiService.loadEquipmentProperty().then((response) => {
  groupOptions.value = response;

  // Set the first property group as active tab
  if (propertyGroupEquipmentActiveId.value === '') {
    propertyGroupEquipmentActiveId.value = groupOptions.value[0].id
  }
});

function onSaveClassified() {
  console.log('save classified', checkedGroupOptionIds);
}

</script>
