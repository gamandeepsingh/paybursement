import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItemProps {
  href?: string;
  label: string;
  isLast: boolean;
  isFirst:boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ href, label, isLast,isFirst }) => (
  <li className={`inline-flex items-center ${!isLast ? 'me-2' : ''}`}>
    {!isLast && !isFirst && (
      <ChevronRight className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" />
    )}
    {href ? (
      <a
        href={href}
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        {isFirst && <Home className="w-3 h-3 me-2.5" aria-hidden="true" />}
        {label}
      </a>
    ) : (
      <span className={`ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 ${isLast ? "text-ellipsis text-wrap": ""}`}>
        {label}
      </span>
    )}
  </li>
);

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          {...item}
          isLast={index === items.length}
          isFirst={index===0}
        />
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
