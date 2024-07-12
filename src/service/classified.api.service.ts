import apiClient from "./api.client.service";
import { API_URL_CLASSIFIED_CREATE } from "@/api.const";
import { IClassified } from "../types/classified";

export class ClassifiedApiService {
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
