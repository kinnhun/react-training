// src/components/PaginationControls.tsx
import { Pagination } from 'antd'

interface Props {
  currentPage: number
  pageSize: number
  totalRecords: number
  onChange: (page: number, size: number) => void
}

const PaginationControls = ({ currentPage, pageSize, totalRecords, onChange }: Props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalRecords}
        showSizeChanger
        pageSizeOptions={['5','10', '20', '50', '100']}
        onChange={onChange}
        onShowSizeChange={onChange}
      />
    </div>
  )
}

export default PaginationControls
