import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React, { PropsWithChildren } from 'react'

interface DraggableProps extends PropsWithChildren {
    id: string;
}

const Draggable = (props: DraggableProps) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
    } : undefined;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    )
}

export default Draggable