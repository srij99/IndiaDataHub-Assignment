"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { loadDataset, Dataset } from "@/lib/dataLoader"
import Sidebar from "@/components/catalogue/Sidebar"
import FrequentTable from "../components/catalogue/FrequentTable"
import { CategoryNode, FrequentItem } from "@/types/catalogue"

export default function CataloguePage() {
  const router = useRouter()

  const [dataset, setDataset] = useState<Dataset>("India & States")
  const [categories, setCategories] = useState<CategoryNode>({})
  const [frequent, setFrequent] = useState<FrequentItem[]>([])
  const [page, setPage] = useState<number>(1)

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  // Load dataset
  useEffect(() => {
    let isMounted = true

    async function load() {
      const data = await loadDataset(dataset)
      if (!isMounted) return

      setCategories(data.categories)
      setFrequent(data.frequent)
      setPage(1) // reset pagination on dataset switch
    }

    load()

    return () => {
      isMounted = false
    }
  }, [dataset])

  return (
    <div className="h-screen flex bg-background">
      <Sidebar dataset={dataset} setDataset={setDataset} categories={categories} />

      <main className="flex-1 p-6 overflow-auto">
        <FrequentTable data={frequent} page={page} setPage={setPage} />
      </main>
    </div>
  )
}
