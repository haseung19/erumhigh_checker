// pages/modules/DashboardContent.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const weekData = [
  { name: "1주차", value: 97 },
  { name: "2주차", value: 84 },
  { name: "3주차", value: 87 },
  { name: "4주차", value: 0 },
  { name: "5주차", value: 0 },
];

const ratioData = [
  { name: "1학년", value: 29.3 },
  { name: "2학년", value: 28.7 },
  { name: "3학년", value: 26.5 },
  { name: "장결자", value: 9.2 },
  { name: "기타", value: 6.3 },
];

const COLORS = ["#f97316", "#10b981", "#6366f1", "#ef4444", "#6b7280"];

export default function DashboardContent() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-10 w-full gap-4 flex-1">
        <div className="col-span-1 lg:col-span-6 grid grid-rows-[1fr_2fr_1fr] gap-4 flex-1">
          <div className="grid grid-cols-3 gap-4 flex-1">
            {[
              { label: "전체", value: 150, valueClass: "text-foreground" },
              { label: "출석", value: 87, valueClass: "text-chart-2" },
              { label: "장결자", value: 16, valueClass: "text-chart-5" },
            ].map(({ label, value, valueClass }, idx) => (
              <Card key={idx} className="h-full bg-card rounded-3xl shadow p-2">
                <CardContent className="h-full flex flex-col justify-center items-center text-foreground">
                  <p className="text-2xl font-extralight">{label}</p>
                  <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 h-full">
            {[1, 2, 3].map((grade) => (
              <Card key={grade} className="h-full bg-card rounded-3xl shadow p-0 py-4">
                <CardContent className="h-full flex flex-col justify-center items-center text-foreground space-y-1">
                  <p className="font-semibold text-2xl">{grade}학년</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center justify-center">
                      <p className="text-xl font-extralight">전체</p>
                      <p className="text-3xl font-extrabold">65</p>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <p className="text-xl font-extralight">출석</p>
                      <p className="text-3xl font-extrabold text-chart-2">38</p>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <p className="text-xl font-extralight">장결</p>
                      <p className="text-3xl font-extrabold text-chart-5">215</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 h-full">
            <Card className="h-full bg-card rounded-3xl shadow p-2">
              <CardContent className="h-full flex flex-col justify-center items-center text-foreground">
                <p className="text-2xl font-extralight">교사 전체</p>
                <p className="text-3xl font-bold">36</p>
              </CardContent>
            </Card>
            <Card className="h-full bg-card rounded-3xl shadow p-2">
              <CardContent className="h-full flex flex-col justify-center items-center text-foreground">
                <p className="text-2xl font-extralight">교사 출석</p>
                <p className="text-3xl font-bold text-chart-2">22</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 grid grid-rows-[auto_auto] gap-4 h-full">
          <Card className="h-full bg-card rounded-3xl shadow p-2">
            <CardContent className="h-full flex flex-col justify-center items-center text-foreground">
              <p className="font-semibold text-2xl mb-2">주차별 학생 출석</p>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={weekData}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", color: "#000" }}
                    itemStyle={{ color: "#000" }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="h-full bg-card rounded-3xl shadow p-2">
            <CardContent className="h-full flex flex-col justify-center items-center text-foreground">
              <p className="font-semibold text-2xl mb-2">비율</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={ratioData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={55}
                    strokeWidth={0}
                    label={{ fill: "#888888" }}
                  >
                    {ratioData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-sm mt-2 text-muted-foreground">총 출석 58%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
