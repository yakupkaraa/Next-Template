import { ArrowRight, Bookmark, Clock, Eye, Heart } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "cn"
import { blogCopy, blogPosts, type BlogLocale } from "./data"

type Post = (typeof blogPosts)[number]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

export function BlogArticleCard({
  post,
  locale,
}: {
  post: Post
  locale: BlogLocale
}) {
  const text = blogCopy[locale]

  return (
    <Card className="h-full gap-0 py-0 transition-colors hover:ring-primary/40 m-2">
      <div className="relative h-48 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-500 group-hover/card:scale-105",
            post.cover
          )}
        />
        {post.featured ? (
          <Badge className="absolute top-3 left-3 uppercase">{text.featured}</Badge>
        ) : null}
      </div>
      <CardHeader className="gap-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                {initials(post.author)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-semibold">{post.author}</span>
              <span className="text-[10px] text-muted-foreground">
                {post.role} • {post.time}
              </span>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <Clock className="size-3" />
            {post.read}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-lg font-bold leading-tight group-hover/card:text-primary">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter className="justify-between bg-transparent">
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="xs" className="text-muted-foreground">
            <Heart />
            {post.likes}
          </Button>
          <Button type="button" variant="ghost" size="xs" className="text-muted-foreground">
            <Eye />
            {post.views}
          </Button>
          <Button type="button" variant="ghost" size="icon-xs" className="text-muted-foreground">
            <Bookmark />
          </Button>
        </div>
        <Button type="button" variant="link" size="sm" className="h-auto px-0 uppercase">
          {text.read}
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
