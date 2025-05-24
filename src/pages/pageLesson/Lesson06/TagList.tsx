import React, { useState } from 'react';
import { LockFilled, UnlockFilled } from '@ant-design/icons';
const TagList = ({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) => {
    const [lockedTags, setLockedTags] = useState<string[]>([]);

    const toggleLock = (tag: string) => {
        setLockedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
        setLockedTags((prev) => prev.filter((t) => t !== tag)); // remove from locked if needed
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
                        borderRadius: 8,
                        background: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 120
                    }}
                >
                    {/* Nút xóa góc trái trên cùng */}
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

                    {/* Nội dung tag */}
                    <span style={{ fontSize: 14, border: 'none' }}>{tag}</span>

                    {/* Icon ổ khóa toggle */}
                    <span onClick={() => toggleLock(tag)} style={{ cursor: 'pointer' }}>
                        {lockedTags.includes(tag) ? (
                            <LockFilled style={{ fontSize: 18, color: '#2f2f3b' }} />
                        ) : (
                            <UnlockFilled style={{ fontSize: 18, color: '#999' }} />
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TagList;
