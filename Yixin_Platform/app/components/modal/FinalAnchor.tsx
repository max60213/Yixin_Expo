"use client";

import './final-anchor.css';

interface FAQItem {
  title: string;
  content: string;
}

const FinalAnchor = () => {
  const faqItems: FAQItem[] = [
    {
      title: '為什麼不是每筆都上主網？',
      content: '主網費用較高。我們先在便宜、快速的 L2 記錄每筆，每週再用總收據上主網，節省成本且不降公信力。',
    },
    {
      title: '這樣還能逐筆驗證嗎？',
      content: '可以。每筆事件都會附一份對應的「憑證」，拿來對照這張總收據，能證明它真的被收錄。',
    },
    {
      title: '我點開看到一串亂碼是什麼？',
      content: '那是交易編號或指紋，像收據號碼。任何人都能用它在公眾瀏覽器查證。',
    },
  ];

  return (
    <div className="final-anchor paragraph">
      {/* 標題區域 */}
      <h2 className='mb-2'>最終錨定</h2>

      {/* 說明文字 */}
      <p className='text-text-secondary'>
        我們把這週所有事件打包成一張總收據，寄到以太坊主網保存。這代表不用每件事都花大錢上主網，卻一樣能永久查證、不怕被竄改。點下方連結可在公眾瀏覽器看到這張收據。
      </p>

      {/* Ethereum Mainnet 連結 */}
      <div className="final-anchor__link-wrapper my-8">
        <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer" className="final-anchor__link link link--primary">
          <span className="final-anchor__link__text">Ethereum Mainnet</span>
          <span className="final-anchor__link__icon material-symbols-rounded !text-primary">call_made</span>
        </a>
      </div>

      {/* FAQ 項目 */}
      <div className="final-anchor__faq">
        {faqItems.map((item, index) => (
          <div key={index} className="final-anchor__faq__item">
            <span className="final-anchor__faq__item__bullet">・</span>
            <div className="final-anchor__faq__item__content mb-8">
              <h4 className="final-anchor__faq__item__title mb-2 font-medium">{item.title}</h4>
              <p className="final-anchor__faq__item__text text-text-secondary">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalAnchor;
