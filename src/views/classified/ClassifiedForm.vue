<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Inserat erstellen</strong>
        </CCardHeader>
        <CCardBody>
            <CForm enctype="multipart/form-data" @submit.prevent="onSaveClassified">

              <CRow class="mb-3">
                <CFormLabel for="classifiedName" class="col-sm-2 col-form-label">Name</CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    id="classifiedName"
                    type="text"
                    placeholder="Ein Auto mit einer guten Ausstattung"
                    required="required"
                    v-model:model-value="classifiedData.name"
                  />
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedDescription" class="col-sm-2 col-form-label">Beschreibung</CFormLabel>
                <div class="col-sm-10">
                  <CFormTextarea
                    id="classifiedDescription"
                    rows="3"
                    required="required"
                    v-model:model-value="classifiedData.description"
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
                    required="required"
                    v-model:model-value="classifiedData.price"
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
                    required="required"
                    v-model:model-value="classifiedData.offerNumber"
                  />
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="classifiedImage" class="col-sm-2 col-form-label">Bilder</CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    id="classifiedImage"
                    type="file"
                    accept="image/*"
                    multiple
                    @change="onClassifiedImagesChanged($event)"
                  />
                </div>
              </CRow>

              <template v-for="propertyGroup in propertyGroups">

                <CRow class="mb-3">
                  <h5 class="card-title pb-2 border-bottom">{{ propertyGroup.name }}</h5>

                  <CRow>
                  <template v-for="groupOption in propertyGroup.groupOptions">

                  <template v-if="groupOption.type === 'checkbox'">
                    <CCol xs="6" md="4">
                      <CFormCheck
                        :id="`checkbox-${groupOption.id}`"
                        :value="groupOption.id"
                        :label="groupOption.name"
                        v-model="checkedGroupOptionIds"
                      />
                    </CCol>
                  </template>

                 <template v-if="groupOption.type === 'select' && groupOption.name === groupOptionNameBrand">
                   <CCol md="6">
                     <CFormSelect
                       :aria-label="groupOption.name"
                       :label="groupOption.name"
                       v-model="selectedBrand">
                       <option value="">beliebig</option>
                       <option v-for="optionValue in groupOption.optionValues"
                               :value="optionValue.value">
                         {{ optionValue.value }}
                       </option>
                     </CFormSelect>
                   </CCol>
                 </template>

                <template v-if="groupOption.type === 'select' && groupOption.name === groupOptionNameModel">
                  <CCol md="6">
                    <CFormSelect
                      :aria-label="groupOption.name"
                      :label="groupOption.name"
                      :disabled="possibleModels.length === 0"
                      v-model="selectedModel">
                      <option value="">beliebig</option>
                      <template v-if="possibleModels"
                                v-for="groupOptionValue in possibleModels">

                        <option v-if="groupOptionValue.childName"
                                :label="groupOptionValue.childName"
                                :value="groupOptionValue.id"
                                disabled>
                          {{ groupOptionValue.childName }}
                        </option>

                        <option v-if="groupOptionValue.values"
                                v-for="childValue in groupOptionValue.values"
                                :label="childValue.value"
                                :value="childValue.id">
                          {{ childValue.value }}
                        </option>

                        <option v-if="groupOptionValue.value"
                                :label="groupOptionValue.value"
                                :value="groupOptionValue.id">
                          {{ groupOptionValue.value }}
                        </option>
                      </template>
                    </CFormSelect>
                  </CCol>
                </template>

                 <template v-if="groupOption.type === 'select'
                    && groupOption.name !== groupOptionNameBrand
                    && groupOption.name !== groupOptionNameModel">
                      <CCol md="6">
                        <CFormSelect
                          :aria-label="groupOption.name"
                          :label="groupOption.name"
                          v-model="groupOption.selectFrom">
                          <option value="">beliebig</option>
                          <option v-for="optionValue in groupOption.optionValues"
                                  :value="optionValue.id">
                            {{ optionValue.value }}
                          </option>
                        </CFormSelect>
                      </CCol>
                 </template>

                  <template v-if="groupOption.type === 'selectRange' && groupOption.name !== groupOptionNamePrice">
                      <CCol md="6">
                        <CFormInput
                          :id="`selectRange-${groupOption.id}`"
                          :label="groupOption.name"
                          type="text"
                          placeholder=""
                          v-model="enteredGroupOptionData[groupOption.id]"
                        />
                      </CCol>
                 </template>

                <template v-if="groupOption.type === 'checkboxGroup'">
                  <CFormLabel>{{ groupOption.name }}</CFormLabel>
                  <CCol md="3" sm="6"
                        v-for="optionValue in groupOption.optionValues">
                    <CFormCheck
                      :id="`checkbox-${groupOption.id}-option-value-${optionValue.id}`"
                      :value="optionValue.id"
                      :label="optionValue.value"
                      v-model="checkedGroupOptionIds"
                    />
                  </CCol>


                </template>

                </template>
               </CRow>

                <template v-if="propertyGroup.isEquipmentGroup">
                    <div class="col-sm-10">
                      <CNav variant="tabs" role="tablist">
                        <CNavItem v-for="groupOption in propertyGroup.groupOptions">
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
                        <CTabPane v-for="groupOption in propertyGroup.groupOptions"
                                  role="tabpanel"
                                  :aria-labelledby="`propertyGroupTab-${groupOption.id}`"
                                  :visible="propertyGroupEquipmentActiveId === groupOption.id">
                          <CRow>
                          <CCol xs="6" md="4"
                                v-for="optionValue in groupOption.optionValues">
                          <CFormCheck :id="`propertyGroup-${groupOption.id}-groupOption-${optionValue.id}`"
                                      :value="optionValue.id"
                                      :label="optionValue.value"
                                      v-model="checkedGroupOptionIds"
                          />
                          </CCol>
                          </CRow>
                        </CTabPane>
                      </CTabContent>
                    </div>
                </template>

                </CRow>

              </template>

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
<script setup lang="ts">
import { ref, watch } from "vue";
import { createPropertyApiService } from "@/service/property.api.service.factory.ts";
import { createClassifiedApiService } from "@/service/classified.api.service.factory.ts";
import { IClassified } from "@/types/classified";
import { IProperty } from "@/types/property";
import { IGroupOption } from "@/types/groupOption";
import { IOptionValue } from "@/types/optionValue";

