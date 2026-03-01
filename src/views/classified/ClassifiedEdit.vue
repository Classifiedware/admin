<template>
  <ClassifiedForm
    :isLoading="isLoading"
    :onSaveClassified="onSaveClassified"
    :onClassifiedImagesChanged="onClassifiedImagesChanged"
    :onChangeBrand="onChangeBrand"
    :onChangeActivePropertyGroupEquipmentTab="onChangeActivePropertyGroupEquipmentTab"
    :possibleModels="possibleModels"
    :classifiedData="classifiedData"
    :propertyGroups="propertyGroups"
    :propertyGroupEquipmentActiveId="propertyGroupEquipmentActiveId"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from '@/router'

import ClassifiedForm from "../../components/ClassifiedForm.vue";

import { createClassifiedApiService } from "@/service/classified.api.service.factory.ts";

import { IClassified } from "@/types/classified";
import { IProperty } from "@/types/property";
import { IGroupOption } from "@/types/groupOption";
import { IOptionValue } from "@/types/optionValue";

let classifiedData: IClassified = {
  id: null,
  name: '',
  description: '',
  price: '',
  offerNumber: '',
  checkedPropertyGroupOptionIds: [],
  checkedPropertyGroupOptionEquipmentIds: [],
  selectedPropertyGroupOptionIds: [],
  enteredPropertyGroupOptionData: [],
  selectedBrand: '',
  selectedModel: '',
  uploadedImages: [],
  propertyGroups: [],
};

const propertyGroupNameBrandAndModel = 'Marke, Modell, Variante';
const groupOptionNameModel = 'Modell';

const isLoading = ref(true);
const propertyGroups = ref([]);

const classifiedApiService = createClassifiedApiService();

const propertyGroupEquipmentActiveId = ref('');
const possibleModels = ref([]);
const classifiedId = router.currentRoute.value.params.id;

classifiedApiService.loadClassified(classifiedId).then((classified: IClassified) => {
  classifiedData = classified;
  propertyGroups.value = classifiedData.propertyGroups;

  setBrandModel();

  console.log('response', propertyGroups);

  // Set the first property group for equipment as active tab
  if (propertyGroupEquipmentActiveId.value === '') {
    const filteredPropertyGroupEquipment = classifiedData.propertyGroups.filter((propertyGroup: IProperty) => {
      return propertyGroup.isEquipmentGroup;
    }).shift();

    propertyGroupEquipmentActiveId.value = filteredPropertyGroupEquipment.groupOptions[0].id;

    isLoading.value = false;
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

  console.log('classifiedData.propertyGroups', propertyGroups);

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

function parseBrand(brand: string, index: number): string {
  return brand.split('|')[index];
}

function onChangeBrand(selectedBrand: string) {
  const parsedBrand = parseBrand(selectedBrand, 0);

  possibleModels.value = filterModelsByBrand(parsedBrand);
}

function setBrandModel() {
  onChangeBrand(classifiedData.selectedBrand);
}

function onChangeActivePropertyGroupEquipmentTab(groupOptionId: string) {
  propertyGroupEquipmentActiveId.value = groupOptionId;
}

async function onSaveClassified() {
  console.log('on save classified', classifiedData);

  const parsedBrandId = parseBrand(classifiedData.selectedBrand, 1);

  const response = await classifiedApiService.upsertClassified(
    classifiedData,
    parsedBrandId
  );

  console.log('response', response);

  router.push({ name: 'Classified Edit', params: { id: response.data.data.id } });

}
</script>
