"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { assetPath } from "@/lib/asset-path";

interface WorkImageGalleryProps {
  images: string[];
  title: string;
  onIndexChange?: (index: number) => void;
}

export function WorkImageGallery({ images, title, onIndexChange }: WorkImageGalleryProps) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (images.length === 0) return;
      const clamped = Math.max(0, Math.min(images.length - 1, next));
      setIndex(clamped);
      onIndexChange?.(clamped);
    },
    [images.length, onIndexChange],
  );

  useEffect(() => {
    setIndex(0);
    onIndexChange?.(0);
  }, [images, onIndexChange]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  if (images.length === 0) {
    return (
      <div className="liquid-glass flex min-h-[40vh] items-center justify-center rounded-[1.5rem] text-[0.875rem] text-muted">
        暂无图片
      </div>
    );
  }

  const current = images[index];

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-[1.75rem] liquid-glass">
        <div className="relative flex min-h-[min(72vh,640px)] w-full items-center justify-center p-3 md:min-h-[min(68vh,720px)] md:p-7">
          <Image
            key={current}
            src={assetPath(current)}
            alt={`${title} ${index + 1}`}
            width={1600}
            height={1200}
            className="max-h-[min(68vh,680px)] w-auto max-w-full rounded-xl object-contain animate-[fadeIn_0.35s_ease-out]"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority={index === 0}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/35 to-transparent" />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="liquid-glass-strong absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-0 md:left-5 md:h-11 md:w-11"
              aria-label="上一张"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === images.length - 1}
              className="liquid-glass-strong absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-0 md:right-5 md:h-11 md:w-11"
              aria-label="下一张"
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-[0.75rem] font-medium text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => goTo(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition-all md:h-20 md:w-20 ${
                i === index
                  ? "ring-accent shadow-[0_8px_22px_-14px_rgba(0,113,227,0.75)]"
                  : "ring-transparent opacity-65 hover:opacity-100"
              }`}
              aria-label={`查看第 ${i + 1} 张`}
              aria-current={i === index}
            >
              <Image
                src={assetPath(img)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
