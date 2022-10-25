/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';


function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  const links = [
    {
      href: 'https://www.elementary.audio/',
      label: 'Home',
    },
    {
      href: 'https://www.elementary.audio/marketplace',
      label: 'Marketplace',
    },
    {
      href: 'https://www.elementary.audio/resources',
      label: 'Resources',
    },
    {
      href: 'https://buttondown.email/elemaudio/archive/',
      label: 'Newsletter',
    },
    {
      href: 'https://www.elementary.audio/license',
      label: 'License',
    },
    {
      href: 'https://www.elementary.audio/contact',
      label: 'Contact',
    },
  ];

  return (
    <footer className={styles.elem__footer}>
      {links && links.length > 0 && (
        <div className={styles.elem__footer__links}>
          {links.map((item, i) => (
            <div key={i}>
              <a href={item.href} className={styles.elem__footer__link}>
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
      {logo && (
        <a href={logo.href}>
          <ThemedImage
            className={styles.elem__footer__logo}
            alt={logo.alt}
            sources={sources}
          />
        </a>
      )}
      {copyright && (
        <div className={styles.elem__footer__text}>{copyright}</div>
      )}
    </footer>
  );
}

export default Footer;
