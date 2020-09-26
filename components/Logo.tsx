import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  title: string;
  link: string;
}

const Logo: FC<Props> = ({ title, link }) => (
  <div className="c-logo--wrap">
    <Link href={link}>
      <h1 className="c-logo" style={{ backgroundImage: 'url("/logo.svg")' }}>
        {title}
      </h1>
    </Link>
  </div>
);

export default Logo;
