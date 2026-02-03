"use client"

import { useMemo, useState } from "react"
import { Bookmark, Plus, Pin, MoreVertical, Search, Filter, ShoppingCart, BarChart2 } from "lucide-react"

import { FrequentItem } from "@/types/catalogue"

const PAGE_SIZE = 10

type ActionState = {
  bookmark: boolean
  add: boolean
  pin: boolean
}

export default function FrequentTable({
  data,
  page,
  setPage
}: {
  data: FrequentItem[]
  page: number
  setPage: (p: number) => void
}) {
  const [actions, setActions] = useState<Record<string, ActionState>>({})

  const totalPages = Math.ceil(data.length / PAGE_SIZE)

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, page])

  const toggleAction = (id: string, key: keyof ActionState) => {
    setActions((prev) => ({
      ...prev,
      [id]: {
        bookmark: prev[id]?.bookmark ?? false,
        add: prev[id]?.add ?? false,
        pin: prev[id]?.pin ?? false,
        [key]: !prev[id]?.[key]
      }
    }))
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-end items-center gap-3">
        {/* Left group */}
        <div className="flex items-center gap-2">
          {[Search, Bookmark, Filter].map((Icon, idx) => (
            <div
              key={idx}
              className="h-9 w-9 flex items-center justify-center rounded-md 
                   border border-primary/20 text-primary cursor-pointer 
                   hover:bg-primary/20 transition"
            >
              <Icon size={16} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-primary/30" />

        {/* Middle group */}
        <div className="flex items-center gap-2">
          {[ShoppingCart, Pin].map((Icon, idx) => (
            <div
              key={idx}
              className="h-9 w-9 flex items-center justify-center rounded-md 
                   border border-primary/20 text-primary cursor-pointer 
                   hover:bg-primary/20 transition"
            >
              <Icon size={16} />
            </div>
          ))}
        </div>

        {/* View Graph button */}
        <button
          className="ml-2 flex items-center gap-2 px-4 py-2 rounded-md 
               bg-primary text-primary-foreground text-sm font-medium
               hover:bg-primary/90 transition"
        >
          <BarChart2 size={16} />
          View Graph
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-foreground">
            <th className="py-2">New Releases</th>
            <th>Range</th>
            <th>Unit</th>
            <th>Coverage</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map((item) => {
            const state = actions[item.id] ?? {
              bookmark: false,
              add: false,
              pin: false
            }

            return (
              <tr key={item.id} className="border-b text-sm">
                <td className="py-3">{item.title}</td>
                <td>{item.freq ?? "—"}</td>
                <td>{item.unit.toUpperCase()}</td>
                <td>
                  <div
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md 
                  bg-primary/10 text-primary text-xs font-semibold"
                  >
                    {item.datatype}
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-center gap-4">
                    {/* Bookmark */}
                    <Bookmark
                      size={16}
                      className="cursor-pointer"
                      color="rgb(30 58 138)" // dark blue
                      fill={state.bookmark ? "currentColor" : "none"}
                      onClick={() => toggleAction(item.id, "bookmark")}
                    />

                    {/* Add */}
                    <Plus
                      size={16}
                      className="cursor-pointer"
                      color="rgb(30 58 138)"
                      fill={state.add ? "currentColor" : "none"}
                      onClick={() => toggleAction(item.id, "add")}
                    />

                    {/* Pin */}
                    <Pin
                      size={16}
                      className="cursor-pointer"
                      color="rgb(30 58 138)"
                      fill={state.pin ? "currentColor" : "none"}
                      onClick={() => toggleAction(item.id, "pin")}
                    />

                    {/* Menu */}
                    <MoreVertical size={16} className="cursor-pointer" color="rgb(30 58 138)" />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
