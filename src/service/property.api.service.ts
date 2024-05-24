import apiClient from "./api.client.service";
import { API_URL_PROPERTY_LOAD } from "@/api.const";
import { IProperty } from "@/types/property";
import { IGroupOption } from "@/types/groupOption";
import { IOptionValue } from "@/types/optionValue";
import {AxiosResponse} from "axios";

export class PropertyApiService {
  async loadEquipmentProperty() {
    const authToken = localStorage.getItem("accessToken") || '';

    return await apiClient.get(`${API_URL_PROPERTY_LOAD}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then(async (response: AxiosResponse<any, any>): Promise<IProperty> => {
      const groupOptions = response.data.data[0];

      return this.createPropertyFromData(groupOptions);
    }).catch((error) => {
      console.log('catch', error);

      return {};
    });
  }

  createPropertyFromData(data: any): IProperty {
    let groupOptions: IGroupOption[] = [];

    data.groupOptions.forEach((groupOptionRow: any) => {
      let optionValues: IOptionValue[] = [];

      if (groupOptionRow.optionValues) {
        groupOptionRow.optionValues.forEach((optionValueRow: any) => {
          const optionValue: IOptionValue = {
            value: optionValueRow.value,
            id: optionValueRow.id,
          };

          optionValues.push(optionValue);
        });
      }

      const groupOption: IGroupOption = {
        name: groupOptionRow.name,
        type: groupOptionRow.type,
        id: groupOptionRow.id,
        optionValues: optionValues,
      };

      groupOptions.push(groupOption);
    });

    return groupOptions;
  }
}
