import React from 'react';
import { Link } from 'react-router';

export const Menu = () => {
  return (
      <ul className="dark menu-bar">
        <li>
          <Link to="config">Configure</Link>
        </li>
        <li>
          <Link to="launch">Launch</Link>
        </li>
        <li>
          <Link to="play">Play</Link>
        </li>
      </ul>
  );
};
