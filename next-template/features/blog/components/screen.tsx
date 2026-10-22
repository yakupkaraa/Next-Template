"use client"

import { useMemo, useState } from "react"
import { DensityBoard } from "@/components/layout/density-board"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BlogArticleCard } from "./article-card"
import { blogCategories, blogCopy } from "../constants/blog"
import { blogPosts } from "../mocks/blog.mock"
import type { BlogLocale } from "../types/blog"

function pickOne(value: string[], fallback: string) {
  return value[0] ?? fallback
}

export function BlogScreen({ locale }: { locale: BlogLocale }) {
  const text = blogCopy[locale]
  const [category, setCategory] = useState<"all" | (typeof blogCategories)[number]["id"]>("all")

  const posts = useMemo(
    () => (category === "all" ? blogPosts : blogPosts.filter((post) => post.category === category)),
    [category]
  )

  return (
    <DensityBoard data-blog-board="" className="min-h-0 flex-1">
      <div
        data-blog-body=""
        className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)]"
      >
        <div data-density-toolbar="" className="min-w-0 pb-4">
          <ToggleGroup
            value={[category]}
            onValueChange={(value) =>
              setCategory(pickOne(value, category) as typeof category)
            }
            spacing={2}
            className="w-full max-w-full flex-nowrap overflow-x-auto"
          >
            <ToggleGroupItem
              value="all"
              variant="outline"
              className="rounded-full px-4 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground mt-4"
            >
              {text.all}
            </ToggleGroupItem>
            {blogCategories.map((item) => (
              <ToggleGroupItem
                key={item.id}
                value={item.id}
                variant="outline"
                className="rounded-full px-4 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground mt-4"
              >
                {item[locale]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div data-blog-feed="" className="h-full min-h-0 min-w-0 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <BlogArticleCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </DensityBoard>
  )
}
