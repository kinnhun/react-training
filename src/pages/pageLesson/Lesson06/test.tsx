import React, { useState } from 'react';
import { Input, Select, Button, Radio, Row, Col, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './Lesson06.module.scss';

const { Option } = Select;

export const Lesson06 = () => {
  const [filterGroups, setFilterGroups] = useState([
    {
      logic: 'or',
      filters: [{ column: '', condition: 'is', value: '' }]
    }
  ]);

  const [tags, setTags] = useState([]);
  const [freeText, setFreeText] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleRemoveFilter = (groupIndex: number, index: number) => {
    const newGroups = [...filterGroups];
    newGroups[groupIndex].filters.splice(index, 1);
    if (newGroups[groupIndex].filters.length === 0) {
      newGroups.splice(groupIndex, 1);
    }
    setFilterGroups(newGroups);
  };

  const handleChange = (groupIndex: number, index: number, key: string, value: string) => {
    const newGroups = [...filterGroups];
    newGroups[groupIndex].filters[index][key] = value;
    setFilterGroups(newGroups);
  };

  const handleLogicChange = (groupIndex: number, value: string) => {
    const newGroups = [...filterGroups];
    newGroups[groupIndex].logic = value;
    setFilterGroups(newGroups);
  };

  const handleAddGroup = () => {
    setFilterGroups([...filterGroups, {
      logic: 'or',
      filters: [{ column: '', condition: 'is', value: '' }]
    }]);
  };

  const handleSubmit = () => {
    const data = {
      filterListId: 0,
      filterWithConditions: filterGroups.flatMap((group) => group.filters.map((f) => ({
        field: f.column,
        condition: f.condition.toUpperCase(),
        value: f.value
      }))),
      operatorsOrder: filterGroups.map((g) => g.logic.toUpperCase()),
      freeText: freeText
    };
    setResults([{
      filter: JSON.stringify(data),
      tags: tags.join(',')
    }]);
  };

  const handleClear = () => {
    setFilterGroups([{ logic: 'or', filters: [{ column: '', condition: 'is', value: '' }] }]);
    setTags([]);
    setFreeText('');
    setResults([]);
  };

  const columns = [
    {
      title: 'Filter',
      dataIndex: 'filter',
      key: 'filter',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
    },
  ];

  return (
    <div className={styles.container}>
      <h4>Thực hành extend form</h4>
      <div className={styles.filterSection}>
        <h2>Filter</h2>
        <Row gutter={16}>
          <Col span={12}>
            <label>Search</label>
            <Input placeholder="Search..." value={freeText} onChange={(e) => setFreeText(e.target.value)} />
          </Col>
          <Col span={12}>
            <label>Tag</label>
            <Select
              mode="multiple"
              placeholder="Tag"
              style={{ width: '100%' }}
              value={tags}
              onChange={setTags}
            >
              <Option value="tag1">kylapplikationer</Option>
              <Option value="tag2">vid</Option>
              <Option value="tag3">marknader</Option>
              <Option value="tag4">grundläggande</Option>
              <Option value="tag5">energioptimering</Option>
            </Select>
          </Col>
        </Row>

        <div style={{ marginTop: 20 }}>
          <label>Show Only Records With</label>

          {filterGroups.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: 24, paddingBottom: 12 }}>
              {group.filters.map((filter, index) => (
                <Row gutter={16} align="middle" style={{ marginBottom: 10 }} key={index}>
                  <Col span={6}>
                    {groupIndex !== 0 && (
                      <div style={{ marginBottom: 12 }}>
                        <Radio.Group value={group.logic} onChange={(e) => handleLogicChange(groupIndex, e.target.value)}>
                          <Radio value="and">And</Radio>
                          <Radio value="or">Or</Radio>
                        </Radio.Group>
                      </div>
                    )}
                    <Select
                      placeholder="Columns"
                      style={{ width: '100%' }}
                      value={filter.column}
                      onChange={(value) => handleChange(groupIndex, index, 'column', value)}
                    >
                      <Option value="FIRST_NAME">FIRST_NAME</Option>
                      <Option value="LAST_NAME">LAST_NAME</Option>
                    </Select>
                  </Col>
                  <Col span={2}><span>That</span></Col>
                  <Col span={6}>
                    <Select
                      value={filter.condition}
                      style={{ width: '100%' }}
                      onChange={(value) => handleChange(groupIndex, index, 'condition', value)}
                    >
                      <Option value="is">IS</Option>
                      <Option value="isNot">IS_NOT</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Input
                      value={filter.value}
                      onChange={(e) => handleChange(groupIndex, index, 'value', e.target.value)}
                      placeholder="Text"
                    />
                  </Col>
                  <Col span={1}>
                    <DeleteOutlined onClick={() => handleRemoveFilter(groupIndex, index)} style={{ cursor: 'pointer' }} />
                  </Col>
                </Row>
              ))}
            </div>
          ))}

          <Button type="link" onClick={handleAddGroup}>
            + More Filter
          </Button>
        </div>

        <div style={{ marginTop: 20 }}>
          <Button className={styles.submitBtn} onClick={handleSubmit}>Filter</Button>
          <Button className={styles.clearBtn} onClick={handleClear}>Clear</Button>
        </div>

        <div style={{ marginTop: 40 }}>
          <Table columns={columns} dataSource={results} rowKey="filter" pagination={false} />
        </div>
      </div>
    </div>
  );
};
