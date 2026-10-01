"use client"

import { useState, type ReactNode } from "react"
import { LayoutGrid, Rows3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "cn"
import { useThemeSettings } from "@/components/theme/theme-provider"
import type { ThemeAppearance } from "@/lib/theme/accents"
import type { MenuLocale } from "../sidebar/menu-items"
import {
  settingsColors,
  settingsFonts,
  settingsLayouts,
  settingsSizes,
  settingsText,
  type SettingsLayout,
} from "./data"

function pickOne(next: string[], current: string) {
  return next.at(-1) ?? current
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card size="sm">
      <CardHeader>
        <Badge>{title}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">{children}</CardContent>
    </Card>
  )
}

function LayoutFrame({ kind }: { kind: SettingsLayout }) {
  if (kind === "top") {
    return (
      <div className="flex h-12 w-full flex-col overflow-hidden rounded-lg bg-background ring-1 ring-border">
        <div className="h-2.5 bg-sky-300" />
        <div className="m-1 flex-1 rounded-sm bg-muted" />
      </div>
    )
  }

  return (
    <div className="flex h-12 w-full overflow-hidden rounded-lg bg-background ring-1 ring-border">
      {kind === "right" ? <div className="m-1 flex-1 rounded-sm bg-muted" /> : null}
      <div className={cn("w-3.5 bg-sky-300", kind === "right" && "order-last")} />
      {kind === "side" ? <div className="m-1 flex-1 rounded-sm bg-muted" /> : null}
    </div>
  )
}

export function SettingsPanel({ locale }: { locale: MenuLocale }) {
  const text = settingsText(locale)
  const { appearance, density, setAppearance, setDensity } = useThemeSettings()
  const [layout, setLayout] = useState<SettingsLayout>("side")
  const [font, setFont] = useState("nunito")
  const [size, setSize] = useState("16")
  const [footer, setFooter] = useState(true)

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <Section title="Layout">
        <ToggleGroup
          value={[layout]}
          onValueChange={(value) =>
            setLayout(pickOne(value, layout) as SettingsLayout)
          }
          className="grid w-full grid-cols-3"
        >
          {settingsLayouts.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              className="h-auto flex-col gap-1.5 px-1.5 py-1.5"
            >
              <LayoutFrame kind={item} />
              <span className="text-[11px] font-normal text-muted-foreground">{text[item]}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
          <span className="inline-flex items-center gap-2 text-sm">
            <Rows3 className="size-4 text-muted-foreground" />
            {text.footer}
          </span>
          <Switch checked={footer} onCheckedChange={setFooter} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2">
          <span className="inline-flex items-center gap-2 text-sm">
            <LayoutGrid className="size-4 text-muted-foreground" />
            {text.density}
          </span>
          <Switch
            checked={density === "compact"}
            onCheckedChange={(checked) => setDensity(checked ? "compact" : "comfortable")}
          />
        </div>
      </Section>

      <Section title="Theme">
        <ToggleGroup
          value={[appearance]}
          onValueChange={(value) =>
            setAppearance(pickOne(value, appearance) as ThemeAppearance)
          }
          className="flex w-full flex-wrap justify-between gap-2"
        >
          {settingsColors.map((item) => (
            <ToggleGroupItem
              key={item.id}
              value={item.id}
              aria-label={item.id === "dark" ? text.dark : item.id}
              className="size-8 min-w-8 rounded-lg p-0"
            >
              <span className={cn("size-5 rounded-md", item.className)} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Section>

      <Section title="Font">
        <p className="text-xs text-muted-foreground">{text.family}</p>
        <ToggleGroup
          value={[font]}
          onValueChange={(value) => setFont(pickOne(value, font))}
          className="grid w-full grid-cols-2"
        >
          {settingsFonts.map((item) => (
            <ToggleGroupItem
              key={item.id}
              value={item.id}
              className={cn("h-auto flex-col gap-1 px-2 py-3", item.className)}
            >
              <span className="text-lg leading-none font-normal">Aa</span>
              <span className="text-xs font-normal text-muted-foreground">{item.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{text.size}</p>
          <ToggleGroup
            value={[size]}
            onValueChange={(value) => setSize(pickOne(value, size))}
            spacing={1}
          >
            {settingsSizes.map((item) => (
              <ToggleGroupItem key={item} value={item} size="sm" className="rounded-full px-2">
                {item}px
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </Section>
    </div>
  )
}
