// ==================== 注意事項組件（Info Note）====================
// 用於顯示卡片底部的注意事項或說明文字
// 會在傳入 note 內容時才渲染

interface InfoNoteProps {
  note?: string;
}

export const InfoNote = ({ note }: InfoNoteProps) => {
  if (!note) return null;

  return (
    <div className="info-card__note">
      <div className="material-symbols-rounded">info</div>
      <p className="caption">{note}</p>
    </div>
  );
};

