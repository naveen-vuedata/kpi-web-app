import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface DataPoint {
  [key: string]: string | number
}

interface ChartPreviewProps {
  chartType?: string
  dataPoints?: DataPoint[]
  title?: string
}

export function ChartPreview({ chartType = "line", dataPoints = [], title = "Data Visualization" }: ChartPreviewProps) {
  if (!dataPoints || dataPoints.length === 0) {
    return (
      <Card className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Charts will appear here</p>
        </div>
      </Card>
    )
  }

  const dataKeys = Object.keys(dataPoints[0] || {}).filter((key) => key !== "name" && key !== "label" && key !== "x")

  const renderChart = () => {
    switch (chartType?.toLowerCase()) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataPoints} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(dataPoints[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, idx) => (
                <Bar key={key} dataKey={key} fill={`hsl(var(--chart-${(idx % 5) + 1}))`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataPoints}
                dataKey={dataKeys[0] || "value"}
                nameKey={Object.keys(dataPoints[0])[0]}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {dataPoints.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={`hsl(var(--chart-${(idx % 5) + 1}))`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(dataPoints[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`hsl(var(--chart-${(idx % 5) + 1}))`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">{renderChart()}</CardContent>
    </Card>
  )
}
