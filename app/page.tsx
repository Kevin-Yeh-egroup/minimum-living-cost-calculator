import { MinimumLivingCostCalculator } from "@/components/minimum-living-cost-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">台灣最低生活費計算器</h1>
            <p className="text-lg text-muted-foreground text-pretty">根據政府公告標準，快速計算您的家戶最低生活費</p>
          </header>
          <MinimumLivingCostCalculator />
        </div>
      </div>
    </main>
  )
}
