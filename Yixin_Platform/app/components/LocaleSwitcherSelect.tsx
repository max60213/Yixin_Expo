'use client';

import {useParams} from 'next/navigation';
import {Locale} from 'next-intl';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {usePathname, useRouter} from 'next/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams() as { locale: string };

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // 構建新的路徑，替換 locale 參數
      const newPathname = pathname.replace(`/${params.locale}`, `/${nextLocale}`);
      router.replace(newPathname);
    });
  }

  return (
    <label
      className={`relative text-gray-400 ${isPending && 'transition-opacity [&:disabled]:opacity-30'}`}
    >
      <p className="sr-only">{label}</p>
      <select
        className=""
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}