import apiClient from "./api.client.service";
import { API_URL_CLASSIFIED_CREATE, API_URL_CLASSIFIED_LOAD } from "@/api.const";
import { IClassified } from "../types/classified";
import { AxiosResponse } from "axios";

export class ClassifiedApiService {
  async loadClassified(classifiedId: string): Promise<IClassified> {
    return await apiClient.get(`${API_URL_CLASSIFIED_LOAD}/${classifiedId}?XDEBUG_SESSION=1`)
      .then(async (response: AxiosResponse): Promise<IClassified> => {
        return this.createClassifiedFromData(response.data.data);
      }).catch((error) => {
        console.log('catch', error);

        return { };
      });
  }

  createClassifiedFromData(data: any): IClassified {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      offerNumber: data.offerNumber,
      checkedPropertyGroupOptionIds: data.checkedPropertyGroupOptionIds,
      checkedPropertyGroupOptionEquipmentIds: data.checkedPropertyGroupOptionEquipmentIds,
      selectedPropertyGroupOptionIds: data.selectedPropertyGroupOptionIds,
      enteredPropertyGroupOptionData: data.enteredPropertyGroupOptionData,
      selectedBrand: data.selectedBrand,
      selectedModel: data.selectedModel,
      uploadedImages: data.uploadedImages,
      propertyGroups: data.propertyGroups,
    };
  }

  async upsertClassified(classified: IClassified, parsedBrandId: string) {
    const payload: object = this.buildPayload(
      classified,
      parsedBrandId
    );

    return await apiClient.post(API_URL_CLASSIFIED_CREATE, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  buildPayload(classified: IClassified, parsedBrandId: string): object {
    const propertyGroupOptionIds = [];
    const enteredPropertyGroupOptionData = {};

    Object.values(classified.selectedPropertyGroupOptionIds).forEach((option) => {
      propertyGroupOptionIds.push(option);
    });

    Object.values(classified.checkedPropertyGroupOptionIds).forEach((option) => {
      propertyGroupOptionIds.push(option);
    });

    Object.values(classified.checkedPropertyGroupOptionEquipmentIds).forEach((option) => {
      propertyGroupOptionIds.push(option);
    });

    Object.keys(classified.enteredPropertyGroupOptionData).forEach((optionKey) => {
      const optionValue = classified.enteredPropertyGroupOptionData[optionKey];
      if (optionValue) {
        enteredPropertyGroupOptionData[optionKey] = optionValue;
      }
    });

    const jsonData = {
      id: classified.id,
      name: classified.name,
      description: classified.description,
      price: classified.price,
      offerNumber: classified.offerNumber,
      selectedBrandId: parsedBrandId,
      selectedModelId: classified.selectedModel,
      propertyGroupOptionIds: propertyGroupOptionIds,
      enteredPropertyGroupOptionData: enteredPropertyGroupOptionData,
    };

    return {
      'jsonData': jsonData,
      'uploadedImages[]': classified.uploadedImages,
    };
  }
}
