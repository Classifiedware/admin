import apiClient from "./api.client.service";
import { API_URL_CLASSIFIED_CREATE } from "@/api.const";
import { IClassified } from "../types/classified";

export class ClassifiedApiService {
  async upsertClassified(
    classified: IClassified,
    propertyGroupOptionIds: string[]
  ) {
    const formData: FormData = this.buildFormData(classified, propertyGroupOptionIds);

    return await apiClient.post(API_URL_CLASSIFIED_CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  buildFormData(
    classified: IClassified,
    propertyGroupOptionIds: string[]
  ): FormData {
    const formData: FormData = new FormData();

    formData.append('id', classified.id);
    formData.append('name', classified.name);
    formData.append('description', classified.description);
    formData.append('price', classified.price);
    formData.append('offerNumber', classified.offerNumber);

    propertyGroupOptionIds.forEach((propertyGroupOptionId: string) => {
      formData.append('propertyGroupOptionIds[]', propertyGroupOptionId);
    });

    classified.uploadedImages.forEach((uploadedImage: File) => {
      formData.append('uploadedImages[]', uploadedImage);
    });

    return formData;
  }
}
