import React from 'react';
import type { Column as ColumnType } from './kanbanSlice'; // ✅ import type-only
import TaskCard from './TaskCard';
import { Card, Button, Badge } from 'antd';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import styles from './Column.module.scss';

interface Props {
  column: ColumnType;
  onNewTask: () => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const Column: React.FC<Props> = ({ column, onNewTask, onEdit, onDelete }) => {
  return (
    <Droppable droppableId={column.id} type="task">
      {(provided) => ( // ✅ bỏ snapshot
        <Card
          className={styles.column}
          bordered
          title={
            <div className={styles.header}>
              <Badge
                count={column.tasks.length}
                style={{ backgroundColor: '#1890ff' }}
                offset={[10, 0]}
              >
                <span className={styles.title}>{column.title.toUpperCase()}</span>
              </Badge>

              <Button size="small" type="primary" onClick={onNewTask}>
                + New Task
              </Button>
            </div>
          }
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={styles.taskList}>
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onEdit={() => onEdit(task.id)}
                      onDelete={() => onDelete(task.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </Card>
      )}
    </Droppable>
  );
};

export default Column;
