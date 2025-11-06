import apiClient from "./api.client.service";
import { API_URL_CLASSIFIED_CREATE, API_URL_CLASSIFIED_LOAD } from "@/api.const";
import { IClassified } from "../types/classified";
import { AxiosResponse } from "axios";

export class ClassifiedApiService {
  async loadClassified(classifiedId: string): Promise<IClassified> {
    return await apiClient.get(`${API_URL_CLASSIFIED_LOAD}/${classifiedId}`)
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
      selectedPropertyGroupOptionIds: data.selectedPropertyGroupOptionIds,
      enteredPropertyGroupOptionData: data.enteredPropertyGroupOptionData,
      selectedBrand: data.selectedBrand,
      selectedModel: data.selectedModel,
      uploadedImages: data.uploadedImages,
    };
  }

  async upsertClassified(
    classified: IClassified,
    selectedBrandId: string,
    selectedModelId: string,
    checkedPropertyGroupOptionIds: string[],
    selectedPropertyGroupOptionIds: string[],
    enteredPropertyGroupOptionData: string[]
  ) {
    const payload: object = this.buildPayload(
      classified,
      selectedBrandId,
      selectedModelId,
      checkedPropertyGroupOptionIds,
      selectedPropertyGroupOptionIds,
      enteredPropertyGroupOptionData
    );

    return await apiClient.post(API_URL_CLASSIFIED_CREATE, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  buildPayload(
    classified: IClassified,
    selectedBrandId: string,
    selectedModelId: string,
    checkedPropertyGroupOptionIds: string[],
    selectedPropertyGroupOptionIds: string[],
    enteredPropertyGroupOptionData: string[]
  ): object {
    const jsonData = {
      id: classified.id,
      name: classified.name,
      description: classified.description,
      price: classified.price,
      offerNumber: classified.offerNumber,
      propertyGroupOptionIds: [],
      enteredPropertyGroupOptionData: [],
    };

    jsonData.propertyGroupOptionIds = checkedPropertyGroupOptionIds.concat(selectedPropertyGroupOptionIds);
    jsonData.propertyGroupOptionIds = jsonData.propertyGroupOptionIds.concat([selectedBrandId, selectedModelId]);

    console.log('json data', jsonData);

    jsonData.enteredPropertyGroupOptionData = {
      ...enteredPropertyGroupOptionData
    };

    return {
      'jsonData': jsonData,
      'uploadedImages[]': classified.uploadedImages,
    };
  }
}
