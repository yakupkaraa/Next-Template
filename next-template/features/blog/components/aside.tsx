import { Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"
import { blogCopy, blogRecent, blogTags, type BlogLocale } from "../data"

export function BlogAside({ locale, className }: { locale: BlogLocale; className?: string }) {
  const text = blogCopy[locale]
  const newsletterId = "blog-newsletter-email"

  return (
    <aside className={cn("flex flex-col gap-6 mt-18 mr-2", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm tracking-wider text-muted-foreground uppercase">
            {text.popular}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {blogTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              #{tag}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-primary/10 ring-primary/20">
        <CardHeader>
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mail className="size-5" />
          </span>
          <CardTitle>{text.newsletterTitle}</CardTitle>
          <CardDescription className="text-xs">{text.newsletterBody}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2" onSubmit={(event) => event.preventDefault()}>
            <Label htmlFor={newsletterId} className="sr-only">
              {text.newsletterPlaceholder}
            </Label>
            <Input id={newsletterId} placeholder={text.newsletterPlaceholder} type="email" />
            <Button type="submit" className="w-full">
              {text.newsletterCta}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm tracking-wider text-muted-foreground uppercase">
            {text.recent}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {blogRecent.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              className="h-auto justify-start gap-3 px-2 py-2"
            >
              <span className={cn("size-12 shrink-0 rounded-lg", item.cover)} />
              <span className="flex min-w-0 flex-1 flex-col items-start text-left">
                <span className="w-full truncate text-xs font-semibold">{item.title}</span>
                <span className="text-[10px] font-normal text-muted-foreground">{item.time}</span>
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
