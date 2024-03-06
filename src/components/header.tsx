'use client';
import Image from 'next/image';
import SocialMediaLinks from './SocialMediaButton';
import Link from 'next/link';
import styles from './header.module.css';
import { useState } from 'react';

export default function Header({ params }: { params: HeaderProps }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav id="cs-main-nav" className="navbar navbar-expand-cs">
      {/*Whole navbar styling*/}
      <div
        className="container-fluid"
        style={{
          maxWidth: '100%',
          paddingLeft: '50px',
          paddingRight: '50px',
          boxShadow: '1px 1px 1px #DCDCDC',
          position: 'fixed',
          backgroundColor: '#fff',
          zIndex: '9999',
          top: '0',
        }}
      >
        {/* Website logo*/}
        <Link className="navbar-brand" href="/">
          <Image
            src={params.logo}
            alt="Contentstack"
            width={100}
            height={100}
            style={{
              marginLeft: '30px',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* For responsiveness of website and hamburger*/}
        <div className="btn-mobile">
          <button
            className={`navbar-toggler ${menuOpen ? '' : 'collapsed'} px-0`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#cs-nav-content"
            aria-controls="cs-nav-content"
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <i className="cs-icon icon-hamburger"></i>
            <i className="cs-icon icon-times d-none"></i>
          </button>
        </div>

        {/* For link color*/}
        <style>
          {`
                  .navbar-nav .nav-item a:hover {
                    color:purple !important;
                  }
                `}
        </style>

        {/* Navbar tabs */}
        <div
          className={`navbar-collapse justify-content-between  ${menuOpen ? 'show' : ''} collapse ${styles.navigationLinks} ${styles.techxHeaderMobile}`}
          id="cs-nav-content"
        >
          <ul className="navbar-nav" style={{ gap: '35px' }}>
            {params.navigationLinks.map((a) => (
              <li
                style={{ marginRight: '70px' }}
                key={a.title}
                className="nav-item dropdown"
              >
                <Link
                  className="super-bold"
                  href={a.href}
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    letterSpacing: '0.8px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    padding: '1.5rem',
                  }}
                  onClick={closeMenu}
                >
                  {a.title}
                </Link>
              </li>
            ))}
            <li style={{ marginRight: '70px' }} className="nav-item dropdown">
              <div className={`btn-ctas`}>
                <SocialMediaLinks socialmediaLinks={params.socialmediaLinks} />
              </div>
            </li>
          </ul>

          {/* <div className={`btn-ctas`}>
            <SocialMediaLinks socialmediaLinks={params.socialmediaLinks} />
          </div> */}
        </div>
        <div id="login-mobile" className="d-none ">
          <SocialMediaLinks socialmediaLinks={params.socialmediaLinks} />
        </div>
      </div>
    </nav>
  );
}
