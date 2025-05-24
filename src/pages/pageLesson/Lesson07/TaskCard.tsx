// TaskCard.tsx
import React from 'react';
import { Task } from './kanbanSlice';
import { Card, Typography, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      size="small"
      title={
        <Space size="middle">
          <CalendarOutlined />
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{task.createdAt}</Typography.Text>
        </Space>
      }
      actions={[
        <EditOutlined key="edit" onClick={onEdit} />,
        <DeleteOutlined key="delete" onClick={onDelete} style={{ color: 'red' }} />,
      ]}
    >
      <Typography.Text>{task.content}</Typography.Text>
    </Card>
  );
};

export default TaskCard;
