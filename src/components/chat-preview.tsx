import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "recharts";
import {
  Activity,
  BarChart as BarIcon,
  Table as TableIcon,
  List as ListIcon,
} from "lucide-react";
import {
  ChartBlock,
  CustomBlock,
  KPIBlock,
  ListBlock,
  PayloadBlock,
  StatBlock,
  TableBlock,
  TextBlock,
} from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { cn } from "@/lib/utils";

/* ----------------------------- Utils ----------------------------- */
const COLORS = Array.from({ length: 8 }).map(
  (_, i) => `var(--chart-${(i % 5) + 1})`
);

function iconForType(type: string): any {
  switch (type) {
    case "kpi":
      return Activity;
    case "chart":
      return BarIcon;
    case "table":
      return TableIcon;
    case "list":
      return ListIcon;
    default:
      return Activity;
  }
}

/* ----------------------------- Block Views ----------------------------- */
function KPIBlockView({ block }: { block: KPIBlock }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm">KPI Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {block.data.metrics.map((m, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/60">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-lg font-semibold mt-1">{m.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ChartBlockView({ block }: { block: ChartBlock }) {
  const { chartType, data, xKey } = block.data;
  const dataKeys = Object.keys(data[0] || {}).filter((k) => k !== xKey);

  if (!data || data.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-sm text-muted-foreground">No data for chart</p>
        </CardContent>
      </Card>
    );
  }
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ChartContainer className="min-h-[200px]" config={chartConfig}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((k, idx) => (
                <Bar key={k} dataKey={k} fill={COLORS[idx % COLORS.length]} />
              ))}
            </BarChart>
          </ChartContainer>
        );

      case "pie":
        return (
          <ChartContainer className="min-h-[200px]" config={chartConfig}>
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKeys[0]}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
        );

      default:
      case "line":
        return (
          <ChartContainer className="min-h-[200px]" config={chartConfig}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((k, idx) => (
                <Line
                  key={k}
                  type="monotone"
                  dataKey={k}
                  stroke={"var(--chart-1)"}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* icon */}
          <div className="p-2 rounded-md bg-muted">
            {React.createElement(iconForType("chart") as any, {
              className: "w-4 h-4",
            })}
          </div>
          <CardTitle className="text-sm capitalize">
            {block?.data?.chartType}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}

function TableBlockView({ block }: { block: TableBlock }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {block.data.columns.map((c) => (
                <TableHead
                  key={c.key}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {c.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {block.data.rows.map((row, i) => (
              <TableRow key={i} className="even:bg-muted/30">
                {block.data.columns.map((c) => (
                  <TableCell key={c.key} className="text-sm px-3 py-2">
                    {String(row[c.key] ?? "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ListBlockView({ block }: { block: ListBlock }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {block.data.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TextBlockView({ block }: { block: TextBlock }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{block.data.value}</p>
      </CardContent>
    </Card>
  );
}

function StatBlockView({ block }: { block: StatBlock }) {
  return (
    <Card className="h-full flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{block.data.label}</p>
        <p className="text-3xl font-extrabold mt-2">{block.data.value}</p>
      </div>
    </Card>
  );
}

function CustomBlockView({ block }: { block: CustomBlock }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">Custom</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs p-3 bg-muted rounded text-wrap">
          {JSON.stringify(block.data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}

export function ChatPreview({
  blocks,
  enablePreview,
  loading,
}: {
  blocks?: PayloadBlock[];
  enablePreview?: boolean;
  loading?: boolean;
}) {
  const _blocks = blocks ?? [];

  return (
    <div
      className={cn("p-4 overflow-y-auto h-full transition-all duration-100 ", {
        "w-auto basis-1/2": enablePreview,
        "w-0": !enablePreview,
      })}
    >
      {loading && <div>Loading...</div>}
      <div
        className="grid gap-4 auto-rows-fr"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {_blocks.map((b, i) => {
          switch (b.type) {
            case "kpi":
              return <KPIBlockView key={i} block={b} />;
            case "chart":
              return <ChartBlockView key={i} block={b} />;
            case "table":
              return <TableBlockView key={i} block={b} />;
            case "list":
              return <ListBlockView key={i} block={b} />;
            case "text":
              return <TextBlockView key={i} block={b} />;
            case "stat":
              return <StatBlockView key={i} block={b} />;
            case "custom":
              return <CustomBlockView key={i} block={b} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
