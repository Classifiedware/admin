<template>
  <CRow v-if="!isLoading">
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Inserat erstellen</strong>
        </CCardHeader>
        <CCardBody>
          <CForm enctype="multipart/form-data" @submit.prevent="props.onSaveClassified">

            <CRow class="mb-3">
              <CFormLabel for="classifiedName" class="col-sm-2 col-form-label">Name</CFormLabel>
              <div class="col-sm-10">
                <CFormInput
                  id="classifiedName"
                  type="text"
                  placeholder="Ein Auto mit einer guten Ausstattung"
                  required="required"
                  v-model:model-value="props.classifiedData.name"
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
                  v-model:model-value="props.classifiedData.description"
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
                  v-model:model-value="props.classifiedData.price"
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
                  v-model:model-value="props.classifiedData.offerNumber"
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
                  @change="props.onClassifiedImagesChanged($event)"
                />
              </div>
            </CRow>

            <template v-for="propertyGroup in props.propertyGroups">

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
                          v-model="props.classifiedData.checkedPropertyGroupOptionIds[propertyGroup.id + '|' + groupOption.id]"
                        />
                      </CCol>
                    </template>

                    <template v-if="groupOption.type === 'select' && groupOption.name === groupOptionNameBrand">
                      <CCol md="6">
                        <CFormSelect
                          :aria-label="groupOption.name"
                          :label="groupOption.name"
                          @change="onChangeBrand($event.target.value)"
                          v-model="props.classifiedData.selectedBrand">
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
                          :disabled="props.possibleModels.length === 0"
                          v-model="props.classifiedData.selectedModel">
                          <option value="">beliebig</option>
                          <template v-if="props.possibleModels"
                                    v-for="groupOptionValue in props.possibleModels">

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
                          v-model="props.classifiedData.selectedPropertyGroupOptionIds[propertyGroup.id + '|' + groupOption.id]">
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
                          v-model="props.classifiedData.enteredPropertyGroupOptionData[propertyGroup.id + '|' + groupOption.id]"
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
                          v-model="props.classifiedData.checkedPropertyGroupOptionIds[propertyGroup.id + '|' + groupOption.id]"
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
                          :active="props.propertyGroupEquipmentActiveId === groupOption.id"
                          @click="() => onChangeActivePropertyGroupEquipmentTab(groupOption.id)"
                        >
                          {{ groupOption.name }}
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane v-for="groupOption in propertyGroup.groupOptions"
                                role="tabpanel"
                                :aria-labelledby="`propertyGroupTab-${groupOption.id}`"
                                :visible="props.propertyGroupEquipmentActiveId === groupOption.id">
                        <CRow>
                          <CCol xs="6" md="4"
                                v-for="optionValue in groupOption.optionValues">
                            <CFormCheck :id="`propertyGroup-${groupOption.id}-groupOption-${optionValue.id}`"
                                        :value="optionValue.id"
                                        :label="optionValue.value"
                                        v-model="props.classifiedData.checkedPropertyGroupOptionEquipmentIds[propertyGroup.id + '|' + groupOption.id + '|' + optionValue.id]"
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
import { defineProps } from "vue";
import {CRow} from "@coreui/vue";

const props = defineProps([
  'isLoading',
  'onSaveClassified',
  'onClassifiedImagesChanged',
  'onChangeBrand',
  'onChangeActivePropertyGroupEquipmentTab',
  'possibleModels',
  'classifiedData',
  'propertyGroups',
  'propertyGroupEquipmentActiveId'
]);

const groupOptionNameBrand = 'Marke';
const groupOptionNameModel = 'Modell';
const groupOptionNamePrice = 'Preis (€)';

</script>
