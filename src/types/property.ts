import type { IGroupOption } from "@/types/groupOption";

export interface IProperty {
  id: string,
  name: string,
  isEquipmentGroup: boolean,
  groupOptions: IGroupOption[],
}
