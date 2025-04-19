/* eslint-disable array-callback-return */
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WidgetGrid from "./widget-grid";
import Sidebar from "./sidebar";
import { v4 as uuidv4 } from "uuid";
import { findValidPosition } from "../lib/collision-utils";
import Header from "./header";
import Sider from "./sider";
import { VscDiscard } from "react-icons/vsc";
import { MdCheck } from "react-icons/md";
import DisplayWidget from "./display-widget";

export default function DashboardLayout() {
  const [widgets, setWidgets] = useState([
    {
      id: "0d3417a3-e778-40cd-a2a7-29fbd91fac6d",
      position: {
        x: 77.0,
        y: 90.5,
      },
      size: {
        width: 300,
        height: 200,
      },
      added: true,
      content: {
        title: "Text Widget",
        type: "text",
        data: {},
      },
    },
  ]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);
  const [save, setSave] = useState(true);
  const [previousWidgets, setPrivousWidgets] = useState(widgets);
  // Add a new widget to the dashboard
  const handleAddWidget = useCallback(
    (widgetTemplate, position = { x: 100, y: 100 }) => {
      const newWidget = {
        id: uuidv4(),
        position,
        size: { width: 300, height: 200 },
        content: {
          title: widgetTemplate.title,
          type: widgetTemplate.type,
          data: widgetTemplate.data || {},
        },
      };

      // Find a position without collisions
      const validPosition = findValidPosition(widgets, newWidget);
      newWidget.position = validPosition;

      setWidgets((prev) => [...prev, newWidget]);
      setSelectedWidgetId(newWidget.id);
      return newWidget.id;
    },
    [widgets]
  );

  // Update widget position
  const handleUpdatePosition = useCallback((id, position) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id ? { ...widget, position } : widget
      )
    );
  }, []);

  // Update widget size
  const handleUpdateSize = useCallback((id, size) => {
    setWidgets((prev) =>
      prev.map((widget) => (widget.id === id ? { ...widget, size } : widget))
    );
  }, []);

  const handleDeleteWidget = (id) => {
    setWidgets((prev) => {
      const newWidgets = prev.filter((widget) => widget.id !== id);
      return newWidgets;
    });
    if (selectedWidgetId === id) setSelectedWidgetId(null);
  };

  // Copy a widget
  const handleCopyWidget = useCallback(
    (id) => {
      const widgetToCopy = widgets.find((widget) => widget.id === id);
      if (widgetToCopy) {
        const newWidget = {
          ...widgetToCopy,
          id: uuidv4(),
          position: {
            x: widgetToCopy.position.x + 20,
            y: widgetToCopy.position.y + 20,
          },
        };

        // Find a position without collisions
        const validPosition = findValidPosition(widgets, newWidget);
        newWidget.position = validPosition;

        setWidgets((prev) => [...prev, newWidget]);
        setSelectedWidgetId(newWidget.id);
      }
    },
    [widgets]
  );

  // Handle drag start from sidebar
  const handleDragStart = useCallback((item) => {
    setDraggedItem(item);
  }, []);

  // Handle drop on grid
  const handleDrop = useCallback(
    (position) => {
      if (draggedItem) {
        handleAddWidget(draggedItem, position);
        setDraggedItem(null);
      }
    },
    [draggedItem, handleAddWidget]
  );

  const findWidgetsWithSameId = (widgets, previousWidgets) => {
    return previousWidgets.filter((currentWidget) => {
      return widgets.some((prevWidget) => prevWidget.id === currentWidget.id);
    });
  };
  return (
    <div className=" flex">
      <Sider />
      <div className=" w-full">
        <Header />
        {!save && (
          <DndProvider backend={HTML5Backend}>
            <div className="flex  w-full  overflow-hidden">
              <div className="flex-1 customHeight relative">
                <div
                  className={`p-4 flex justify-end  gap-8 transition-all w-full
                `}
                >
                  <div className={`flex items-center   gap-5`}>
                    <div
                      onClick={() => {
                        const matchingWidgets = findWidgetsWithSameId(
                          widgets,
                          previousWidgets
                        );
                        setWidgets(matchingWidgets);
                        setSave(true);
                      }}
                      className=" flex items-center text-error gap-1 text-[11px] font-bold  capitalize cursor-pointer"
                    >
                      <VscDiscard size={16} /> <span>discard</span>
                    </div>
                    <div
                      onClick={() => {
                        setSave(true);
                        setWidgets((prevWidgets) =>
                          prevWidgets.map((widget) => {
                            if (widget.added) {
                              return widget;
                            } else {
                              return {
                                ...widget,
                                added: true,
                                position: {
                                  x: widget.position.x + 12,
                                  y: widget.position.y + 12,
                                },
                              };
                            }
                          })
                        );
                        setPrivousWidgets(widgets);
                      }}
                      className=" flex items-center text-text gap-1 text-[11px] font-bold  capitalize cursor-pointer"
                    >
                      <MdCheck size={16} /> <span>save</span>
                    </div>
                  </div>
                  {!isSidebarOpen && (
                    <img
                      onClick={() => {
                        setIsSidebarOpen(!isSidebarOpen);
                      }}
                      src="/assets/menu-icon.png"
                      alt="menu-icon"
                      className=" cursor-pointer"
                    />
                  )}
                </div>
                <WidgetGrid
                  key={widgets.length}
                  widgets={widgets}
                  selectedWidgetId={selectedWidgetId}
                  setSelectedWidgetId={setSelectedWidgetId}
                  onUpdatePosition={handleUpdatePosition}
                  onUpdateSize={handleUpdateSize}
                  onDeleteWidget={handleDeleteWidget}
                  onCopyWidget={handleCopyWidget}
                  onDrop={handleDrop}
                  draggedItem={draggedItem}
                />
              </div>

              <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onDragStart={handleDragStart}
              />
            </div>
          </DndProvider>
        )}
        {/* {save ? (
          widgets.map((widget) => (
            <Widget
              save={save}
              key={widget.id}
              id={widget.id}
              position={widget.position}
              size={widget.size}
              content={widget.content}
            />
          ))
        ) : (
          <></>
        )} */}
        {save ? (
          <>
            <div className="  relative w-full  customHeight p-3">
              {widgets.map((widget) => (
                <DisplayWidget
                  position={widget.position}
                  key={widget.id}
                  id={widget.id}
                  size={widget.size}
                  content={widget.content}
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {save && (
          <>
            <button
              onClick={() => setSave(false)}
              className="absolute   hover:-translate-y-4 group  bottom-14 right-20 bg-button rounded-xl p-4   transition-all duration-200"
            >
              <img
                src="/assets/edit.png"
                alt="edit"
                className="w-5 h-5       group-hover:w-6 group-hover:h-6   transition-all duration-200"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
