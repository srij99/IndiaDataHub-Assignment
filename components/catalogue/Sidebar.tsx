"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Dataset } from "@/lib/dataLoader"
import { CategoryNode } from "@/types/catalogue"

type SidebarProps = {
  dataset: Dataset
  setDataset: (d: Dataset) => void
  categories: CategoryNode
}

export default function Sidebar({ dataset, setDataset, categories }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside className="w-72 border-r flex flex-col">
      <h1 className="font-bold p-3 text-primary">Economic Monitor</h1>
      {/* Dataset dropdown */}
      <div className="p-4 border-b">
        <div className="rounded-lg bg-primary/10 p-3">
          <label className="block text-xs font-medium text-primary mb-1">Category:</label>

          <select
            className="w-full rounded-md  py-1 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={dataset}
            onChange={(e) => setDataset(e.target.value as Dataset)}
          >
            <option value="India & States">India & States</option>
            <option value="IMF">IMF</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-auto p-4 rounded-lg ">
        <h2 className="font-semibold mb-3 text-primary">Homepage</h2>

        {Object.keys(categories).map((cat) => {
          const isOpen = expanded[cat]

          return (
            <div key={cat} className="mb-2">
              <div className="flex items-center gap-2 cursor-pointer hover:text-primary" onClick={() => toggle(cat)}>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="text-sm font-medium">{cat}</span>
              </div>

              {isOpen &&
                Object.keys(categories[cat]).map((subCat) => (
                  <div key={subCat} className="ml-6 mt-1 text-sm text-muted-foreground">
                    {subCat}
                  </div>
                ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
