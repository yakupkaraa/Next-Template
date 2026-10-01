import {
  Briefcase,
  GraduationCap,
  Heart,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  MoreVertical,
  Send,
  Share2,
  User,
  Users,
  Video,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  profileContent,
  profileCopy,
  profileMedia,
  type ProfileLocale,
} from "./data"

function Person({
  name,
  src,
  className,
}: {
  name: string
  src: string
  className?: string
}) {
  return (
    <Avatar className={className}>
      <AvatarImage alt={name} src={src} />
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  )
}

export function ProfileScreen({ locale }: { locale: ProfileLocale }) {
  const text = profileCopy[locale]

  return (
    <div className="mx-auto flex w-4/5 min-w-0 flex-col gap-6">
      <section className="profile-cover relative h-64 overflow-hidden rounded-xl md:h-80">
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-6 bg-linear-to-t from-black/55 via-black/20 to-transparent p-6 md:p-8">
          <Person
            className="size-24 border-4 border-background md:size-32"
            name={profileContent.name}
            src={profileMedia.avatar}
          />
          <div className="pb-2 text-white">
            <h1 className="text-3xl font-semibold">{profileContent.name}</h1>
            <p className="font-medium text-white/80">{text.role}</p>
          </div>
        </div>
      </section>

      <Tabs defaultValue="profile">
        <Card className="py-0">
          <TabsList
            variant="line"
            className="h-auto w-full justify-start gap-2 overflow-visible rounded-xl bg-transparent px-4"
          >
            <TabsTrigger value="profile">
              <User />
              {text.profile}
            </TabsTrigger>
            <TabsTrigger value="followers">
              <Heart />
              {text.followers}
            </TabsTrigger>
            <TabsTrigger value="friends">
              <Users />
              {text.friends}
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <ImageIcon />
              {text.gallery}
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <Card>
                <CardContent className="flex divide-x divide-border">
                  <div className="flex-1 px-4 text-center">
                    <p className="text-xl font-semibold">{profileContent.followersCount}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {text.followers}
                    </p>
                  </div>
                  <div className="flex-1 px-4 text-center">
                    <p className="text-xl font-semibold">{profileContent.followingCount}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {text.following}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text.about}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {text.aboutText}
                  </p>
                  <ul className="flex flex-col gap-4 text-sm">
                    <li className="flex items-start gap-3">
                      <MapPin className="size-5 shrink-0 text-muted-foreground" />
                      <span>
                        {text.liveAt}{" "}
                        <span className="font-semibold">{text.country}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="size-5 shrink-0 text-muted-foreground" />
                      <span>{profileContent.email}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Briefcase className="size-5 shrink-0 text-muted-foreground" />
                      <span>
                        {text.role}{" "}
                        <span className="font-semibold">{text.company}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <GraduationCap className="size-5 shrink-0 text-muted-foreground" />
                      <span>
                        {text.studied}{" "}
                        <span className="font-semibold">{text.school}</span>
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text.social}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                    {profileContent.socials.map(
                      (name) => (
                        <li key={name}>
                          <a href="#" className="hover:text-foreground">
                            {name}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-8">
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Textarea
                    className="min-h-20 resize-none"
                    placeholder={text.placeholder}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost">
                        <ImageIcon />
                        {text.image}
                      </Button>
                    </div>
                    <Button type="button">{text.post}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-0">
                <CardHeader className="flex-row items-center justify-between pt-(--card-spacing)">
                  <div className="flex items-center gap-3">
                    <Person className="size-12" name={profileContent.name} src={profileMedia.avatar} />
                    <div>
                      <CardTitle>{profileContent.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{profileContent.postDate}</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" aria-label={text.more}>
                    <MoreVertical />
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="leading-relaxed">{profileContent.postBody}</p>
                  <img
                    alt=""
                    className="h-64 w-full rounded-xl object-cover"
                    src={profileMedia.post}
                  />
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Button type="button" variant="ghost" size="sm">
                      <Heart className="fill-current" />
                      {profileContent.likes}
                    </Button>
                    <Button type="button" variant="ghost" size="icon" aria-label={text.commentAction}>
                      <MessageCircle />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" aria-label={text.share}>
                      <Share2 />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4">
                  <div className="flex gap-3">
                    <Person className="size-8" name={profileContent.commenter} src={profileMedia.avatar} />
                    <div className="flex-1 rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <h4 className="text-sm font-semibold">{profileContent.commenter}</h4>
                        <span className="text-xs text-muted-foreground">
                          {profileContent.commentDate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{profileContent.commentBody}</p>
                    </div>
                  </div>
                  <form className="flex gap-3">
                    <Person className="size-8" name={profileContent.name} src={profileMedia.avatar} />
                    <div className="relative flex-1">
                      <Input
                        className="h-10 rounded-full pr-10"
                        placeholder={text.comment}
                        type="text"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-1 -translate-y-1/2"
                        aria-label={text.post}
                      >
                        <Send />
                      </Button>
                    </div>
                  </form>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
