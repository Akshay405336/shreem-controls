"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const VIDEO_ID = "ZQGoHX9oe0w";
const IFRAME_TITLE = "Shreem Controls project showcase video";

type YtPlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  getIframe: () => HTMLIFrameElement;
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

type YtPlayerEvent = {
  target: YtPlayer;
};

type YtNamespace = {
  Player: new (
    element: string | HTMLElement,
    options: {
      width?: string | number;
      height?: string | number;
      videoId?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: YtPlayerEvent) => void;
      };
    },
  ) => YtPlayer;
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<YtNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires a browser environment."));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export function ProjectsShowcaseVideo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const showControlsRef = useRef(false);
  const recreatingRef = useRef(false);
  const pendingControlsRef = useRef<0 | 1 | null>(null);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const createPlayer = async (controls: 0 | 1, startSeconds = 0) => {
    if (!hostRef.current) return;

    if (recreatingRef.current) {
      pendingControlsRef.current = controls;
      return;
    }

    recreatingRef.current = true;
    showControlsRef.current = controls === 1;
    setControlsVisible(controls === 1);

    try {
      const YT = await loadYouTubeApi();

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* Player may already be disposed. */
        }
        playerRef.current = null;
      }

      if (!hostRef.current) return;

      hostRef.current.innerHTML = "";
      const mount = document.createElement("div");
      mount.className = "h-full w-full";
      hostRef.current.appendChild(mount);

      const startAt = Math.max(0, startSeconds);
      const requestedControls = controls;

      playerRef.current = new YT.Player(mount, {
        width: "100%",
        height: "100%",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: requestedControls,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          fs: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            const iframe = event.target.getIframe();
            iframe.title = IFRAME_TITLE;
            iframe.setAttribute("title", IFRAME_TITLE);
            iframe.classList.add("h-full", "w-full");
            event.target.mute();
            if (startAt > 0.25) {
              event.target.seekTo(startAt, true);
            }
            event.target.playVideo();
          },
        },
      });
    } finally {
      recreatingRef.current = false;
      const pending = pendingControlsRef.current;
      pendingControlsRef.current = null;
      if (pending !== null && pending !== (showControlsRef.current ? 1 : 0)) {
        let currentTime = 0;
        try {
          currentTime = playerRef.current?.getCurrentTime() ?? startSeconds;
        } catch {
          currentTime = startSeconds;
        }
        void createPlayer(pending, currentTime);
      }
    }
  };

  const syncControls = useCallback(
    (nextVisible: boolean) => {
      if (showControlsRef.current === nextVisible && !recreatingRef.current) return;

      let currentTime = 0;
      try {
        currentTime = playerRef.current?.getCurrentTime() ?? 0;
      } catch {
        currentTime = 0;
      }

      void createPlayer(nextVisible ? 1 : 0, currentTime);
    },
    [createPlayer],
  );

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    void createPlayer(0, 0);

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* ignore */
        }
        playerRef.current = null;
      }
    };
  }, [createPlayer]);

  return (
    <section
      data-header-theme="light"
      aria-label="Project showcase video"
      className="bg-[#FCFCFA] py-7 sm:py-9 md:py-10 lg:py-12"
    >
      <Container>
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[0.35fr_0.65fr] md:gap-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-10">
          <div className="min-w-0 max-w-md md:max-w-none">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <span className="h-px w-9 shrink-0 bg-[#009E98]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                OUR WORK
              </span>
            </div>

            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.55rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#252A2A]">
              Ideas Into{" "}
              <span className="text-[#009E98]">Reality.</span>
            </h2>

            <p className="mt-3 text-[14px] leading-[1.7] text-[#737B7A] sm:mt-4 sm:text-[16px] sm:leading-[1.75] lg:text-[17px]">
              Explore our completed smart home automation and security projects. Discover how we
              bring intelligent technology, thoughtful design and seamless control together to
              create exceptional living and working spaces.
            </p>

            <a
              href="#project-gallery"
              className="mt-5 inline-flex text-[12px] font-medium tracking-[0.04em] text-[#009E98] transition-colors hover:text-[#087F7B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009E98]/40 focus-visible:ring-offset-2"
            >
              Explore Our Projects
            </a>
          </div>

          <div
            className={cn(
              "group relative w-full overflow-hidden rounded-[18px] bg-[#0f1414] shadow-[0_12px_36px_rgba(37,42,42,0.1)] sm:rounded-[20px] lg:rounded-[22px]",
              "aspect-video",
            )}
            onMouseEnter={() => {
              if (!isCoarsePointer) syncControls(true);
            }}
            onMouseLeave={() => {
              if (!isCoarsePointer) syncControls(false);
            }}
          >
            <div
              ref={hostRef}
              className="absolute inset-0 h-full w-full [&>div]:h-full [&>div]:w-full [&_iframe]:h-full [&_iframe]:w-full"
            />

            {isCoarsePointer ? (
              <button
                type="button"
                className={cn(
                  "absolute bottom-3 right-3 z-10 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-opacity duration-300",
                  "hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#73BDB8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1414]",
                )}
                aria-pressed={controlsVisible}
                onClick={() => syncControls(!controlsVisible)}
              >
                {controlsVisible ? "Hide controls" : "Show controls"}
              </button>
            ) : null}

            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent transition-opacity duration-300",
                controlsVisible ? "opacity-0" : "opacity-100",
              )}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
