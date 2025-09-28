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
  try {
    const storedPurchaseItems = await get();
    return storedPurchaseItems.filter((item) => item.status === status)
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_GETBYSTATUS: ${error}`)
  }
}

async function set(purchaseItems: PurchaseItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PURCHASEITEM_STORAGE_KEY, JSON.stringify(purchaseItems));
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_SET: ${error}`)
  }
}

async function add(purchaseItem: PurchaseItemStorage): Promise<PurchaseItemStorage[]> {
  try {
    const storedPurchaseItems = await get();
    const updatedItems = [purchaseItem, ...storedPurchaseItems];
    await set(updatedItems)

    return updatedItems;
  } catch (error) {
      throw new Error(`PURCHASEITEMS_STORAGE_ADD: ${error}`)
  }
}

async function remove(id: string): Promise<void> {
  try {
    const storedPurchaseItems = await get()
    const updatedItems = storedPurchaseItems.filter((item) => item.id !== id)
    await set(updatedItems);
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_REMOVE: ${error}`)
  }
}

async function clear(): Promise<void> {
  try {
    await set([])
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_CLEAR: ${error}`)
  }
}

async function toggleStatus(id: string): Promise<void> {
  try {
    const storedPurchaseItems = await get()
    const updatedItems = storedPurchaseItems.map((item: any) =>
          item.id === id
            ? { ...item, status: REVERSE_STATUS[item.status as FilterStatus] }
            : item
        );
    await set(updatedItems)
  } catch (error) {
    throw new Error(`PURCHASEITEMS_STORAGE_TOGGLESTATUS: ${error}`)
  }
}

export const purchaseItemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
}
