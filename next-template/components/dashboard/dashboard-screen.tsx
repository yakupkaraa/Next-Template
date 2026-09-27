import {
  ChevronDown,
  Contact,
  FileText,
  Mail,
  TrendingUp,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const copy = {
  tr: {
    title: "Genel bakış",
    document: "Belge",
    contact: "Kişi",
    email: "E-posta",
    since: "Geçen haftadan beri",
    workflow: "Son iş akışı",
    marketing: "Son pazarlama",
    tracking: "Belge takip bilgisi",
    weekly: "Haftalık",
    name: "Ad",
    file: "Dosya",
    category: "Kategori",
    author: "Yazar",
    status: "Durum",
    sent: "Gönderildi",
    pending: "Beklemede",
    popular: "Popüler ürün",
    chat: "Sohbet",
  },
  en: {
    title: "Overview",
    document: "Document",
    contact: "Contact",
    email: "Email",
    since: "Since last week",
    workflow: "Recent Workflow",
    marketing: "Recent Marketing",
    tracking: "Document tracking information",
    weekly: "Weekly",
    name: "Name",
    file: "File",
    category: "Category",
    author: "Author",
    status: "Status",
    sent: "Sent",
    pending: "Pending",
    popular: "Popular Product",
    chat: "Chat",
  },
}

const documents = [
  {
    name: "Annual Report",
    file: "PDF",
    category: "Property",
    author: "Diana Matthews",
    status: "sent" as const,
  },
  {
    name: "Business Plan",
    file: "WORD",
    category: "Cryptocurrency",
    author: "Philip James",
    status: "sent" as const,
  },
  {
    name: "Marketing Tool",
    file: "PDF",
    category: "Content Creator",
    author: "Amanda Ross",
    status: "pending" as const,
  },
]

const products = [
  { name: "Gadget Converter", price: "$200" },
  { name: "Lens Camera", price: "$50" },
  { name: "Airpods", price: "$100" },
  { name: "Macbook", price: "$300" },
]

const chats = [
  { name: "Debra Young", note: "What is the status?" },
  { name: "Dorothy Collins", note: "Can we talk this morning" },
  { name: "Chris Jordan", note: "How about the meeting" },
  { name: "Denise Murphy", note: "What is the status?" },
]

const bars = [46, 62, 38, 78, 52, 70, 40, 96, 58, 84, 48, 88]

function Trend({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-0.5 font-medium text-emerald-600">
        <TrendingUp className="size-3" />
        17 %
      </span>
      {label}
    </p>
  )
}

function WorkflowChart() {
  return (
    <svg viewBox="0 0 320 110" className="h-28 w-full text-sky-500" aria-hidden>
      <path
        d="M4 72 C 24 74, 36 42, 54 50 S 86 82, 108 58 S 146 18, 168 30 S 206 16, 228 24 S 268 46, 292 22 L 316 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MarketingChart() {
  return (
    <svg viewBox="0 0 320 110" className="h-28 w-full" aria-hidden>
      {bars.map((height, index) => (
        <rect
          key={index}
          x={index * 26 + 6}
          y={108 - height}
          width="14"
          height={height}
          rx="3"
          className="fill-cyan-500"
        />
      ))}
    </svg>
  )
}

export function DashboardScreen({ locale }: { locale: "tr" | "en" }) {
  const text = copy[locale]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.document}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <FileText className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">146.000</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.contact}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <Contact className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">1400</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.email}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <Mail className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">150.700</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{text.workflow}</CardTitle>
            <span className="inline-flex items-center gap-0.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="size-3.5" />
              17 %
            </span>
          </CardHeader>
          <CardContent>
            <WorkflowChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{text.marketing}</CardTitle>
            <span className="inline-flex items-center gap-0.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="size-3.5" />
              17 %
            </span>
          </CardHeader>
          <CardContent>
            <MarketingChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <CardTitle>{text.document}</CardTitle>
              <p className="text-sm text-muted-foreground">{text.tracking}</p>
            </div>
            <Button type="button" variant="outline" size="sm">
              {text.weekly}
              <ChevronDown />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{text.name}</TableHead>
                  <TableHead>{text.file}</TableHead>
                  <TableHead>{text.category}</TableHead>
                  <TableHead>{text.author}</TableHead>
                  <TableHead>{text.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.file}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      <span
                        className={
                          row.status === "sent"
                            ? "inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                            : "inline-flex rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700"
                        }
                      >
                        {row.status === "sent" ? text.sent : text.pending}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{text.popular}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {products.map((product) => (
                <div key={product.name} className="flex items-center justify-between gap-3">
                  <span>{product.name}</span>
                  <span className="text-muted-foreground">{product.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{text.chat}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {chats.map((person) => (
                <div key={person.name} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-slate-900 text-xs text-white">
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{person.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{person.note}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
