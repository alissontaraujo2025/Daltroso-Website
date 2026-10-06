"use client";

import { noWidow } from "@/lib/typography";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/data/team";
import styles from "./TeamSection.module.css";

const DRAG_THRESHOLD = 6;

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const [revealed, setRevealed] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const update = useCallback(() => {
    const el = scrollRef.current;
    const bar = barRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth - clientWidth > 4;
    setScrollable(overflow);
    setCanPrev(scrollLeft > 5);
    setCanNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    if (bar) {
      const ratio = overflow ? clientWidth / scrollWidth : 1;
      const progress = overflow ? scrollLeft / (scrollWidth - clientWidth) : 0;
      bar.style.width = `${ratio * 100}%`;
      bar.style.transform = `translateX(${progress * (1 / ratio - 1) * 100}%)`;
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(onScroll);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [update]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const step = (dir: -1 | 1) => {
    const el = scrollRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scrollRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: scrollRef.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = scrollRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      el.dataset.dragging = "true";
    }
    el.scrollLeft = d.startScroll - dx * 1.4;
  };

  const endDrag = () => {
    drag.current.active = false;
    const el = scrollRef.current;
    if (el) delete el.dataset.dragging;
  };

  const toggle = (index: number) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setOpen((current) => (current === index ? null : index));
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.carousel} ${revealed ? styles.revealed : ""}`}
      data-scrollable={scrollable || undefined}
    >
      <div className={styles.viewport}>
        <button
          type="button"
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={() => step(-1)}
          disabled={!canPrev}
          aria-label="Pessoa anterior"
        >
          <Arrow direction="prev" />
        </button>

        <div
          ref={scrollRef}
          className={styles.track}
          role="list"
          aria-label="Equipe Daltroso"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {members.map((member, index) => {
            const isOpen = open === index;
            const panelId = `equipe-bio-${index}`;
            return (
              <article
                key={member.name}
                role="listitem"
                className={styles.card}
                data-open={isOpen || undefined}
                style={{ "--i": index } as React.CSSProperties}
                onClick={() => toggle(index)}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse" && isOpen) setOpen(null);
                }}
              >
                <div className={styles.photoWrap}>
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 360px, 82vw"
                    className={styles.photo}
                    style={{ objectPosition: member.focus }}
                    draggable={false}
                  />
                  <span className={styles.tone} aria-hidden="true" />
                  <span className={styles.shade} aria-hidden="true" />
                </div>

                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>

                <div className={styles.panel} id={panelId}>
                  <span className={styles.pattern} aria-hidden="true" />
                  <div className={styles.panelHead}>
                    <p className={styles.panelName}>{member.name}</p>
                    <p className={styles.role}>{member.role}</p>
                    {member.credential && (
                      <span className={styles.badge}>{member.credential}</span>
                    )}
                  </div>
                  <p className={styles.bio}>{noWidow(member.bio)}</p>
                </div>

                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${isOpen ? "Fechar" : "Ver"} apresentação de ${member.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(index);
                  }}
                >
                  <span aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className={`${styles.nav} ${styles.navNext}`}
          onClick={() => step(1)}
          disabled={!canNext}
          aria-label="Próxima pessoa"
        >
          <Arrow direction="next" />
        </button>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div ref={barRef} className={styles.progressBar} />
      </div>
    </div>
  );
}
