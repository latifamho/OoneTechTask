import { BarChart, LineChart, PieChart } from "lucide-react";

export default function WidgetContent({ type, data = {} }) {
  switch (type) {
    case "text":
      return <TextWidget data={data} />;
    case "chart":
      return <ChartWidget data={data} />;
    case "stats":
      return <StatsWidget data={data} />;
    case "image":
      return <ImageWidget data={data} />;
    default:
      return <DefaultWidget />;
  }
}

function TextWidget({ data }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-second">
        {data.heading || "Text Widget"}
      </h3>
      <p className="text-xs text-second">
        {data.content ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </p>
    </div>
  );
}

function ChartWidget({ data }) {
  const chartType = data.chartType || "bar";

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-second">
        {data.title || "Chart Widget"}
      </h3>
      <div className="h-24 bg-gray-50 rounded flex items-center justify-center">
        {chartType === "bar" && <BarChart className="text-blue-500" />}
        {chartType === "line" && <LineChart className="text-green-500" />}
        {chartType === "pie" && <PieChart className="text-purple-500" />}
      </div>
      <div className="flex justify-between text-xs text-second">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
      </div>
    </div>
  );
}

function StatsWidget({ data }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-second">
        {data.title || "Statistics"}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-blue-50 p-2 rounded text-center">
          <div className="text-lg font-bold text-blue-600">
            {data.value1 || "128"}
          </div>
          <div className="text-xs text-second">{data.label1 || "Users"}</div>
        </div>
        <div className="bg-green-50 p-2 rounded text-center">
          <div className="text-lg font-bold text-green-600">
            {data.value2 || "86%"}
          </div>
          <div className="text-xs text-second">
            {data.label2 || "Conversion"}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageWidget({ data }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-second">
        {data.title || "Image Widget"}
      </h3>
      <div className="rounded overflow-hidden border border-gray-200">
        <img
          src={data.imageUrl || "/placeholder.svg?height=150&width=300"}
          alt={data.title || "Widget image"}
          className="w-full h-24 object-cover"
        />
      </div>
      {data.caption && (
        <p className="text-xs text-second text-center">{data.caption}</p>
      )}
    </div>
  );
}

function DefaultWidget() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-second">Widget content</p>
    </div>
  );
}
