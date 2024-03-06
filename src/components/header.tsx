'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import { useState } from 'react';
import { MdOutlineLogin } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';

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
            src={String(params.logo.url)}
            alt="Contentstack"
            width={100}
            height={50}
            style={{
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
          <ul className="navbar-nav">
            {params.navbar.map((a: Link) => (
              <li key={a.title} className="nav-item dropdown">
                <Link
                  className="super-bold"
                  href={a.href}
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    letterSpacing: '0.8px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                  }}
                  onClick={closeMenu}
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
          <button className="btn btn-outline-primary">
            <span
              className="cs-icon icon-size-auto"
              style={{ paddingRight: '5px', paddingBottom: '2px' }}
            >
              <FaUserPlus />
            </span>
            Register
          </button>
          <button className="btn btn-primary">
            <span
              className="cs-icon icon-size-auto"
              style={{ paddingRight: '5px', paddingBottom: '2px' }}
            >
              <MdOutlineLogin />
            </span>
            Login
          </button>
          <button className="btn btn-outline-primary">
            <span
              className="cs-icon icon-size-auto"
              style={{ paddingRight: '5px', paddingBottom: '2px' }}
            >
              <GiShoppingCart />
            </span>
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
