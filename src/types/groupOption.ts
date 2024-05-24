import { IOptionValue } from "@/types/optionValue";

export interface IGroupOption {
  id: string,
  name: string,
  type: string,
  optionValues: IOptionValue[],
}
