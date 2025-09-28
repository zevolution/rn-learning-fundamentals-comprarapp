import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/FilterStatus";

const PURCHASEITEM_STORAGE_KEY = "@comprar:purchase:items"

export type PurchaseItemStorage = {
  id: string,
  status: FilterStatus,
  description: string
}

async function get(): Promise<PurchaseItemStorage[]> {
  throw new Error("Not implemented yet")
}

async function getByStatus(status: FilterStatus): Promise<PurchaseItemStorage[]> {
  throw new Error("Not implemented yet")
}

async function set(purchaseItems: PurchaseItemStorage[]): Promise<void> {
  throw new Error("Not implemented yet")
}

async function add(purchaseItem: PurchaseItemStorage): Promise<PurchaseItemStorage[]> {
  throw new Error("Not implemented yet")
}

async function remove(id: string): Promise<void> {

}

async function clear(): Promise<void> {
  throw new Error("Not implemented yet")
}

async function toggleStatus(id: string): Promise<void> {
  throw new Error("Not implemented yet")
}

export const purchaseItemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
}
