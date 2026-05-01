"use client";

import { useEffect } from "react";

export default function GsapProvider() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText }   = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {

        /* ─────────────────────────────────────────
           1. HERO HEADLINE  — SplitText line reveal
           (replaces the old opacity/y fromTo)
        ───────────────────────────────────────── */
        const heroHeadline = document.getElementById("hero-headline");
        if (heroHeadline) {
          // Reset inline style set in JSX so SplitText takes over
          gsap.set(heroHeadline, { opacity: 1, y: 0 });

          const heroSplit = SplitText.create(heroHeadline, {
            type: "lines",
            mask: "lines",
          });

          // Fix Turkish diacritics (ğ, ş, ç…) clipped by mask overflow:hidden.
          // overflow-clip-margin lets content that slightly overflows the clip box remain visible,
          // while the animation (yPercent:110 → 0) still works correctly.
          heroSplit.lines.forEach((line) => {
            const wrapper = line.parentElement as HTMLElement | null;
            if (wrapper && wrapper !== heroHeadline) {
              (wrapper.style as unknown as Record<string, string>)["overflow-clip-margin"] = "0.3em";
            }
          });

          gsap.fromTo(
            heroSplit.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.6,
              ease: "power4.out",
              stagger: 0.14,
              delay: 0.15,
            }
          );
        }

        /* ─────────────────────────────────────────
           2. ALL OTHER HEADINGS (h1-h6)
           Scroll-triggered SplitText line reveal
        ───────────────────────────────────────── */
        const headings = document.querySelectorAll<HTMLElement>(
          "h1:not(#hero-headline), h2, h3, h4, h5, h6"
        );

        headings.forEach((el) => {
          // Skip elements inside the dashboard (safety check)
          if (el.closest("[data-dashboard]")) return;

          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,      // re-splits on resize / font load
          });

          // Fix Turkish diacritics (ğ, ş, ç…) clipped by mask overflow:hidden.
          split.lines.forEach((line) => {
            const wrapper = line.parentElement as HTMLElement | null;
            if (wrapper && wrapper !== el) {
              (wrapper.style as unknown as Record<string, string>)["overflow-clip-margin"] = "0.3em";
            }
          });

          gsap.fromTo(
            split.lines,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.065,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

        /* ─────────────────────────────────────────
           3. REVEAL — IntersectionObserver (non-heading blocks)
        ───────────────────────────────────────── */
        const observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) e.target.classList.add("active");
            }),
          { threshold: 0.15 }
        );
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        /* ─────────────────────────────────────────
           4. PARALLAX
        ───────────────────────────────────────── */
        const heroParallax = document.getElementById("hero-parallax");
        if (heroParallax) {
          gsap.to("#hero-parallax", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: "section:first-child",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        const problemParallax = document.getElementById("problem-parallax");
        if (problemParallax) {
          gsap.to("#problem-parallax", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: "#problem-parallax",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        /* ─────────────────────────────────────────
           5. CTA PREMIUM HOVER
        ───────────────────────────────────────── */
        document.querySelectorAll<HTMLElement>(".cta-premium").forEach((btn) => {
          btn.addEventListener("mouseenter", () =>
            gsap.to(btn, { scale: 1.02, duration: 0.4, ease: "power2.out" })
          );
          btn.addEventListener("mouseleave", () =>
            gsap.to(btn, { scale: 1, duration: 0.4, ease: "power2.out" })
          );
        });
      });
    }

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return null;
}
