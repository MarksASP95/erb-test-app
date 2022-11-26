import React, { PropsWithChildren } from 'react'
import { useDroppable } from "@dnd-kit/core"

interface DroppableProps extends PropsWithChildren {
    id: string;
}
const Droppable = (props: DroppableProps) => {

    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    )
};

export default Droppable;