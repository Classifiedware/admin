import { IProperty } from "./property";

export interface IClassified {
  id: null | string,
  name: string,
  description: string,
  price: string,
  offerNumber: string,
  checkedPropertyGroupOptionIds: Array<string>,
  selectedPropertyGroupOptionIds: Array<string>,
  enteredPropertyGroupOptionData: Array<string>,
  selectedBrand: string,
  selectedModel: string,
  uploadedImages: FileList,
  propertyGroups: Array<IProperty>,
}
