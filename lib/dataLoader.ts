import { CategoryNode, FrequentItem } from "@/types/catalogue"

export type Dataset = "India & States" | "IMF"

export type DatasetResponse = {
  categories: CategoryNode
  frequent: FrequentItem[]
}

export async function loadDataset(dataset: Dataset): Promise<DatasetResponse> {
  if (dataset === "IMF") {
    const data = await import("@/data/response2.json")
    return data.default
  }
  const data = await import("@/data/response1.json")
  return data.default
}
