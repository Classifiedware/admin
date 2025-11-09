<template>
  <CRow v-if="!isLoading">
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

              <template v-for="propertyGroup in classifiedData.propertyGroups">

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
                        v-model="classifiedData.checkedPropertyGroupOptionIds"
                      />
                    </CCol>
                  </template>

                 <template v-if="groupOption.type === 'select' && groupOption.name === groupOptionNameBrand">
                   <CCol md="6">
                     <CFormSelect
                       :aria-label="groupOption.name"
                       :label="groupOption.name"
                       @change="onChangeBrand($event.target.value)"
                       v-model="classifiedData.selectedBrand">
                       <option value="">beliebig</option>
                       <option v-for="optionValue in groupOption.optionValues"
                               :value="`${optionValue.value}|${optionValue.id}`">
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
                      v-model="classifiedData.selectedModel">
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
                          v-model="classifiedData.selectedPropertyGroupOptionIds[propertyGroup.id + '|' + groupOption.id]">
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
                          v-model="classifiedData.enteredPropertyGroupOptionData[propertyGroup.id + '|' + groupOption.id]"
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
                      v-model="classifiedData.checkedPropertyGroupOptionIds"
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
                                      v-model="classifiedData.checkedPropertyGroupOptionIds"
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
import { ref, reactive } from "vue";
import router from '@/router'
import { createClassifiedApiService } from "@/service/classified.api.service.factory.ts";
import { IClassified } from "@/types/classified";
import { IProperty } from "@/types/property";
import { IGroupOption } from "@/types/groupOption";
import { IOptionValue } from "@/types/optionValue";

const propertyGroupNameBrandAndModel = 'Marke, Modell, Variante';
const groupOptionNameBrand = 'Marke';
const groupOptionNameModel = 'Modell';
const groupOptionNamePrice = 'Preis (€)';

let classifiedData: IClassified = {
  id: null,
  name: '',
  description: '',
  price: '',
  offerNumber: '',
  checkedPropertyGroupOptionIds: [],
  selectedPropertyGroupOptionIds: [],
  enteredPropertyGroupOptionData: [],
  selectedBrand: '',
  selectedModel: '',
  uploadedImages: [],
  propertyGroups: [],
};

const isLoading = ref(true);

const propertyGroupEquipmentActiveId = ref('');
const classifiedApiService = createClassifiedApiService();
const possibleModels = ref([]);
const classifiedId = router.currentRoute.value.params.id;

classifiedApiService.loadClassified(classifiedId).then((classified: IClassified) => {
  classifiedData = classified;

  setBrandModel();

  console.log('brand model loaded', classifiedData.selectedModel);

  // Set the first property group for equipment as active tab
  if (propertyGroupEquipmentActiveId.value === '') {
    const filteredPropertyGroupEquipment = classifiedData.propertyGroups.filter((propertyGroup: IProperty) => {
      return propertyGroup.isEquipmentGroup;
    }).shift();

    propertyGroupEquipmentActiveId.value = filteredPropertyGroupEquipment.groupOptions[0].id;
  }

  console.log('data', classifiedData);

  isLoading.value = false;

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

  console.log('classifiedData.propertyGroups', classifiedData.propertyGroups);

  classifiedData.propertyGroups.forEach((property: IProperty) => {
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

function getSelectedGroupOptionIds() {
  const selectedGroupOptionIds = ref([]);

  classifiedData.propertyGroups.forEach((property: IProperty) => {
    property.groupOptions.forEach((groupOption: IGroupOption) => {
      if (groupOption.selectFrom) {
        selectedGroupOptionIds.value.push(groupOption.selectFrom);
      }
    })
  })

  return selectedGroupOptionIds;
}

function parseBrand(brand: string, index: number): string {
  return brand.split('|')[index];
}

function setBrandModel() {
  console.log('selected brand', classifiedData);

  // In case of no brand is selected
  // Remove the previously selected model
  if (!classifiedData.selectedBrand) {
    console.log('no brand selected');

    possibleModels.value = [];
    classifiedData.selectedModel.value = '';

    return;
  }

  const parsedBrand = parseBrand(classifiedData.selectedBrand, 0);
  console.log('parsedBrand', parsedBrand);

  possibleModels.value = filterModelsByBrand(parsedBrand);
  //classifiedData.selectedModel = '';

  console.log('possible models', possibleModels);
}

function onChangeBrand(selectedBrand: string) {
  console.log('on change brand', classifiedData.selectedBrand);

  const parsedBrand = parseBrand(selectedBrand, 0);

  console.log('parsedBrand 123', parsedBrand);

  possibleModels.value = filterModelsByBrand(parsedBrand);

}

async function onSaveClassified() {
  /*const parsedBrandId = parseBrand(selectedBrand.value, 1);

  const response = await classifiedApiService.upsertClassified(
    classifiedData,
    parsedBrandId,
    selectedModel.value,
    checkedGroupOptionIds.value,
    getSelectedGroupOptionIds().value,
    enteredGroupOptionData.value
  );

  console.log('response', response);*/

  console.log('on saveClassified', classifiedData);

}

</script>
