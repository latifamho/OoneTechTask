import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import Widget from "./widget";
import { checkCollision } from "../lib/collision-utils";

const WIDGET_TYPE = "WIDGET";

export default function WidgetGrid({
  widgets,
  selectedWidgetId,
  setSelectedWidgetId,
  onUpdatePosition,
  onUpdateSize,
  onDeleteWidget,
  onCopyWidget,
  onDrop,
  draggedItem,
}) {
  const [dropTargetPosition, setDropTargetPosition] = useState(null);
  console.log(widgets);

  // Handle background click to deselect widgets
  const handleBackgroundClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        setSelectedWidgetId(null);
      }
    },
    [setSelectedWidgetId]
  );

  // Set up drop target for the grid
  const [{ isOver }, drop] = useDrop({
    accept: WIDGET_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && onDrop) {
        // Adjust position based on grid container's position
        const gridElement = document.getElementById("widget-grid");
        const gridRect = gridElement.getBoundingClientRect();
        const position = {
          x: offset.x - gridRect.left,
          y: offset.y - gridRect.top,
        };
        onDrop(position);
      }
      setDropTargetPosition(null);
      return undefined;
    },
    hover: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const gridElement = document.getElementById("widget-grid");
        const gridRect = gridElement.getBoundingClientRect();
        setDropTargetPosition({
          x: offset.x - gridRect.left,
          y: offset.y - gridRect.top,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Check for collisions between widgets
  const handleCheckCollision = useCallback(
    (id, position, size) => {
      return checkCollision(widgets, id, position, size);
    },
    [widgets]
  );

  return (
    <div
      id="widget-grid"
      ref={drop}
      className="grid-bg h-[calc(100vh-3.5rem)] overflow-auto m-12 relative"
      onClick={handleBackgroundClick}
    >
      {/* Render all widgets */}
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          id={widget.id}
          position={widget.position}
          size={widget.size}
          content={widget.content}
          isSelected={selectedWidgetId === widget.id}
          onSelect={() => setSelectedWidgetId(widget.id)}
          onUpdatePosition={onUpdatePosition}
          onUpdateSize={onUpdateSize}
          onDelete={() => onDeleteWidget(widget.id)}
          onCopy={() => onCopyWidget(widget.id)}
          checkCollision={handleCheckCollision}
        />
      ))}
      {/* Render drop placeholder when dragging from sidebar */}
      {isOver && draggedItem && dropTargetPosition && (
        <div
          className="widget-placeholder absolute pointer-events-none"
          style={{
            width: 300,
            height: 200,
            left: dropTargetPosition.x - 150,
            top: dropTargetPosition.y - 100,
          }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-blue-500 font-medium">
              {draggedItem.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
