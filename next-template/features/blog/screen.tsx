"use client"

import { useMemo, useState } from "react"
import { DensityBoard } from "@/components/layout/density-board"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BlogArticleCard } from "./article-card"
import { BlogAside } from "./aside"
import { blogCategories, blogCopy, blogPosts, type BlogLocale } from "./data"

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
        className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-x-6 lg:grid-cols-12"
      >
        <div
          data-density-toolbar=""
          className="min-w-0 pb-4 lg:col-span-9 lg:col-start-1 lg:row-start-1"
        >
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
        <div
          data-blog-feed=""
          className="h-full min-h-0 min-w-0 overflow-y-auto lg:col-span-9 lg:col-start-1 lg:row-start-2"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogArticleCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
          <div className="mt-8 lg:hidden">
            <BlogAside locale={locale} />
          </div>
        </div>
        <BlogAside
          locale={locale}
          className="hidden h-full min-h-0 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:flex"
        />
      </div>
    </DensityBoard>
  )
}
