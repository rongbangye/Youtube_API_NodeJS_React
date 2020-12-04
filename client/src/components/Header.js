import React from 'react';
import logo from '../youtube_logo.png';
import '../styles/header.css';

export default function Header() {
  return (
    <div>
      <header>
        <a href={'/'}>
          <img src={logo} className='logo' alt='logo' />
        </a>
      </header>
    </div>
  );
}
