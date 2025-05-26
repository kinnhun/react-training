import  { useState } from 'react'
import { useProductsQuery } from '@/services/product/queries'
import {
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/services/product/mutation'
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Rate,
  Modal,
  Form,
  Popconfirm,
  message,
  Select
} from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface ProductDimensions {
  width: number
  height: number
  depth: number
}

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: ProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
}

export const Lesson10 = () => {
  const { data: products = [], isLoading } = useProductsQuery()
  const add = useAddProduct()
  const update = useUpdateProduct()
  const remove = useDeleteProduct()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleOpenAdd = () => {
    setEditingProduct(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    form.setFieldsValue({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      tags: product.tags
    })
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const productData = {
        ...values,
        price: Number(values.price),
        discountPercentage: Number(values.discountPercentage),
        stock: Number(values.stock),
        rating: Number(values.rating || 0)
      }

      if (editingProduct) {
        update.mutate(
          { id: editingProduct.id, ...productData },
          {
            onSuccess: () => {
              message.success('Cập nhật thành công')
              setIsModalOpen(false)
            },
          }
        )
      } else {
        add.mutate(
          productData,
          {
            onSuccess: () => {
              message.success('Thêm sản phẩm thành công')
              setIsModalOpen(false)
            },
          }
        )
      }
    })
  }

  const handleDelete = (id: number) => {
    remove.mutate(id, {
      onSuccess: () => message.success('Đã xoá sản phẩm'),
    })
  }

  const columns: ColumnsType<Product> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price) => `$${price}`,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      width: 100,
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      render: (tags: string[] | undefined) => (
        <>
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          )) || []}
        </>
      ),
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleOpenEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn xoá không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2>Lesson10 - Quản lý sản phẩm</h2>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={handleOpenAdd}>
        + Thêm sản phẩm
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: 1500 }}
      />

      <Modal
        title={editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={editingProduct ? 'Cập nhật' : 'Thêm'}
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Giảm giá"
            rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá' }]}
          >
            <Input type="number" suffix="%" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Đánh giá"
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Kho"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng trong kho' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Nhập tags"
              open={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