const propertyGroupNameBrandAndModel = 'Marke, Modell, Variante';
const groupOptionNameBrand = 'Marke';
const groupOptionNameModel = 'Modell';
const groupOptionNamePrice = 'Preis (€)';

const classifiedData: IClassified = {
  id: null,
  name: '',
  description: '',
  price: '',
  offerNumber: '',
  uploadedImages: [],
};

const propertyGroupEquipmentActiveId = ref('');

const propertyApiService = createPropertyApiService();
const classifiedApiService = createClassifiedApiService();
const propertyGroups = ref([]);
const checkedGroupOptionIds = ref([]);
const enteredGroupOptionData = ref([]);

const selectedBrand = ref('');
const selectedModel = ref('');

const possibleModels = ref([]);

propertyApiService.loadPropertyGroups().then((response) => {
  propertyGroups.value = response;

  // Set the first property group for equipment as active tab
  if (propertyGroupEquipmentActiveId.value === '') {
    const filteredPropertyGroupEquipment = propertyGroups.value.filter((propertyGroup: IProperty) => {
      return propertyGroup.isEquipmentGroup;
    }).shift();

    propertyGroupEquipmentActiveId.value = filteredPropertyGroupEquipment.groupOptions[0].id;
  }
});

function onClassifiedImagesChanged($event: Event) {
  console.log('images changed', $event);

  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    classifiedData.uploadedImages = target.files;
  }
}

function filterModelsByBrand(brand: string) {
  const filteredModels = ref([]);

  propertyGroups.value.forEach((property: IProperty) => {
    property.groupOptions.forEach((groupOption: IGroupOption) => {
      groupOption.optionValues.forEach((optionValue: IOptionValue) => {
        if (property.name === propertyGroupNameBrandAndModel && groupOption.name === groupOptionNameModel && optionValue.parentName === brand) {
          filteredModels.value.push(optionValue);
        }
      });
    })
  });

  return filteredModels.value;
}

watch(selectedBrand, () => {
  // In case of no brand is selected
  // Remove the previously selected model
  if (selectedBrand.value.length === 0) {
    console.log('no brand selected');

    possibleModels.value = [];
    selectedModel.value = '';

    return;
  }

  possibleModels.value = filterModelsByBrand(selectedBrand.value);
  selectedModel.value = '';

  console.log('possible models', possibleModels);
});

async function onSaveClassified() {
  console.log('classified data', classifiedData, 'checked property', checkedGroupOptionIds, 'entered data', enteredGroupOptionData);

  const response = await classifiedApiService.upsertClassified(
    classifiedData,
    checkedGroupOptionIds.value
  );

  console.log('response', response);
}

</script>
