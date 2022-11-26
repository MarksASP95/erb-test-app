import React, { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Droppable from './Droppable';
import Draggable from './Draggable';

const containers = ["a", "b", "c"];

const DnDContainer = () => {

    const [ parent, setParent ] = useState<string | null>(null)
    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        setParent(over ? over.id.toString() : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <>
                {parent === null ? draggableMarkup : null}
                {
                    containers.map((id) => {
                        return (
                            <Droppable key={id} id={id}>
                                {parent === id ? draggableMarkup : "Drop here"}
                            </Droppable>
                        )
                    })
                }
            </>
        </DndContext>
    )
}

export default DnDContainer