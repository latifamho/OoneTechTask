 
import { useState } from "react";
import { Copy, Trash2, Settings } from "lucide-react";

const WidgetActions = ({ onCopy, onDelete, isVisible }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isVisible) return null;

  const handleDelete = () => {
    if (showDeleteConfirm) {
     onDelete();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="absolute top-0 right-0 bg-white shadow-md rounded-bl-lg border border-gray-200 z-10">
      {showDeleteConfirm ? (
        <div className="p-2 flex items-center">
          <span className="text-xs mr-2">Delete?</span>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="text-xs bg-gray-200 px-2 py-1 rounded mr-1 hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      ) : (
        <div className="flex">
          <button
            onClick={onCopy}
            className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
            title="Copy widget"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50"
            title="Delete widget"
          >
            <Trash2 size={14} />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            title="Widget settings"
          >
            <Settings size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WidgetActions;
