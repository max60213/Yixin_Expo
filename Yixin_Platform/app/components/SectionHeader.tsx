import { Link } from '@/i18n/navigation';
import './section-header.css';

interface SectionHeaderProps {
  title: string;
  href?: string;
  className?: string;
}

const SectionHeader = ({ title, href, className }: SectionHeaderProps) => {
  const titleElement = (
    <h2 className="section-header__title">
      {title}
    </h2>
  );

  return (
    <div className={`section-header flex items-center gap-1 ${className || ''}`}>
      {href ? (
        <Link href={href}>
          {titleElement}
        </Link>
      ) : (
        titleElement
      )}
      {href && <span className="section-header__icon material-symbols-rounded">arrow_forward_ios</span>}
    </div>
  );
};

export default SectionHeader;

