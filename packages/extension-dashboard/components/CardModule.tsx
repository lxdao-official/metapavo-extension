import { PropaneSharp } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { Identifier, XYCoord } from 'dnd-core';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function CardModule(props: {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index || 0;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard && props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Box
      style={{
        margin: '0 auto',
        padding: '16px',
        borderRadius: '10px',
        background: '#fff',
        marginBottom: '20px',
        overflowX: 'hidden',
        opacity: 0.99,
      }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <Box
        style={{
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: '30px',
          color: '#252525',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {props.title}
        <Box
          style={{
            fontSize: '14px',
            color: '#5B28EB',
          }}
        >
          {props.extra}
        </Box>
      </Box>
      <div>{props.children}</div>
    </Box>
  );
}
