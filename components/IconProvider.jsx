'use client';

import { IconContext } from 'react-icons';

/**
 * Saare react-icons ko ek jaisa banata hai:
 *
 *   size: '1em'   → icon apne parent ke font-size jitna bada hoga.
 *                   Matlab purani CSS (jaise .value-icon{font-size:2.5rem})
 *                   jaise emoji ko size deti thi, waise hi ab icon ko degi.
 *                   CSS mein kuch badalna nahi pada.
 *
 *   className     → 'ricon' class har icon par lag jaati hai, taaki
 *                   globals.css mein ek hi jagah se alignment set ho sake.
 */
export default function IconProvider({ children }) {
  return (
    <IconContext.Provider value={{ size: '1em', className: 'ricon' }}>
      {children}
    </IconContext.Provider>
  );
}
