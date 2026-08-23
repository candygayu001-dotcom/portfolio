// import { useEffect, useState } from 'react';

// const LINKS = [
//   { id: 'profile', label: 'Profile' },
//   { id: 'studies', label: 'Studies' },
//   { id: 'jobs', label: 'Job Profile' },
//   { id: 'achievements', label: 'Achievements' },
//   {id : 'activities', label: 'activities'}
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [active, setActive] = useState('profile');
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 40);
//       const sections = LINKS.map((l) => document.getElementById(l.id));
//       const mid = window.innerHeight / 2;
//       for (const sec of sections) {
//         if (sec && sec.getBoundingClientRect().top < mid) setActive(sec.id);
//       }
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
//         scrolled ? 'py-2' : 'py-4'
//       }`}
//     >
//       <div
//         className={`max-w-5xl mx-auto mx-4 md:mx-auto px-4 md:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
//           scrolled ? 'glass py-2' : 'py-2'
//         }`}
//       >
//         <a
//           href="#profile"
//           className="font-bold text-sky-950 text-lg tracking-tight"
//           style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//         >
//           <span className="text-sky-500">.</span>
//         </a>

//         <div className="hidden md:flex items-center gap-8">
//           {LINKS.map((l) => (
//             <a
//               key={l.id}
//               href={`#${l.id}`}
//               className={`nav-link text-sm font-medium ${
//                 active === l.id ? 'text-sky-700 active' : 'text-sky-800/70'
//               }`}
//             >
//               {l.label}
//             </a>
//           ))}
//         </div>

//         <button
//           className="md:hidden text-sky-800"
//           onClick={() => setOpen((v) => !v)}
//           aria-label="Toggle menu"
//         >
//           <div className="space-y-1.5">
//             <span
//               className={`block w-6 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}
//             />
//             <span className={`block w-6 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
//             <span
//               className={`block w-6 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}
//             />
//           </div>
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden mx-4 mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
//           {LINKS.map((l) => (
//             <a
//               key={l.id}
//               href={`#${l.id}`}
//               onClick={() => setOpen(false)}
//               className={`text-sm font-medium ${active === l.id ? 'text-sky-700' : 'text-sky-800/70'}`}
//             >
//               {l.label}
//             </a>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }


