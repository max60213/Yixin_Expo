import { Link } from "@/i18n/navigation";

interface AccountMenuItemProps {
  href?: string;
  onClick: () => void;
  icon: string;
  label: string;
  variant?: 'default' | 'logout';
}

export default function AccountMenuItem({
  href,
  onClick,
  icon,
  label,
  variant = 'default'
}: AccountMenuItemProps) {
  const className = variant === 'logout'
    ? 'account-menu__item account-menu__item--logout'
    : 'account-menu__item';

  const content = (
    <>
      <span className="material-symbols-outlined size--24">{icon}</span>
      <span>{label}</span>
    </>
  );

  // 根據是否有 href 自動判斷使用 Link 或 button
  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}

