// Check if two rectangles overlap
export function doRectanglesOverlap(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Check if a widget collides with any other widget
export function checkCollision(widgets, currentId, position, size) {
  const currentWidget = {
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
  };

  return widgets.some((widget) => {
    if (widget.id === currentId) return false; // Skip self

    const otherWidget = {
      x: widget.position.x,
      y: widget.position.y,
      width: widget.size.width,
      height: widget.size.height,
    };

    return doRectanglesOverlap(currentWidget, otherWidget);
  });
}

// Find a valid position for a widget (no overlaps)
export function findValidPosition(widgets, newWidget, gridSize = 20) {
  const position = { ...newWidget.position };
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops

  while (attempts < maxAttempts) {
    let hasCollision = false;

    for (const widget of widgets) {
      if (widget.id === newWidget.id) continue;

      const rect1 = {
        x: position.x,
        y: position.y,
        width: newWidget.size.width,
        height: newWidget.size.height,
      };

      const rect2 = {
        x: widget.position.x,
        y: widget.position.y,
        width: widget.size.width,
        height: widget.size.height,
      };

      if (doRectanglesOverlap(rect1, rect2)) {
        hasCollision = true;
        break;
      }
    }

    if (!hasCollision) {
      return position;
    }

    // Try a new position
    position.x += gridSize;

    // If we've moved too far right, go to the next row
    if (position.x > 1000) {
      position.x = 100;
      position.y += gridSize;
    }

    attempts++;
  }

  // If we couldn't find a valid position, return the original with slight offset
  return {
    x: newWidget.position.x + 20,
    y: newWidget.position.y + 20,
  };
}

// Snap position to grid
export function snapToGrid(position, gridSize = 20) {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
}
