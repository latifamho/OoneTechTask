import { useState } from "react";
import { useDrag } from "react-dnd";
import { LayoutGrid, BarChart3, ImageIcon, FileText } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Input } from "./input";
import { useForm } from "react-hook-form"; 
const WIDGET_TYPE = "WIDGET";

function DraggableWidgetItem({ widget, onDragStart }) {
  const [{ isDragging }, drag] = useDrag({
    type: WIDGET_TYPE,
    item: () => {
      if (onDragStart) onDragStart(widget);
      return widget;
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      // whileHover={{
      //   x: -35,
      //   boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.1)",
      //   transition: {
      //     type: "spring",
      //   },
      // }}
      // initial={{
      //   x: 0,
      //   boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
      // }}
      ref={drag}
      className={`cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{ touchAction: "none" }}
    >
      <div className="flex gap-2 p-3 rounded-lg border border-gray-200 bg-white  hover:shadow-sm transition-all">
        <div className="w-12 h-12 flex items-center justify-center rounded bg-gray-100 text-gray-500">
          {widget.type === "text" && <FileText size={20} />}
          {widget.type === "chart" && <BarChart3 size={20} />}
          {widget.type === "stats" && <LayoutGrid size={20} />}
          {widget.type === "image" && <ImageIcon size={20} />}
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-semibold text-gray-800">
            {widget.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {widget.description}
          </p>
          <div className="mt-1 inline-block bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">
            {widget.category}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onToggle, onDragStart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Widget templates data
  const widgetTemplates = [
    {
      id: "text-widget",
      title: "Text Widget",
      description: "Display text content, paragraphs, and headings",
      type: "text",
      category: "Content",
      data: {
        heading: "Information",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    },
    {
      id: "bar-chart",
      title: "Bar Chart",
      description: "Visualize data with a bar chart",
      type: "chart",
      category: "Analytics",
      data: {
        title: "Monthly Sales",
        chartType: "bar",
      },
    },
    {
      id: "line-chart",
      title: "Line Chart",
      description: "Track trends with a line chart",
      type: "chart",
      category: "Analytics",
      data: {
        title: "Performance Metrics",
        chartType: "line",
      },
    },
    {
      id: "stats-widget",
      title: "Statistics Widget",
      description: "Display key metrics and KPIs",
      type: "stats",
      category: "Analytics",
      data: {
        title: "Key Metrics",
        value1: "128",
        label1: "Users",
        value2: "86%",
        label2: "Conversion",
      },
    },
    {
      id: "image-widget",
      title: "Image Widget",
      description: "Display images with optional captions",
      type: "image",
      category: "Media",
      data: {
        title: "Featured Image",
        imageUrl: "/placeholder.svg?height=150&width=300",
        caption: "Image caption",
      },
    },
    {
      id: "user-stats",
      title: "User Statistics",
      description: "Show user engagement metrics",
      type: "stats",
      category: "Analytics",
      data: {
        title: "User Engagement",
        value1: "5.2k",
        label1: "Active Users",
        value2: "12m",
        label2: "Avg. Time",
      },
    },
  ];

  // Filter widgets based on search and category
  const filteredWidgets = widgetTemplates.filter((widget) => {
    const matchesSearch =
      widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || widget.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    "All",
    ...new Set(widgetTemplates.map((widget) => widget.category)),
  ];

  // Count widgets by category
  const categoryCounts = categories.reduce((acc, category) => {
    if (category === "All") {
      acc[category] = widgetTemplates.length;
    } else {
      acc[category] = widgetTemplates.filter(
        (widget) => widget.category === category
      ).length;
    }
    return acc;
  }, {});
  const { register } = useForm();
  const [focus, setFocus] = useState({
    comment: false,
  });

  const handleFocus = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  return (
    <div
      className={`border-l border-gray-200 bg-white transition-all duration-300 flex flex-col customHeight ${
        isOpen ? "w-80" : "w-0 overflow-hidden"
      }`}
    >
      {/* Sidebar header */}
      <div className="flex justify-between items-center p-4   border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Add Widget</h2>
        <button
          onClick={onToggle}
          className="p-1 rounded-full "
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <IoClose className="cursor-pointer" color="#7A85B7" size={24} />
        </button>
      </div>
      <div className="py-3 flex justify-evenly items-center ">
        <p className=" text-[10px]  cursor-pointer border-b-2 border-border p-2 text-first font-semibold">
          Templates
        </p>
        <p className=" text-[10px]  cursor-pointer font-semibold text-text">
          Drafts
        </p>
      </div>
      {/* Search */}
      <div className="p-3   border-gray-200">
        <div className="relative">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="standard"
            label="search"
            type="text"
            id="search-input"
            nameInput="search"
            register={register}
            focus={focus.comment}
            onFocus={() => handleFocus("search")}
            onBlur={() => handleBlur("search")}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-3   border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category} ({categoryCounts[category]})
            </button>
          ))}
        </div>
      </div>

      {/* Widget list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredWidgets.map((widget) => (
          <DraggableWidgetItem
            key={widget.id}
            widget={widget}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
