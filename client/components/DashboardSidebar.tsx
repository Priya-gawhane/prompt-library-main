"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import {
  setSelectedCategory,
  setSortOrder,
  toggleFavoritesFilter,
  togglePinnedFilter,
} from "@/store/slices/promptSlice"
import { Category } from "@/types/category"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Pin, LayoutGrid, X } from "lucide-react"

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "a-z", label: "A → Z" },
  { value: "z-a", label: "Z → A" },
] as const

export function DashboardSidebar() {
  const dispatch = useAppDispatch()
  const { selectedCategory, sortOrder, showFavoritesOnly, showPinnedOnly, prompts } =
    useAppSelector((s) => s.prompts)

  const categoryCount = (cat: string) =>
    prompts.filter((p) => p.category === cat).length

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Filters Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={showFavoritesOnly}
                  onClick={() => dispatch(toggleFavoritesFilter())}
                >
                  <Star className={showFavoritesOnly ? "fill-amber-400 text-amber-400" : ""} />
                  <span>Favorites Only</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={showPinnedOnly}
                  onClick={() => dispatch(togglePinnedFilter())}
                >
                  <Pin className={showPinnedOnly ? "fill-blue-400 text-blue-400" : ""} />
                  <span>Pinned Only</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Sort Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Sort</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 pb-2">
            <Select
              value={sortOrder}
              onValueChange={(val) =>
                dispatch(setSortOrder(val as typeof sortOrder))
              }
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Categories Group */}
        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            {selectedCategory && (
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => dispatch(setSelectedCategory(null))}
                title="Clear filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={!selectedCategory}
                  onClick={() => dispatch(setSelectedCategory(null))}
                  className="justify-between"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid />
                    <span>All</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{prompts.length}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {Object.values(Category).map((cat) => (
                <SidebarMenuItem key={cat}>
                  <SidebarMenuButton
                    isActive={selectedCategory === cat}
                    onClick={() =>
                      dispatch(setSelectedCategory(selectedCategory === cat ? null : cat))
                    }
                    className="justify-between"
                  >
                    <span className="truncate">{cat}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {categoryCount(cat)}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
