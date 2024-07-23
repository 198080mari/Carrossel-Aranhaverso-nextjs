"use client";

import { IHeroData } from "@/interfaces/heroes";
import HeroDetails from "../HeroDetails";
import styles from "./carousel.module.scss";
import { useEffect, useMemo, useState } from "react";
import HeroPicture from "../HeroPicture";
import { AnimatePresence, motion } from "framer-motion";

enum enPosition {
  FRONT = 0, //HEROI DA FRENTE
  MIDDLE = 1,
  BACK = 2,
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [visibleItems, setVisibleItems] = useState<IHeroData[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId) - 1 //coloca no centro em destaque
  );
  const [startInteractionPosition, setStartInteractionPosition] =
    useState<number>(0);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % heroes.length) + heroes.length) % heroes.length; //resultado dentro do array, positivo e menor que limite 7

    const visibleItems = [...heroes, ...heroes].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    ); //efeito visual loop

    setVisibleItems(visibleItems);
  }, [heroes, activeIndex]);

  useEffect(() => {
    const htmlEl = document.querySelector("html");
    if (!htmlEl || !visibleItems) {
      return;
    }
    const currentHeroId = visibleItems[enPosition.MIDDLE].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlEl.classList.add("hero-page");

    return () => {
      //qd componente é desmontado
      htmlEl.classList.remove("hero-page");
    };
  }, [visibleItems]);

  useEffect(() => {
    if (!visibleItems) {
      return;
    }
    transitionAudio.play();
    const voiceAudio = voicesAudio[visibleItems[enPosition.MIDDLE].id];
    if (!voiceAudio) {
      return;
    }
    voiceAudio.volume = 0.3;
    voiceAudio.play();
  }, [visibleItems, transitionAudio, voicesAudio]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.clientX);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }
    handleChangeDragTouch(e.clientX);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }
    handleChangeDragTouch(e.changedTouches[0].clientX);
  };

  const handleChangeDragTouch = (clientX: number) => {
    const endInteractionPosition = clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition; //diff pos. > 0 da esq. p/ a dir.
    const newPosition = diffPosition > 0 ? -1 : 1; //totaciona anti-horario ou horrio
    handleChangeActiveIndex(newPosition);
  };

  const handleChangeActiveIndex = (newDirection: number) => {
    //altera heroi, +1 horario, -1 anti
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  if (!visibleItems) {
    //se user effect estiver calculando, não abre pg. vazia
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart} //arrasta
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map(
              (
                item,
                position //position é o mesmo que i
              ) => (
                <motion.div
                  key={item.id}
                  className={styles.hero}
                  initial={{ x: -1500, scale: 0.75 }}
                  animate={{ x: 0, ...getItemStyles(position) }}
                  exit={{ x: 0, opacity: 0, scale: 1, left: "-20%" }}
                  transition={{ duration: 0.8 }}
                >
                  <HeroPicture hero={item} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2, //heroi maior
    };
  }
  if (position === enPosition.MIDDLE) {
    return {
      zIndex: 2,
      left: 300,
      scale: 0.8,
      top: "-10%", //sobe 10
    };
  }
  return {
    zIndex: 1,
    filter: "blur(10px)",
    left: 160,
    top: "-20%",
    scale: 0.6,
    opacity: 0.8,
  };
};

//return <h1>componente: {activeId}</h1>;
