/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import WidgetContent from "./widget-content";
import { MoreVertical } from "lucide-react";
import { Rnd } from "react-rnd";

const DisplayWidget = ({ content, size, position }) => {
  const [currentSize, setCurrentSize] = useState(size);
  const [currentPosition, setCurrentPosition] = useState(position);

  return (
    <Rnd
      disableDragging={true}
      enableResizing={false}
      style={{ pointerEvents: "none" }}
      size={{ width: currentSize.width, height: currentSize.height }}
      position={{ x: currentPosition.x, y: currentPosition.y }}
    >
      <div
        className={`"ring-2 w-full border border-gray-200 h-fit   bg-white rounded-lg shadow-sm relative`}
      >
        {/* Widget header/drag handle */}
        <div className="  w-full h-8   flex items-center justify-between px-3 py-1 bg-gray-50 rounded-t-lg">
          <span className="text-xs font-medium text-gray-700 truncate">
            {content.title}
          </span>
          <div className="flex items-center space-x-1">
            <MoreVertical size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Widget content */}
        <div
          className="p-3 overflow-auto h-fit "
          style={{ height: `calc(${currentSize?.height}px - 32px)` }}
        >
          <WidgetContent type={content.type} data={content.data} />
        </div>
      </div>
    </Rnd>
  );
};

export default DisplayWidget;
