import  { useEffect, useState } from 'react';
import { LockFilled, UnlockFilled } from '@ant-design/icons';

interface TagListProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  onUnlockedTagsChange: (unlocked: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, setTags, onUnlockedTagsChange }) => {
  const [lockedTags, setLockedTags] = useState<string[]>([]); // các tag bị khóa (bỏ qua khi filter)

  useEffect(() => {
    const unlocked = tags.filter(tag => !lockedTags.includes(tag));
    onUnlockedTagsChange(unlocked); // gửi danh sách tag đang mở khóa
  }, [lockedTags, tags, onUnlockedTagsChange]);

  const toggleLock = (tag: string) => {
    setLockedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setLockedTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div style={{ marginTop: 12, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <div
          key={tag}
          style={{
            position: 'relative',
            padding: '8px 12px',
            paddingLeft: 28,
            border: '1px solid #ccc',
            borderRadius: 8,
            background: '#fafafa',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            minWidth: 120
          }}
        >
          <div
            onClick={() => removeTag(tag)}
            style={{
              position: 'absolute',
              top: -10,
              left: -10,
              width: 24,
              height: 24,
              backgroundColor: '#f5222d',
              borderRadius: '50%',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 0 2px white'
            }}
          >
            –
          </div>

          <span style={{ fontSize: 14 }}>{tag}</span>

          <span onClick={() => toggleLock(tag)} style={{ cursor: 'pointer' }}>
            {!lockedTags.includes(tag) ? (
              <UnlockFilled style={{ fontSize: 18, color: '#2f2f3b' }} />
            ) : (
              <LockFilled style={{ fontSize: 18, color: '#999' }} />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TagList;
