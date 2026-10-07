"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Bold,
  Check,
  Code,
  FileText,
  Globe,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Lock,
  Quote,
  Redo2,
  Send,
  Undo2,
  Upload,
  Bookmark,
  EyeOff,
  FilePenLine,
  Images,
  Search,
  X,
} from "lucide-react"
import {
  DensityBoard,
  densityStickyBleedX,
} from "@/components/layout/density-board"
import { StickyStepperHeader } from "@/components/layout/sticky-stepper-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/shared/status-badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "cn"
import { blogCategories, blogPosts, type BlogLocale } from "../../data"
import {
  blogAuthors,
  blogEditorCopy,
  blogSeries,
  blogSuggestedTags,
  type BlogEditorMode,
} from "../constants/copy"

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replaceAll(/[^a-z0-9ğüşöçı\s-]/gi, "")
    .trim()
    .replaceAll(/\s+/g, "-")
}

export function BlogEditorScreen({
  locale,
  mode,
}: {
  locale: BlogLocale
  mode: BlogEditorMode
}) {
  const text = blogEditorCopy[locale]
  const sample = blogPosts[0]
  const isEdit = mode === "edit"
  const [active, setActive] = useState(isEdit ? 3 : 0)
  const [title, setTitle] = useState(isEdit ? sample.title : "")
  const [slug, setSlug] = useState(isEdit ? "nextjs-olceklenebilir-dashboard-mimarisi" : "")
  const [excerpt, setExcerpt] = useState(isEdit ? sample.excerpt : "")
  const [body, setBody] = useState(isEdit ? sample.excerpt : "")
  const [author, setAuthor] = useState<string>(isEdit ? blogAuthors[0] : "")
  const [readTime, setReadTime] = useState(isEdit ? "6" : "")
  const [category, setCategory] = useState(isEdit ? sample.category : "")
  const [series, setSeries] = useState("")
  const [tags, setTags] = useState<string[]>(isEdit ? ["nextjs", "typescript", "shadcn"] : [])
  const [tagDraft, setTagDraft] = useState("")
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">(
    isEdit ? "published" : "draft"
  )
  const [visibility, setVisibility] = useState<"public" | "hidden" | "locked">("public")
  const [comments, setComments] = useState(isEdit)
  const [featured, setFeatured] = useState(isEdit)
  const [metaTitle, setMetaTitle] = useState(isEdit ? sample.title : "")
  const [metaDesc, setMetaDesc] = useState(isEdit ? sample.excerpt : "")

  const missing = [!title.trim(), !slug.trim(), !excerpt.trim(), !category].filter(Boolean).length
  const words = body.trim() ? body.trim().split(/\s+/).length : 0
  const seoScore = metaDesc.trim() ? 90 : 65

  const stepTone = (index: number) => {
    if (isEdit && index !== active) return "done" as const
    if (index < active) return "done" as const
    if (index === active) return "current" as const
    return "upcoming" as const
  }

  function goStep(index: number) {
    setActive(index)
    document.getElementById(`blog-step-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const sections = [0, 1, 2, 3]
      .map((index) => document.getElementById(`blog-step-${index}`))
      .filter((node): node is HTMLElement => node !== null)
    if (!sections.length) return

    const root = sections[0].closest("[data-page-scroll]")
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (!visible.length) return
        const topmost = visible.reduce((current, entry) =>
          entry.boundingClientRect.top < current.boundingClientRect.top ? entry : current
        )
        const index = Number(topmost.target.id.replace("blog-step-", ""))
        if (Number.isInteger(index)) setActive(index)
      },
      { root: root instanceof Element ? root : null, rootMargin: "-150px 0px -55% 0px" }
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  function addTag(value: string) {
    const next = value.replace(/^#/, "").trim().toLocaleLowerCase("tr")
    if (!next || tags.includes(next) || tags.length >= 10) return
    setTags((current) => [...current, next])
    setTagDraft("")
  }

  const categoryOptions = blogCategories.map((item) => ({
    id: item.id,
    label: item[locale],
  }))

  const visOptions = [
    { id: "public" as const, title: text.visPublic, hint: text.visPublicHint, icon: Globe },
    { id: "hidden" as const, title: text.visHidden, hint: text.visHiddenHint, icon: EyeOff },
    { id: "locked" as const, title: text.visLocked, hint: text.visLockedHint, icon: Lock },
  ]

  const sectionBadge = (index: number) => {
    const tone = stepTone(index)
    if (tone === "done") return <StatusBadge tone="success">{text.done}</StatusBadge>
    if (tone === "current") return <Badge variant="secondary">{text.inProgress}</Badge>
    return null
  }

  const statuses = useMemo(
    () =>
      [
        { id: "draft" as const, label: text.draft },
        { id: "published" as const, label: text.published },
        { id: "scheduled" as const, label: text.scheduled },
      ] as const,
    [text.draft, text.published, text.scheduled]
  )

  return (
    <DensityBoard data-blog-editor="" className="px-6">
      <StickyStepperHeader
        title={isEdit ? text.editTitle : undefined}
        steps={text.steps}
        active={active}
        onStepClick={goStep}
        stepTone={stepTone}
      />

      <div
        data-blog-form=""
        className="mx-auto flex w-[90%] flex-col gap-[var(--density-gap)]"
      >
      <Card id="blog-step-0" className="scroll-mt-24 gap-0 py-0 shadow-sm">
        <CardContent className="flex flex-col gap-5 py-5">
          <div className="flex items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{text.steps[0].title}</h2>
                <p className="text-sm text-muted-foreground">{text.steps[0].hint}</p>
              </div>
            </div>
            {sectionBadge(0)}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>
                {text.title} <span className="text-destructive">{text.required}</span>
              </Label>
              <span className="text-xs text-muted-foreground">{title.length} / 100</span>
            </div>
            <Input
              value={title}
              maxLength={100}
              onChange={(event) => {
                setTitle(event.target.value)
                setSlug(slugify(event.target.value))
                setMetaTitle(event.target.value)
              }}
            />
            <p className="text-xs text-muted-foreground">{text.titleHint}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              {text.slug} <span className="text-destructive">{text.required}</span>
            </Label>
            <div className="flex overflow-hidden rounded-lg border border-input">
              <span className="flex items-center bg-muted px-3 text-xs text-muted-foreground">
                {text.slugPrefix}
              </span>
              <Input
                className="rounded-none border-0 shadow-none focus-visible:ring-0"
                value={slug}
                onChange={(event) => setSlug(slugify(event.target.value))}
              />
            </div>
            <p className="text-xs text-muted-foreground">{text.slugHint}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>
                {text.excerpt} <span className="text-destructive">{text.required}</span>
              </Label>
              <span className="text-xs text-muted-foreground">{excerpt.length} / 160</span>
            </div>
            <Textarea
              rows={3}
              maxLength={160}
              placeholder={text.excerptPlaceholder}
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">{text.excerptHint}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>
                {text.author} <span className="text-destructive">{text.required}</span>
              </Label>
              <Select value={author} onValueChange={(value) => setAuthor(value ?? blogAuthors[0])}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {blogAuthors.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>{text.readTime}</Label>
                <span className="text-[11px] text-muted-foreground">{text.autoRead}</span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  value={readTime}
                  onChange={(event) => setReadTime(event.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                  {text.minutes}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card id="blog-step-1" className="scroll-mt-24 gap-0 py-0 shadow-sm">
        <CardContent className="flex flex-col gap-5 py-5">
          <div className="flex items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FilePenLine className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{text.steps[1].title}</h2>
                <p className="text-sm text-muted-foreground">{text.steps[1].hint}</p>
              </div>
            </div>
            {sectionBadge(1)}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              {text.body} <span className="text-destructive">{text.required}</span>
            </Label>
            <div className="overflow-hidden rounded-xl border border-input">
              <div className="flex items-center gap-1 border-b bg-muted px-2 py-1.5">
                <Button type="button" size="xs" variant="outline">
                  {text.paragraph}
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <Bold />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <Italic />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <Link2 />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <List />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <ListOrdered />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <Quote />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <Code />
                </Button>
                <Button type="button" size="icon-xs" variant="ghost">
                  <ImagePlus />
                </Button>
                <span className="ml-auto flex gap-1">
                  <Button type="button" size="icon-xs" variant="ghost">
                    <Undo2 />
                  </Button>
                  <Button type="button" size="icon-xs" variant="ghost">
                    <Redo2 />
                  </Button>
                </span>
              </div>
              <Textarea
                className="min-h-52 rounded-none border-0 focus-visible:ring-0"
                placeholder={text.bodyPlaceholder}
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
              <div className="flex items-center justify-between border-t bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <span>
                  {words} {text.words}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{text.bodyHint}</p>
          </div>
        </CardContent>
      </Card>

      <Card id="blog-step-2" className="scroll-mt-24 gap-0 py-0 shadow-sm">
        <CardContent className="flex flex-col gap-5 py-5">
          <div className="flex items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Images className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{text.steps[2].title}</h2>
                <p className="text-sm text-muted-foreground">{text.steps[2].hint}</p>
              </div>
            </div>
            {sectionBadge(2)}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              {text.cover} <span className="text-destructive">{text.required}</span>
            </Label>
            <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Upload className="size-5" />
              </span>
              <p className="font-semibold">{text.coverTitle}</p>
              <p className="text-xs text-muted-foreground">{text.coverHint}</p>
              <Button type="button" variant="outline" size="sm">
                {text.pickFile}
              </Button>
            </div>
            <Label className="text-xs text-muted-foreground">{text.alt}</Label>
            <Input disabled placeholder={text.altPlaceholder} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>
                  {text.category} <span className="text-destructive">{text.required}</span>
                </Label>
                <Button type="button" variant="link" size="sm" className="h-auto px-0 text-xs">
                  {text.newCategory}
                </Button>
              </div>
              <Select value={category || null} onValueChange={(value) => setCategory(value ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={text.categoryPick} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>
                {text.series}{" "}
                <span className="font-normal text-muted-foreground">({text.seriesOptional})</span>
              </Label>
              <Select value={series || null} onValueChange={(value) => setSeries(value ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={text.seriesNone} />
                </SelectTrigger>
                <SelectContent>
                  {blogSeries.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>{text.tags}</Label>
              <span className="text-xs text-muted-foreground">{tags.length} / 10</span>
            </div>
            <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-2 py-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={tag}
                    onClick={() => setTags((current) => current.filter((item) => item !== tag))}
                  >
                    <X />
                  </Button>
                </Badge>
              ))}
              <Input
                className="h-auto min-w-40 flex-1 border-0 bg-transparent px-1 py-0 shadow-none focus-visible:ring-0"
                placeholder={text.tagsPlaceholder}
                value={tagDraft}
                onChange={(event) => setTagDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addTag(tagDraft)
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{text.suggested}:</span>
              {blogSuggestedTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() => addTag(tag)}
                >
                  + {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card id="blog-step-3" className="scroll-mt-24 gap-0 py-0 shadow-sm">
        <CardContent className="flex flex-col gap-6 py-5">
          <div className="flex items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{text.steps[3].title}</h2>
                <p className="text-sm text-muted-foreground">{text.steps[3].hint}</p>
              </div>
            </div>
            {sectionBadge(3)}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{text.status}</Label>
            <ToggleGroup
              value={[status]}
              onValueChange={(value) => {
                const next = value[0]
                if (next === "draft" || next === "published" || next === "scheduled") {
                  setStatus(next)
                }
              }}
              spacing={1}
              className="w-full rounded-xl bg-muted p-1"
            >
              {statuses.map((item) => (
                <ToggleGroupItem
                  key={item.id}
                  value={item.id}
                  className="h-9 min-w-0 flex-1 rounded-lg text-sm font-medium data-[pressed]:bg-card data-[pressed]:font-semibold data-[pressed]:text-primary data-[pressed]:shadow-sm"
                >
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{text.visibility}</Label>
            <div className="grid gap-3 md:grid-cols-3"> 
              {visOptions.map((item) => {
                const Icon = item.icon
                const selected = visibility === item.id
                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant={selected ? "default" : "outline"}
                    onClick={() => setVisibility(item.id)}
                    className="flex h-auto items-start gap-3 rounded-xl p-3.5 text-left whitespace-normal"
                  >
                    <Icon className={cn("mt-0.5 size-4", selected ? "text-primary" : "text-muted-foreground")} />
                    <span>
                      <span className="block text-sm font-semibold">{item.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
                    </span>
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="divide-y border-y">
            <div className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold">{text.comments}</p>
                <p className="text-xs text-muted-foreground">{text.commentsHint}</p>
              </div>
              <Switch checked={comments} onCheckedChange={setComments} />
            </div>
            <div className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold">{text.featured}</p>
                <p className="text-xs text-muted-foreground">{text.featuredHint}</p>
              </div>
              <Switch checked={featured} onCheckedChange={setFeatured} />
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-xl bg-muted/50 p-5">
            <div className="flex items-center gap-2">
              <Search className="size-5 text-primary" />
              <h3 className="font-semibold">{text.seo}</h3>
            </div>
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label>{text.metaTitle}</Label>
                    <span className="text-xs text-muted-foreground">{metaTitle.length} / 60</span>
                  </div>
                  <Input
                    maxLength={60}
                    value={metaTitle}
                    onChange={(event) => setMetaTitle(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label>{text.metaDesc}</Label>
                    <span className="text-xs text-muted-foreground">{metaDesc.length} / 160</span>
                  </div>
                  <Textarea
                    rows={2}
                    maxLength={160}
                    placeholder={text.metaDescPlaceholder}
                    value={metaDesc}
                    onChange={(event) => setMetaDesc(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-5">
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {text.googlePreview}
                </span>
                <div className="flex flex-col gap-1.5 rounded-xl border bg-card p-3.5">
                  <p className="truncate text-xs">{text.previewHost}</p>
                  <p className="line-clamp-1 text-sm font-semibold text-primary">{metaTitle || title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {metaDesc.trim() || text.previewEmpty}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{text.seoScore}</span>
                  <span className="font-bold text-primary">{seoScore}%</span>
                </div>
                <Progress value={seoScore} />
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check className="size-3.5 text-primary" />
                  {text.seoTitleOk}
                </p>
                {!metaDesc.trim() ? (
                  <p className="text-[11px] text-muted-foreground">{text.seoDescMissing}</p>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      <div
        data-density-toolbar=""
        className={cn(
          "sticky bottom-0 z-20 flex flex-col items-center justify-between gap-2 border-t bg-card py-2 sm:flex-row sm:items-center",
          "shadow-[0_-10px_20px_-14px_rgb(0_0_0/0.2)]",
          densityStickyBleedX,
          "-mb-[var(--density-pad-y)]"
        )}
      >
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{text.autosave}</span>
          {missing > 0 ? (
            <Badge variant="outline">
              {missing} {text.missing}
            </Badge>
          ) : null}
        </div>
        <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto">
          <Button type="button" variant="outline" size="sm">
            <Bookmark />
            {text.saveDraft}
          </Button>
          <Button type="button" size="sm" disabled={missing > 0}>
            <Send />
            {text.publish}
          </Button>
        </div>
      </div>
    </DensityBoard>
  )
}
