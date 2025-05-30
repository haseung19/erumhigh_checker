import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

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
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* 요약 카드 */}
      <Card className="col-span-1 sm:col-span-1">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">전체</p>
          <p className="text-3xl font-bold">150</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 sm:col-span-1">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">출석</p>
          <p className="text-3xl font-bold text-green-500">87</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 sm:col-span-1">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">장결자</p>
          <p className="text-3xl font-bold text-rose-500">16</p>
        </CardContent>
      </Card>

      {/* 선 그래프 */}
      <Card className="col-span-1 sm:col-span-1 row-span-2">
        <CardContent className="p-4">
          <p className="font-bold mb-2">주차별 학생 출석</p>
          <LineChart width={250} height={150} data={weekData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" />
          </LineChart>
        </CardContent>
      </Card>

      {/* 학년별 카드 */}
      {[1, 2, 3].map((grade) => (
        <Card key={grade} className="col-span-1">
          <CardContent className="p-4 text-center space-y-1">
            <p className="text-sm font-bold">{grade}학년</p>
            <p className="text-xs text-muted-foreground">전체 65</p>
            <p className="text-sm text-green-500">출석 38</p>
            <p className="text-sm text-rose-500">장결자 15</p>
          </CardContent>
        </Card>
      ))}

      {/* 교사 카드 */}
      <Card className="col-span-1">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">교사 전체</p>
          <p className="text-2xl font-bold">36</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">교사 출석</p>
          <p className="text-2xl font-bold text-green-500">22</p>
        </CardContent>
      </Card>

      {/* 도넛 차트 */}
      <Card className="col-span-2">
        <CardContent className="p-4 text-center">
          <p className="font-bold mb-2">비율</p>
          <PieChart width={300} height={200}>
            <Pie
              data={ratioData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              label
            >
              {ratioData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <p className="text-sm mt-2 text-muted-foreground">총 출석 58%</p>
        </CardContent>
      </Card>
    </div>
  );
}
