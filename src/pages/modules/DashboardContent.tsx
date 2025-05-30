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

const COLORS = ["#f97316", "#10b981", "#6366f1", "#F73463", "#6b7280"];

export default function DashboardContent() {
  return (
    <div className="h-full flex flex-col">
      {/* 모바일에서는 1열, lg 이상에서 10열로 좌6/우4 비율 유지 */}
      <div className="grid grid-cols-1 lg:grid-cols-10 h-full w-full gap-4">

        {/* 왼쪽 6/10: 모바일 col-span-1, lg:col-span-6 */}
        <div className="col-span-1 lg:col-span-6 grid grid-rows-[1fr_2fr_1fr] gap-4 h-full">

          {/* 상단 요약 카드 3개 (가로 1:1:1) */}
          <div className="grid grid-cols-3 gap-4 h-full">
            {[
              { label: "전체", value: 150, valueClass: "" },
              { label: "출석", value: 87, valueClass: "text-[#43D1A7]" },
              { label: "장결자", value: 16, valueClass: "text-[#F73463]" },
            ].map(({ label, value, valueClass }, idx) => (
              <Card
                key={idx}
                className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-2"
              >
                <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                  <p className="text-sm text-[#888888]">
                    {label}
                  </p>
                  <p className={`text-2xl font-bold ${valueClass}`}>
                    {value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 중단 학년별 카드 3개 */}
          <div className="grid grid-cols-3 gap-4 h-full">
            {[1, 2, 3].map((grade) => (
              <Card
                key={grade}
                className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-0 py-4"
              >
                <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 space-y-1">
                  <p className="font-semibold text-2xl">{grade}학년</p>
                  <div className="flex flex-row gap-2">
                    <div>
                      <p className="text-lg text-[#888888]">전체</p>
                      <p className="text-lg text-[#888888]">출석</p>
                      <p className="text-lg text-[#888888]">장결</p>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-[#242424] dark:text-[#fafafa]">65</p>
                      <p className="text-lg font-extrabold text-[#43D1A7]">38</p>
                      <p className="text-lg font-extrabold text-[#F73463]">15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 하단 교사 카드 2개 */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <Card className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-2">
              <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                <p className="text-lg text-muted-foreground">교사 전체</p>
                <p className="text-2xl font-bold">36</p>
              </CardContent>
            </Card>
            <Card className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-2">
              <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                <p className="text-lg text-muted-foreground">교사 출석</p>
                <p className="text-2xl font-bold text-[#43D1A7]">22</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 오른쪽 4/10: 모바일 col-span-1, lg:col-span-4 → 모바일에서 왼쪽 밑으로 스택 */}
        <div className="col-span-1 lg:col-span-4 grid grid-rows-2 gap-4 h-full">
          <Card className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-2">
            <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
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
          <Card className="h-full bg-white dark:bg-[#353639] rounded-lg shadow p-2">
            <CardContent className="h-full flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
              <p className="font-semibold text-2xl  mb-2">비율</p>
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
              <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                총 출석 58%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
