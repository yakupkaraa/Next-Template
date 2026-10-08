import type { ProjectPriority } from "../constants/dashboard"

export const dashboardVisit = {
  total: "2,458",
  segments: [
    { key: "web", value: 1240, color: "var(--chart-1)" },
    { key: "mobile", value: 890, color: "var(--chart-2)" },
    { key: "other", value: 328, color: "var(--chart-3)" },
  ],
} as const

export const dashboardKpis = [
  { value: "96", tone: "chart-1" },
  { value: "3,650", tone: "chart-2" },
  { value: "356", tone: "chart-3" },
  { value: "696", tone: "chart-4" },
  { value: "$96k", tone: "chart-5" },
  { value: "59", tone: "primary" },
] as const

export const dashboardRevenue = {
  total: "$63,489.50",
  earnings: "$48,820",
  expense: "$26,498",
  bars: [
    { label: "14/08", value: 2.1 },
    { label: "15/08", value: -1.4 },
    { label: "16/08", value: 3.2 },
    { label: "17/08", value: 4.6 },
    { label: "18/08", value: -2.2 },
    { label: "19/08", value: 1.8 },
    { label: "20/08", value: 3.9 },
    { label: "21/08", value: 2.4 },
    { label: "22/08", value: 5.1 },
  ],
}

export const dashboardYearly = {
  amount: "$36,358",
  delta: 9,
  thisYear: 38,
  prevYear: 62,
}

export const dashboardMonthly = {
  amount: "$6,820",
  delta: 9,
  points: [
    { label: "1", value: 12 },
    { label: "2", value: 18 },
    { label: "3", value: 14 },
    { label: "4", value: 22 },
    { label: "5", value: 19 },
    { label: "6", value: 28 },
    { label: "7", value: 24 },
    { label: "8", value: 32 },
  ],
}

export const dashboardSalary = {
  salary: "$36,358",
  profit: "$5,296",
  highlight: 3,
  bars: [
    { label: "Apr", value: 42 },
    { label: "May", value: 58 },
    { label: "June", value: 36 },
    { label: "July", value: 88 },
    { label: "Aug", value: 44 },
    { label: "Sept", value: 62 },
  ],
}

export const dashboardCustomersSpark = [
  { label: "1", value: 18 },
  { label: "2", value: 22 },
  { label: "3", value: 16 },
  { label: "4", value: 28 },
  { label: "5", value: 24 },
  { label: "6", value: 34 },
  { label: "7", value: 30 },
]

export const dashboardProjectsBars = [
  { label: "1", value: 12 },
  { label: "2", value: 22 },
  { label: "3", value: 18 },
  { label: "4", value: 28 },
  { label: "5", value: 16 },
  { label: "6", value: 24 },
  { label: "7", value: 20 },
]

export const dashboardMiniStats = {
  customers: { value: "36,358", delta: 9 },
  projects: { value: "78,298", delta: 9 },
}

export const dashboardPromoPeople = ["LD", "SI", "AM", "PJ"]

export const dashboardBestSellers = [
  { name: "Lorem ipsum dolor", price: "$23,568", share: 55 },
  { name: "Sit amet elit", price: "$23,568", share: 20 },
]

export const dashboardWeekly = {
  points: [
    { label: "1", value: 18 },
    { label: "2", value: 28 },
    { label: "3", value: 22 },
    { label: "4", value: 40 },
    { label: "5", value: 32 },
    { label: "6", value: 48 },
    { label: "7", value: 36 },
    { label: "8", value: 44 },
  ],
  items: [
    { title: "Lorem ipsum", name: "Dolor sit amet", delta: 68, tone: "chart-1" },
    { title: "Consectetur", name: "Adipiscing elit", delta: 45, tone: "chart-2" },
    { title: "Sed do eiusmod", name: "Tempor incididunt", delta: 14, tone: "chart-3" },
  ],
}

export const dashboardProjectsTable = [
  {
    name: "Lorem Ipsum",
    role: "Dolor sit amet",
    project: "Consectetur elit",
    priority: "low" as ProjectPriority,
    budget: "$3.9k",
    initials: "LI",
  },
  {
    name: "Adipiscing Elit",
    role: "Sed do eiusmod",
    project: "Tempor incididunt",
    priority: "medium" as ProjectPriority,
    budget: "$24.5k",
    initials: "AE",
  },
  {
    name: "Labore Magna",
    role: "Aliqua enim",
    project: "Minim veniam",
    priority: "high" as ProjectPriority,
    budget: "$12.8k",
    initials: "LM",
  },
  {
    name: "Quis Nostrud",
    role: "Exercitation ullam",
    project: "Laboris nisi",
    priority: "veryHigh" as ProjectPriority,
    budget: "$2.4k",
    initials: "QN",
  },
]
