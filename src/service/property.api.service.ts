import apiClient from "./api.client.service";
import { API_URL_PROPERTY_LOAD } from "@/api.const";
import { IProperty } from "@/types/property";
import { IGroupOption } from "@/types/groupOption";
import { IOptionValue } from "@/types/optionValue";
import { AxiosResponse } from "axios";

export class PropertyApiService {
  async loadPropertyGroups() {
    return await apiClient.get(`${API_URL_PROPERTY_LOAD}`)
      .then(async (response: AxiosResponse<any, any>): Promise<IProperty> => {
      console.log('properties', response);

      console.log('mapped groups', response.data.data.map((data: any) => this.createPropertyFromData(data)));

        return response.data.data.map((data: any) => this.createPropertyFromData(data));
    }).catch((error) => {
      console.log('catch', error);

      return { };
    });
  }

  createPropertyFromData(data: any): IProperty {
    let groupOptions: IGroupOption[] = [];

    data.groupOptions.forEach((groupOptionRow: any) => {
      let optionValues: IOptionValue[] = [];

      if (groupOptionRow.optionValues) {
        groupOptionRow.optionValues.forEach((optionValueRow: any) => {
          const optionValue: IOptionValue = {
            parentName: optionValueRow.parentName || '',
            childName: optionValueRow.childName || '',
            value: optionValueRow.value,
            values: optionValueRow.values || [],
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
        selectFrom: null,
        selectTo: null,
      };

      groupOptions.push(groupOption);
    });

    return {
      name: data.name,
      isEquipmentGroup: data.isEquipmentGroup,
      id: data.id,
      groupOptions: groupOptions,
    };
  }
}
