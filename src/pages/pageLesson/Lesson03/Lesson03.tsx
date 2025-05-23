import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Table, Pagination, Space, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  birthday: string;
  sex: string;
  job: string;
  phone: string;
  tier: string;
  avatar: string;
}

const generateFakeUsers = (count = 100): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 20, max: 50 }),
    address: faker.location.streetAddress(),
    birthday: faker.date.birthdate({ min: 1980, max: 2000, mode: 'year' }).toLocaleDateString('vi-VN'),
    sex: faker.person.sex(),
    job: faker.person.jobArea(),
    phone: faker.phone.number(),
    tier: faker.helpers.arrayElement(['free', 'business', 'develop']),
    avatar: faker.image.avatar(),
  }));
};

const columns: ColumnsType<User> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Birthday', dataIndex: 'birthday', key: 'birthday' },
  { title: 'Sex', dataIndex: 'sex', key: 'sex' },
  { title: 'Job Area', dataIndex: 'job', key: 'job' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'SubscriptionTier', dataIndex: 'tier', key: 'tier', sorter: (a, b) => a.tier.localeCompare(b.tier) },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (url) => <Image width={40} src={url} alt="avatar" preview={false} />,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space>
        <a>Invite {record.lastName}</a>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
];

export const Lesson03 = () => {
  const [data] = useState(generateFakeUsers(100));
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChangePage = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const paginatedData = data.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div style={{ padding: 24 }}>
      <h2>Thực hành mockup data</h2>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        rowKey="id"
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={data.length}
          onChange={handleChangePage}
          showSizeChanger
          pageSizeOptions={['10', '20', '50', '100']}
          onShowSizeChange={handleChangePage}
        />
      </div>

    </div>
  );
};
