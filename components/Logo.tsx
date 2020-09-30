import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  title: string;
  link: string;
  isDark?: boolean;
  style?: any;
  className?: string;
}

const Logo: FC<Props> = ({ title, link, isDark, style, className }) => (
  <div className={`c-logo--wrap ${className}`} style={style}>
    <Link href={link}>
      <h1 className="c-logo" style={{ backgroundColor: isDark ? 'white' : 'black' }}>
        {title}
      </h1>
    </Link>
  </div>
);

export default Logo;
