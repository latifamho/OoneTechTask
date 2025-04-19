import { useEffect, useState } from "react";
import { useDragLayer } from "react-dnd";

const DraggablePlaceholder = ({ onPositionChange }) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update position when dragging
  useEffect(() => {
    if (isDragging && currentOffset) {
      const { x, y } = currentOffset;
      setPosition({ x, y });
      if (onPositionChange) {
        onPositionChange({ x, y });
      }
    }
  }, [isDragging, currentOffset, onPositionChange]);

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none border-2 border-dashed border-blue-400 bg-blue-50 bg-opacity-50 rounded-lg z-50"
      style={{
        width: 300,
        height: 200,
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-sm text-blue-500 font-medium">
          {item?.title || "New Widget"}
        </div>
      </div>
    </div>
  );
};

export default DraggablePlaceholder;
