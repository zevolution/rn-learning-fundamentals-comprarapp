import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/FilterStatus";

const PURCHASEITEM_STORAGE_KEY = "@comprar:purchase:items"

const REVERSE_STATUS: Record<FilterStatus, FilterStatus> = {
  [FilterStatus.PENDING]: FilterStatus.DONE,
  [FilterStatus.DONE]: FilterStatus.PENDING
}

export type PurchaseItemStorage = {
  id: string,
  status: FilterStatus,
  description: string
}

async function get(): Promise<PurchaseItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(PURCHASEITEM_STORAGE_KEY);
    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_GET: ${error}`)
  }
}

async function getByStatus(status: FilterStatus): Promise<PurchaseItemStorage[]> {
  const storedPurchaseItems = await get();
  return storedPurchaseItems.filter((item) => item.status === status)
}

async function set(purchaseItems: PurchaseItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PURCHASEITEM_STORAGE_KEY, JSON.stringify(purchaseItems));
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_SET: ${error}`)
  }
}

async function add(purchaseItem: PurchaseItemStorage): Promise<PurchaseItemStorage[]> {
  const storedPurchaseItems = await get();
  const updatedItems = [purchaseItem, ...storedPurchaseItems];
  await set(updatedItems)

  return updatedItems;
}

async function remove(id: string): Promise<void> {
  const storedPurchaseItems = await get()
  const updatedItems = storedPurchaseItems.filter((item) => item.id !== id)
  await set(updatedItems);
}

async function clear(): Promise<void> {
  await set([])
}

async function toggleStatus(id: string): Promise<void> {
  const storedPurchaseItems = await get()
  const updatedItems = storedPurchaseItems.map((item: any) =>
        item.id === id
          ? { ...item, status: REVERSE_STATUS[item.status as FilterStatus] }
          : item
      );
  await set(updatedItems)
}

export const purchaseItemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
}
