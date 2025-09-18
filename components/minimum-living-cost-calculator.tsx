"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Users, MapPin, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 最低生活費資料
const livingCostData = {
  台北市: 20379,
  新北市: 16900,
  桃園市: 16768,
  台中市: 16077,
  台南市: 15515,
  高雄市: 16040,
  基隆市: 15515,
  宜蘭縣: 15515,
  新竹市: 15515,
  新竹縣: 15515,
  苗栗縣: 15515,
  彰化縣: 15515,
  南投縣: 15515,
  雲林縣: 15515,
  嘉義市: 15515,
  嘉義縣: 15515,
  屏東縣: 15515,
  台東縣: 15515,
  花蓮縣: 15515,
  澎湖縣: 15515,
  金門縣: 14341,
  連江縣: 14341,
}

const regionGroups = {
  六都: ["台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市"],
  台灣省: [
    "基隆市",
    "宜蘭縣",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義市",
    "嘉義縣",
    "屏東縣",
    "台東縣",
    "花蓮縣",
    "澎湖縣",
  ],
  福建省: ["金門縣", "連江縣"],
}

export function MinimumLivingCostCalculator() {
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [householdSize, setHouseholdSize] = useState<string>("")
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    if (!selectedRegion || !householdSize) return

    const costPerPerson = livingCostData[selectedRegion as keyof typeof livingCostData]
    const totalCost = costPerPerson * Number.parseInt(householdSize)
    setResult(totalCost)
  }

  const handleReset = () => {
    setSelectedRegion("")
    setHouseholdSize("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* 計算器主體 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            計算器
          </CardTitle>
          <CardDescription>請選擇您的居住地區並輸入家庭成員數量</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* 地區選擇 */}
          <div className="space-y-2">
            <Label htmlFor="region" className="flex items-center gap-2 text-base font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              居住地區
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="請選擇您的居住縣市" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(regionGroups).map(([groupName, regions]) => (
                  <div key={groupName}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{groupName}</div>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 家庭人數輸入 */}
          <div className="space-y-2">
            <Label htmlFor="household-size" className="flex items-center gap-2 text-base font-medium">
              <Users className="h-4 w-4 text-primary" />
              家庭成員數量
            </Label>
            <Input
              id="household-size"
              type="number"
              min="1"
              max="20"
              value={householdSize}
              onChange={(e) => setHouseholdSize(e.target.value)}
              placeholder="請輸入家庭成員數量"
              className="h-12 text-lg"
            />
          </div>

          {/* 按鈕區域 */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCalculate}
              disabled={!selectedRegion || !householdSize}
              className="flex-1 h-12 text-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              計算最低生活費
            </Button>
            <Button variant="outline" onClick={handleReset} className="h-12 px-6 bg-transparent">
              重新計算
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 計算結果 */}
      {result && (
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-2xl text-primary">計算結果</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  {selectedRegion} · {householdSize} 人家庭
                </p>
                <div className="text-5xl font-bold text-primary">NT$ {result.toLocaleString()}</div>
                <p className="text-lg text-muted-foreground">每月最低生活費</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm text-muted-foreground">計算方式：</p>
                <p className="text-base">
                  NT$ {livingCostData[selectedRegion as keyof typeof livingCostData].toLocaleString()}
                  <span className="text-muted-foreground"> (每人每月) </span>× {householdSize} 人 =
                  <span className="font-semibold text-primary"> NT$ {result.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 說明資訊 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm leading-relaxed">
          <strong>說明：</strong>最低生活費的訂定係以最近一年每人可支配所得中位數的 60% 為基準，
          金額不因兒童、身心障礙身分而異；兒少或身障之加發屬於其他補助制度，不影響本金額。
          本計算器僅計算金額，不判斷低收入戶或中低收入戶資格。
        </AlertDescription>
      </Alert>

      {/* 資料來源 */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground">資料來源</h3>
            <p className="text-sm text-muted-foreground">114年度各縣市最低生活費標準 · 中華民國政府公告</p>
            <p className="text-xs text-muted-foreground">資料更新時間：2025年1月</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
