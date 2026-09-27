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

const avatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAhq_jWJsCv_ho5WBDPZzlW-EvJFKVSYsSE3LT4TtxrYY5btwWGZyEA7HNTh24c9R85uDkFbOKzqtBsWH1PKnqcg5xVUzXynjUTbzr_6P8uK3gu1cMlijWNsHA2ujolFLh0SpewU6JrFG3GYymg-h2xdDzGdIhRDu4y1Lj328HmKt97pldwUkuvvtVTVlFCoVFR3eabXqXZQcCDpA-RGzr7FlXAOis06azuNUsn1GrfLDowuyx1xPgsraNfAjgiIxFk44KmLDRE7A"

const cover =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCdSkrTutpSSqcff2MBYMr-yMXaHCQ-uts68wLBTYbxIz3a22rF55rAAKeNQKmCl12yIZDa-cGgdq8GGhHXfk2lL9g68DMlUI7WVqXUdOjrmlsHl72EvLONGAaJYeT0W5u6_nSgBzyO4ImUkOJLDYwFGmB2zZ7pTNLJVumOYo-5Q4AzQPvC-15p6O8_tsTeq3ZVDg6v8CpNn5Lx2AxW5kynweVwKi27TW29_NRWt0_PQ5_MEMrXS3xOxnG1_ok49aMM4fNTq4dqaQ"

const postImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBli-vhQYvyR3fJlzeQWF5X_qgOL4cftJYxSrY4orPRJZIkXkob2eLB_T20nDTIkOplqQMWkbExcixBKeDlTAXyQcoJ-UpaLlRABdu0A7mTIBKTO8scN66xoiLsYFo2t3KeG8Mh26f8LNK_WdxvIhUzkQRiXKcwSx00kQARgLCSEq-ov5hSI2RHNawoUTlSdw57lR-RPlcuo1iVFm9Tu_L9sG_qW0thyT_s5ZckvZEb1EcQ2V9fLBMPcb8LSOTxed91ogL55cwEzQ"

const copy = {
  tr: {
    profile: "Profil",
    followers: "Takipçiler",
    friends: "Arkadaşlar",
    gallery: "Galeri",
    following: "Takip",
    about: "Hakkında",
    aboutText:
      "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.",
    liveAt: "Yaşadığı yer",
    country: "Birleşik Krallık",
    role: "CTO",
    company: "Gleicher, Mueller and Tromp",
    school: "Nikolaus – Leuschke",
    studied: "Okul",
    social: "Sosyal",
    placeholder: "Ne düşündüğünü burada paylaş...",
    image: "Görsel",
    stream: "Yayın",
    post: "Paylaş",
    comment: "Yorum yaz...",
    more: "Diğer",
  },
  en: {
    profile: "Profile",
    followers: "Followers",
    friends: "Friends",
    gallery: "Gallery",
    following: "Following",
    about: "About",
    aboutText:
      "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.",
    liveAt: "Lives in",
    country: "United Kingdom",
    role: "CTO",
    company: "Gleicher, Mueller and Tromp",
    school: "Nikolaus – Leuschke",
    studied: "Studied at",
    social: "Social",
    placeholder: "Share what you are thinking here...",
    image: "Image",
    stream: "Streaming",
    post: "Post",
    comment: "Write a comment...",
    more: "More",
  },
} as const

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

export function ProfileScreen({ locale }: { locale: "tr" | "en" }) {
  const text = copy[locale]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="relative h-64 overflow-hidden rounded-xl border border-border md:h-80">
        <img alt="" className="size-full object-cover" src={cover} />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-6 bg-linear-to-t from-black/60 to-transparent p-6 md:p-8">
          <Person
            className="size-24 border-4 border-background md:size-32"
            name="Jaydon Frankie"
            src={avatar}
          />
          <div className="pb-2 text-white">
            <h1 className="text-3xl font-semibold">Jaydon Frankie</h1>
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
                    <p className="text-xl font-semibold">1,947</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {text.followers}
                    </p>
                  </div>
                  <div className="flex-1 px-4 text-center">
                    <p className="text-xl font-semibold">9,124</p>
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
                      <span>jaydon.frankie@example.com</span>
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
                    {["Facebook", "Instagram", "LinkedIn", "Twitter"].map(
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
                      <Button type="button" variant="ghost">
                        <Video />
                        {text.stream}
                      </Button>
                    </div>
                    <Button type="button">{text.post}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="py-0">
                <CardHeader className="flex-row items-center justify-between pt-(--card-spacing)">
                  <div className="flex items-center gap-3">
                    <Person className="size-12" name="Jaydon Frankie" src={avatar} />
                    <div>
                      <CardTitle>Jaydon Frankie</CardTitle>
                      <p className="text-xs text-muted-foreground">11 Dec 2025</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" aria-label={text.more}>
                    <MoreVertical />
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="leading-relaxed">
                    The sun slowly set over the horizon, painting the sky in vibrant
                    hues of orange and pink.
                  </p>
                  <img
                    alt=""
                    className="h-64 w-full rounded-xl object-cover"
                    src={postImage}
                  />
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Button type="button" variant="ghost" size="sm">
                      <Heart className="fill-current" />
                      20
                    </Button>
                    <Button type="button" variant="ghost" size="icon" aria-label="Comment">
                      <MessageCircle />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" aria-label="Share">
                      <Share2 />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4">
                  <div className="flex gap-3">
                    <Person className="size-8" name="Lainey Davidson" src={avatar} />
                    <div className="flex-1 rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <h4 className="text-sm font-semibold">Lainey Davidson</h4>
                        <span className="text-xs text-muted-foreground">
                          09 Dec 2025
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Amazing view! Wish I was there.
                      </p>
                    </div>
                  </div>
                  <form className="flex gap-3">
                    <Person className="size-8" name="Jaydon Frankie" src={avatar} />
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
