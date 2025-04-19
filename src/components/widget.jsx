/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Copy, Trash2, MoreVertical } from "lucide-react";
import WidgetContent from "./widget-content";

export default function Widget({
  id,
  position,
  size,
  content,
  isSelected,
  onSelect,
  onUpdatePosition,
  onUpdateSize,
  onDelete,
  onCopy,
  checkCollision,
  save,
}) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentSize, setCurrentSize] = useState(size);

  const widgetRef = useRef(null);

  // Update local state when props change
  useEffect(() => {
    setCurrentPosition(position);
    setCurrentSize(size);
  }, [position, size]);

  // Handle widget selection
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(id);
  };

  // Show widget actions on hover
  // const handleMouseEnter = () => {
  //   if (!isDragging && !isResizing) {
  //     setShowActions(true);
  //   }
  // };

  // const handleMouseLeave = () => {
  //   setShowActions(false);
  //   setShowDeleteConfirm(false);
  // };

  // Handle widget deletion with confirmation
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  // Handle widget duplication
  const handleCopy = (e) => {
    e.stopPropagation();
    onCopy(id);
  };

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    setShowActions(false);
  };

  // Handle drag stop with collision detection
  const handleDragStop = (e, d) => {
    setIsDragging(false);

    const newPosition = { x: d.x, y: d.y };

    // Check for collisions
    if (checkCollision(id, newPosition, currentSize)) {
      // Revert to previous position if collision detected
      setCurrentPosition(position);
    } else {
      // Update position if no collision
      setCurrentPosition(newPosition);
      onUpdatePosition(id, newPosition);
    }
  };

  // Handle resize start
  const handleResizeStart = () => {
    setIsResizing(true);
    setShowActions(false);
  };

  // Handle resize stop with collision detection
  const handleResizeStop = (e, direction, ref, delta, position) => {
    setIsResizing(false);

    const newSize = {
      width: Number.parseInt(ref.style.width),
      height: Number.parseInt(ref.style.height),
    };

    const newPosition = { x: position.x, y: position.y };

    // Check for collisions
    if (checkCollision(id, newPosition, newSize)) {
      // Revert to previous size and position if collision detected
      setCurrentSize(currentSize);
      setCurrentPosition(currentPosition);
    } else {
      // Update size and position if no collision
      setCurrentSize(newSize);
      setCurrentPosition(newPosition);
      onUpdateSize(id, newSize);
      onUpdatePosition(id, newPosition);
    }
  };

  return (
    <Rnd
      ref={widgetRef}
      size={{ width: currentSize.width, height: currentSize.height }}
      position={{ x: currentPosition.x, y: currentPosition.y }}
      onDragStart={handleDragStart}
      onDrag={() => setShowActions(false)}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResize={() => setShowActions(false)}
      onResizeStop={handleResizeStop}
      bounds="parent"
      minWidth={200}
      minHeight={100}
      disableDragging={save}
      className={`widget ${isSelected ? "widget-selected" : ""}`}
      dragHandleClassName="widget-drag-handle"
    >
      <div
        className={`widget-container ${
          isSelected ? "ring-2 " : "border border-gray-200"
        } bg-white rounded-lg shadow-sm relative`}
        onClick={handleSelect}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        {/* Widget header/drag handle */}
        <div className="widget-drag-handle w-full h-8 cursor-move flex items-center justify-between px-3 py-1 bg-gray-50 rounded-t-lg">
          <span className="text-xs font-medium text-gray-700 truncate">
            {content.title}
          </span>
          <div className="flex items-center space-x-1">
            <>
              <button
                onClick={handleCopy}
                className="p-1 text-gray-500 hover:text-gray-700 rounded"
                title="Copy widget"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-red-500 rounded"
                title="Delete widget"
              >
                <Trash2 size={14} />
              </button>
            </>

            <MoreVertical size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Widget content */}
        <div
          className="p-3 overflow-auto"
          style={{ height: `calc(${currentSize.height}px - 32px)` }}
        >
          <WidgetContent type={content.type} data={content.data} />
        </div>

        {/* Resize handle indicator */}
        {isSelected ? (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-tl-sm cursor-se-resize" />
        ) : (
          <></>
        )}
      </div>
    </Rnd>
  );
}