import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { id: 'profile', label: 'Profile' },
  { id: 'studies', label: 'Studies' },
  { id: 'jobs', label: 'Job Profile' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'activities', label: 'activities' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('profile');
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const itemRefs = useRef({});

  const moveLiquid = (id) => {
    const nav = navRef.current;
    const item = itemRefs.current[id];

    if (!nav || !item) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const x = itemRect.left - navRect.left;
    const y = itemRect.top - navRect.top;

    const liquid = nav.querySelector('.liquid-indicator');

    if (!liquid) return;

    liquid.style.width = `${itemRect.width}px`;
    liquid.style.height = `${itemRect.height}px`;

    liquid.style.transform = `
      translate3d(${x}px, ${y}px, 0)
    `;
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = LINKS.map((l) =>
        document.getElementById(l.id)
      );

      const mid = window.innerHeight / 2;

      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top < mid) {
          setActive(sec.id);
        }
      }
    };

    window.addEventListener('scroll', onScroll, {
      passive: true
    });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      moveLiquid(active);
    }, 50);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const handleResize = () => {
      moveLiquid(active);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  const handleClick = (id) => {
    setActive(id);
    setOpen(false);

    setTimeout(() => {
      moveLiquid(id);
    }, 30);
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >

        <div
          ref={navRef}
          className={`navbar-inner max-w-5xl mx-4 md:mx-auto px-4 md:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'glass py-2' : 'py-2'
          }`}
        >

          {/* LOGO */}

          <a
            href="#profile"
            onClick={() => handleClick('profile')}
            className="font-bold text-sky-950 text-lg tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            .
          </a>


          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-8">

            {/* ONE LIQUID INDICATOR */}

            <div className="liquid-indicator">

              <div className="liquid-shine"></div>

              <div className="liquid-drop drop-a"></div>
              <div className="liquid-drop drop-b"></div>
              <div className="liquid-drop drop-c"></div>

            </div>


            {LINKS.map((l) => (
              <a
                key={l.id}
                ref={(el) => {
                  itemRefs.current[l.id] = el;
                }}
                href={`#${l.id}`}
                onClick={() => handleClick(l.id)}
                className={`nav-link text-sm font-medium ${
                  active === l.id
                    ? 'active'
                    : ''
                }`}
              >
                {l.label}
              </a>
            ))}

          </div>


          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden text-sky-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >

            <div className="space-y-1.5">

              <span
                className={`block w-6 h-0.5 bg-current transition-transform ${
                  open
                    ? 'rotate-45 translate-y-2'
                    : ''
                }`}
              />

              <span
                className={`block w-6 h-0.5 bg-current transition-opacity ${
                  open
                    ? 'opacity-0'
                    : ''
                }`}
              />

              <span
                className={`block w-6 h-0.5 bg-current transition-transform ${
                  open
                    ? '-rotate-45 -translate-y-2'
                    : ''
                }`}
              />

            </div>

          </button>

        </div>


        {/* MOBILE MENU */}

        {open && (
          <div className="md:hidden mx-4 mt-2 glass rounded-2xl p-4 flex flex-col gap-3">

            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => handleClick(l.id)}
                className={`mobile-nav-link text-sm font-medium ${
                  active === l.id
                    ? 'active'
                    : ''
                }`}
              >
                {l.label}
              </a>
            ))}

          </div>
        )}

      </nav>


      {/* =====================================================
          LIQUID FLUID CSS
      ====================================================== */}

      <style>{`

        /* ================================================
           NAVBAR INNER
        ================================================= */

        .navbar-inner {
          position: relative;
        }


        /* ================================================
           NAV LINK
        ================================================= */

        .nav-link {

          position: relative;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding: 9px 17px;

          color: rgba(7, 89, 133, 0.70);

          text-decoration: none;

          z-index: 5;

          transition:
            color 0.5s ease;

        }


        .nav-link:hover {

          color: rgb(2, 132, 199);

        }


        .nav-link.active {

          color: white;

        }


        /* ================================================
           LIQUID INDICATOR
        ================================================= */

        .liquid-indicator {

          position: absolute;

          left: 0;

          top: 0;

          width: 70px;

          height: 35px;

          pointer-events: none;

          z-index: 1;

          border-radius:
            50% 50% 45% 55%
            /
            55% 45% 55% 45%;

          background:
            linear-gradient(
              135deg,
              #38bdf8,
              #0284c7
            );

          box-shadow:
            0 5px 15px
            rgba(2, 132, 199, 0.22);

          transform:
            translate3d(0, 0, 0);

          transition:
            transform 0.2s
              cubic-bezier(
                0.65,
                0,
                0.35,
                1
              ),

            width 0.45s
              cubic-bezier(
                0.65,
                0,
                0.35,
                1
              ),

            height 0.45s
              cubic-bezier(
                0.65,
                0,
                0.35,
                1
              ),

            border-radius 0.35s ease;

          animation:
            liquidIdle 2.5s ease-in-out infinite;

          overflow: visible;
        }


        /* ================================================
           LIQUID SHINE
        ================================================= */

        .liquid-shine {

          position: absolute;

          width: 35%;

          height: 30%;

          left: 18%;

          top: 12%;

          background:
            rgba(255,255,255,0.55);

          border-radius: 50%;

          filter: blur(2px);

          opacity: 0.8;

          animation:
            shineMove 2.2s ease-in-out infinite;
        }


        /* ================================================
           LIQUID DROPLETS
        ================================================= */

        .liquid-drop {

          position: absolute;

          display: block;

          background:
            linear-gradient(
              145deg,
              #7dd3fc,
              #0284c7
            );

          border-radius:
            50% 50% 55% 45%
            /
            60% 60% 40% 40%;

          opacity: 0;

          pointer-events: none;

        }


        /* First droplet */

        .drop-a {

          width: 7px;

          height: 10px;

          right: 12%;

          top: -4px;

          animation:
            liquidDropA 1.2s ease-out infinite;

        }


        /* Second droplet */

        .drop-b {

          width: 5px;

          height: 8px;

          left: 25%;

          bottom: -5px;

          animation:
            liquidDropB 1.5s ease-out infinite;

        }


        /* Third droplet */

        .drop-c {

          width: 4px;

          height: 6px;

          right: 28%;

          bottom: -4px;

          animation:
            liquidDropC 1.35s ease-out infinite;

        }


        /* ================================================
           LIQUID MOVEMENT
        ================================================= */

        @keyframes liquidIdle {

          0% {

            border-radius:
              50% 50% 45% 55%
              /
              55% 45% 55% 45%;

          }

          25% {

            border-radius:
              55% 45% 55% 45%
              /
              45% 55% 45% 55%;

          }

          50% {

            border-radius:
              42% 58% 50% 50%
              /
              55% 45% 55% 45%;

          }

          75% {

            border-radius:
              48% 52% 58% 42%
              /
              45% 55% 45% 55%;

          }

          100% {

            border-radius:
              50% 50% 45% 55%
              /
              55% 45% 55% 45%;

          }

        }


        /* ================================================
           DROPLET A
        ================================================= */

        @keyframes liquidDropA {

          0% {

            transform:
              translate(0, 0)
              scale(0.4);

            opacity: 0;

          }

          25% {

            opacity: 1;

          }

          100% {

            transform:
              translate(
                5px,
                -15px
              )
              scale(0.2);

            opacity: 0;

          }

        }


        /* ================================================
           DROPLET B
        ================================================= */

        @keyframes liquidDropB {

          0% {

            transform:
              translate(0, 0)
              scale(0.3);

            opacity: 0;

          }

          30% {

            opacity: 0.9;

          }

          100% {

            transform:
              translate(
                -4px,
                15px
              )
              scale(0.15);

            opacity: 0;

          }

        }


        /* ================================================
           DROPLET C
        ================================================= */

        @keyframes liquidDropC {

          0% {

            transform:
              translate(0, 0)
              scale(0.4);

            opacity: 0;

          }

          30% {

            opacity: 1;

          }

          100% {

            transform:
              translate(
                4px,
                13px
              )
              scale(0.1);

            opacity: 0;

          }

        }


        /* ================================================
           SHINE
        ================================================= */

        @keyframes shineMove {

          0% {

            transform:
              translateX(0);

            opacity: 0.5;

          }

          50% {

            transform:
              translateX(90%);

            opacity: 0.9;

          }

          100% {

            transform:
              translateX(0);

            opacity: 0.5;

          }

        }


        /* ================================================
           MOBILE
        ================================================= */

        .mobile-nav-link {

          display: block;

          position: relative;

          padding: 10px 14px;

          border-radius: 16px;

          color:
            rgba(7, 89, 133, 0.70);

          transition:
            all 0.3s ease;

        }


        .mobile-nav-link:hover {

          background:
            rgba(56, 189, 248, 0.12);

          color:
            rgb(2, 132, 199);

        }


        .mobile-nav-link.active {

          background:
            linear-gradient(
              135deg,
              #38bdf8,
              #0284c7
            );

          color: white;

        }

      `}</style>
    </>
  );
}
