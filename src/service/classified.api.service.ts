import apiClient from "./api.client.service";
import { API_URL_CLASSIFIED_CREATE } from "@/api.const";
import { IClassified } from "../types/classified";

export class ClassifiedApiService {
  async upsertClassified(
    classified: IClassified,
    propertyGroupOptionIds: string[]
  ) {
    const payload: object = this.buildPayload(classified, propertyGroupOptionIds);

    return await apiClient.post(API_URL_CLASSIFIED_CREATE, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  buildPayload(
    classified: IClassified,
    propertyGroupOptionIds: string[]
  ): object {
    const jsonData = {
      id: classified.id,
      name: classified.name,
      description: classified.description,
      price: classified.price,
      offerNumber: classified.offerNumber,
      propertyGroupOptionIds: [],
    };

    jsonData.propertyGroupOptionIds = propertyGroupOptionIds.map(((propertyGroupOptionId: string) => {
      return propertyGroupOptionId;
    }));

    return {
      'jsonData': jsonData,
      'uploadedImages[]': classified.uploadedImages,
    };
  }
}
