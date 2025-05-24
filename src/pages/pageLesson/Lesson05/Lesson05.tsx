import  { useEffect, useState, useRef } from 'react';
import { Table, Button, Checkbox, Dropdown, Select, Pagination } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import axios from 'axios';
import styles from './Lesson05.module.scss';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: any[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: any;
  images: string[];
  thumbnail: string;
}

const COLUMN_STORAGE_KEY = 'visible_columns';

export const Lesson05: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const defaultVisibleColumns = ['id', 'title'];
  const savedColumns = localStorage.getItem(COLUMN_STORAGE_KEY);
  const [columnsVisible, setColumnsVisible] = useState<string[]>(
    savedColumns ? JSON.parse(savedColumns) : defaultVisibleColumns
  );

  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const dragColIndex = useRef<number | null>(null);

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
      const { products, total } = response.data;
      setData(products);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current!, pagination.pageSize!);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const allColumns: ColumnsType<Product> = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'descriptionColumn',
    },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Discount', dataIndex: 'discountPercentage', key: 'discountPercentage' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => tags?.join(', '),
    },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions',
      key: 'dimensions',
      render: (d) => d ? `${d.width}x${d.height}x${d.depth}` : '',
    },
    { title: 'Warranty Info', dataIndex: 'warrantyInformation', key: 'warrantyInformation' },
    { title: 'Shipping Info', dataIndex: 'shippingInformation', key: 'shippingInformation' },
    { title: 'Status', dataIndex: 'availabilityStatus', key: 'availabilityStatus' },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      render: (reviews) => reviews?.length ? `${reviews.length} review(s)` : 'No reviews',
    },
    { title: 'Return Policy', dataIndex: 'returnPolicy', key: 'returnPolicy' },
    { title: 'Min Order Qty', dataIndex: 'minimumOrderQuantity', key: 'minimumOrderQuantity' },
    {
      title: 'Meta',
      dataIndex: 'meta',
      key: 'meta',
      render: (meta) => meta?.barcode || '',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) =>
        images?.length ? (
          <img src={images[0]} alt="product" style={{ width: 30, height: 30 }} />
        ) : null,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumb) => <img src={thumb} alt="thumb" style={{ width: 30, height: 30 }} />,
    },
  ];

  const filteredColumns = allColumns
    .filter(col => columnsVisible.includes(col.key as string))
    .sort((a, b) => {
      const indexA = columnsVisible.indexOf(a.key as string);
      const indexB = columnsVisible.indexOf(b.key as string);
      return indexA - indexB;
    });

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    const newColumns = [...columnsVisible];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setColumnsVisible(newColumns);
    localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(newColumns));
  };

  const [tempSelectedColumns, setTempSelectedColumns] = useState<string[]>(columnsVisible);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleColumnChange = (key: string) => {
    setTempSelectedColumns(prev =>
      prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
    );
  };

  const handleColumnDone = () => {
    setColumnsVisible(tempSelectedColumns);
    localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(tempSelectedColumns));
  };


  const columnDropdown = (
    <div className={styles.columnDropdown}>
      <div className={styles.columnDropdownHeader}>Columns</div>

      <input
        type="text"
        placeholder="Search"
        className={styles.columnSearch}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className={styles.columnList}>
        {allColumns
          .filter((col) => {
            typeof col.title === 'string' && (
              col.title.toLowerCase().includes(searchText.toLowerCase())
            )
          }
          )
          .map((col) => (
            <Checkbox
              key={col.key}
              checked={tempSelectedColumns.includes(col.key as string)}
              onChange={() => handleColumnChange(col.key as string)}
            >
              {typeof col.title === 'string' && (
                <span className={styles.columnTitle}>{col.title}</span>
              )}
            </Checkbox>
          ))}
      </div>

      <div className={styles.columnDropdownActions}>
        <Button size="small" onClick={() => dropdownRef.current?.click()}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            handleColumnDone();
            dropdownRef.current?.click();
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Thực hành xử lý bảng + dữ liệu (dynamic table)</h2>
        <div className={styles.tableControls}>
          <Dropdown dropdownRender={() => columnDropdown} trigger={['click']}>
            <Button ref={dropdownRef}>Columns</Button>
          </Dropdown>

          <Select
            value={pagination.pageSize}
            onChange={(value) => setPagination({ ...pagination, pageSize: value, current: 1 })}
            options={[10, 20, 30, 50].map(v => ({ label: `${v} / page`, value: v }))}
            style={{ width: 120 }}
          />
          <Pagination
            current={pagination.current}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={(page) => setPagination(prev => ({ ...prev, current: page }))}
            showSizeChanger={false}
          />
        </div>
      </div>
      <Table
        className={styles.customTable}
        rowKey="id"
        columns={filteredColumns.map((col, index) => ({
          ...col,
          onHeaderCell: () => ({
            draggable: true,
            onDragStart: () => {
              dragColIndex.current = index;
            },
            onDragOver: (e: React.DragEvent) => {
              e.preventDefault();
            },
            onDrop: () => {
              if (dragColIndex.current !== null && dragColIndex.current !== index) {
                handleDragEnd(dragColIndex.current, index);
              }
              dragColIndex.current = null;
            }
          }),
          className: col.key === 'description' ? styles.descriptionColumn : styles.defaultColumn
        }))}
        dataSource={data}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
      />
    </div>
  );
};
