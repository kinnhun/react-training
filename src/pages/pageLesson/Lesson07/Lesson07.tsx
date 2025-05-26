// Lesson07.tsx
import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import Column from './Column';
import type { ColumnType } from './kanbanSlice';
import { addTask, editTask, deleteTask, moveTask, moveTaskWithinColumn } from './kanbanSlice';

import { Button, Modal, Input, Radio } from 'antd';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

const columnOrder: ColumnType[] = ['todo', 'inProgress', 'done'];

export const Lesson07 = () => {
  const columns = useSelector((state: RootState) => state.board.columns);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskColumn, setNewTaskColumn] = useState<ColumnType>('todo');

  useEffect(() => {
    localStorage.setItem('kanban-board', JSON.stringify(columns));
  }, [columns]);

  const handleCreateNew = (columnId: ColumnType) => {
    setNewTaskColumn(columnId);
    setShowModal(true);
  };

  const handleSave = () => {
    if (newTaskContent.trim()) {
      dispatch(addTask({ columnId: newTaskColumn, content: newTaskContent }));
    }
    setNewTaskContent('');
    setShowModal(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      dispatch(moveTaskWithinColumn({
        columnId: source.droppableId as ColumnType,
        fromIndex: source.index,
        toIndex: destination.index,
      }));
    } else {
      dispatch(moveTask({
        fromColumn: source.droppableId as ColumnType,
        toColumn: destination.droppableId as ColumnType,
        taskId: draggableId,
      }));
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', color: '#1890ff', fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
        TO DO LIST
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {columnOrder.map((colId) => {
            const col = columns.find(c => c.id === colId)!;
            return (
              <Column
                key={col.id}
                column={col}
                onNewTask={() => handleCreateNew(col.id)}
                onEdit={(taskId) => {
                  const text = prompt('Edit task');
                  if (text) dispatch(editTask({ columnId: col.id, taskId, content: text }));
                }}
                onDelete={(taskId) => dispatch(deleteTask({ columnId: col.id, taskId }))}
              />
            );
          })}
        </div>
      </DragDropContext>

      <Modal
        title="Create New Task"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <Radio.Group
          value={newTaskColumn}
          onChange={(e) => setNewTaskColumn(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio value="todo">TODO</Radio>
          <Radio value="inProgress">IN PROGRESS</Radio>
          <Radio value="done">DONE</Radio>
        </Radio.Group>
        <Input
          placeholder="Enter your task..."
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
      </Modal>
    </div>
  );
};
