import { useEffect, useState, useRef, useMemo, createRef } from "react";
import { useBackground } from "../contexts/BackgroundContext";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode } from "swiper/modules";
import "../styles/MainPage.css";
import { AudioControlModal } from "./Modal";
import TimerModal from "./TimerModal";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaStop } from "react-icons/fa";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";

import { AiOutlineControl } from "react-icons/ai";
import { MdOutlineTimer } from "react-icons/md";
import { Button, NavbarItem, useDisclosure } from "@nextui-org/react";
import { Layout } from "./layout/Layout";
import { soundEffectListMap } from "../SoundEffects";
import { Music } from "../types/music";
import { useQuery } from "@tanstack/react-query";
import musicApi from "../services/music.api";
import { CardLoader } from "./feedbacks/CardLoader";
import LikeButton from "./menu/LikeButton";
import useToggleFavorite from "../hooks/useToggleFavorite";
import { urlApi } from "../utils/api";
import { getPersistData } from "../utils/localstore";
import Lottie from "lottie-react";
import LikeIcon from  '../assets/animation.json'
const MainPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(true);
  /* const [resetSignal, setResetSignal] = useState(false); */
  const history = useNavigate();
  const {
    selectedBackground,
    selectBackground,
    activeSoundEffects,
    setActiveSoundEffects,
    handleUserInteraction,
  } = useBackground();

  const getCategory = localStorage.getItem("categorySelected") ?? "";
 

  const {
    data: menuList,
    isLoading,
    error,
    refetch,
  } = useQuery<Music[]>({
    queryKey: ["musicbycategory", getCategory],
    queryFn: async () => musicApi.getMusicByCategory({ category: getCategory }),refetchOnWindowFocus:false
  });

  //const soundEffectAudioRef = useRef<HTMLAudioElement>(null);

  const soundEffectRefs = useRef(new Map());

  const soundEffectList = useMemo(() => {
    return soundEffectListMap.map((item) => item.name);
  }, []); // Add more as needed
  const [isPlaying, setIsPlaying] = useState<boolean>();
  useEffect(() => {
    
    if (audioRef.current) {
      const audioSrc = getAudioSource(selectedBackground?.audioFilename ?? "");
      audioRef.current.src = audioSrc;
      audioRef.current.load(); // This will trigger onLoadedMetadata when metadata is loaded
      setIsPlaying(true);
    }
  }, [selectedBackground]);
  useEffect(() => {
    // Initialize soundEffectRefs
    soundEffectList.forEach((effect) => {
      soundEffectRefs.current.set(effect, createRef());
    });
  }, []);

  // Loading main audio
  const onAudioLoadStart = () => {
    setIsAudioLoading(true);
  };
 

  const onAudioLoad = () => {
    setIsAudioLoading(false);
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  };
  const getAudioSource = (music: string) => {
    const findAudioName = `${music}`;
    return findAudioName;
  };

  const backgrounds = useMemo(() => {
    return menuList?.map((item: Music) => item.name) ?? [];
  }, [menuList]); // Add more backgrounds as needed

  const handleSlideChange = (swiper: SwiperClass) => {
    const newBackground = backgrounds[swiper.activeIndex];
    if (activeSoundEffects) {
      Array.from(activeSoundEffects).map((item) => {
        if (soundEffectRefs.current.get(item).current) {
          soundEffectRefs.current.get(item).current.play();
        }
      });
    }

    const findingMusic =
      menuList?.find((item) => item.name === newBackground) ?? null;
    findingMusic && selectBackground(findingMusic);
  };

  const handleSelectSoundEffect = (effect: string) => {
    const updatedEffects = new Set(activeSoundEffects);
    if (updatedEffects.has(effect)) {
      updatedEffects.delete(effect);
    } else {
      updatedEffects.add(effect);
    }
    setActiveSoundEffects(updatedEffects);
  };

  const getSoundEffectSource = (effect: string) => {
    const findAudioName =
      soundEffectListMap.find((item) => item.name === effect)?.src ?? "";

    return findAudioName;
  };

  const isActiveEffect = (effect: string) => {
    return activeSoundEffects.has(effect);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current?.pause();
      }
      if (activeSoundEffects) {
        Array.from(activeSoundEffects).map((item) => {
          if (soundEffectRefs.current.get(item).current) {
            soundEffectRefs.current.get(item).current.pause();
          }
        });
      }
    } else {
      handleUserInteraction();
      if (audioRef.current) {
        audioRef.current?.play();
      }
      if (activeSoundEffects) {
        Array.from(activeSoundEffects).map((item) => {
          if (soundEffectRefs.current.get(item).current) {
            soundEffectRefs.current.get(item).current.play();
          }
        });
      }
    }
  };

  // Filtering active sound effects
  const activeRefs = new Map<string, React.RefObject<HTMLAudioElement>>();
  Array.from(activeSoundEffects).forEach((effect) => {
    const ref = soundEffectRefs.current.get(effect);
    if (ref) {
      activeRefs.set(effect, ref);
    }
  });

  // Timer logic
  const handleTimerEnd = () => {
    // Logic for when the timer ends
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundEffectRefs.current.forEach(
      (ref) => ref.current && ref.current.pause()
    );
    setIsPlaying(false);
  };

  const [initialSlideIndex, setInitialSlideIndex] = useState<null | number>(
    null
  ); // State to store initial slide index

  // ... (previous code remains unchanged)

  useEffect(() => {
    // Find the index of the selected background

    const index = backgrounds?.findIndex(
      (bg) => bg === selectedBackground?.name
    );

    // Update the initial slide index
    if (index !== -1) {
      setInitialSlideIndex(index ?? null);
    }
  }, [selectedBackground, backgrounds]);

  const onNavigate = () => {
    history("/menu");
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenTimer,
    onOpen: onOpenTimer,
    onOpenChange: onOpenChangeTimer,
  } = useDisclosure();

  const { toggleFavorite, isMutating } = useToggleFavorite(urlApi, refetch);


  if (error) return <div>An error has occurred: {error.message}</div>;
  if (menuList?.length === 0) return <div>No musics available.</div>;

  const user = getPersistData("user") ?? null;

  const isFavorite = (favorites: string[]) => {
    return favorites?.includes(user.id) ?? false;
  };

  return (
    <Layout
      onBack={onNavigate}
      title="Home"
      navBarChildren={
        <>
          <NavbarItem>
            {" "}
            <Button
              onClick={onOpenTimer}
              isIconOnly
              className="text-2xl mr-2 bg-primary"
              aria-label="back"
            >
              <MdOutlineTimer />
            </Button>
            <Button
              onClick={onOpen}
              isIconOnly
              className=" text-2xl bg-primary"
              aria-label="back"
            >
              <AiOutlineControl />
            </Button>
          </NavbarItem>
        </>
      }
      navBarClassName={"bg-transparent"}
    >
      <div className="main-page">
      <audio
     
          ref={audioRef}
          onLoadedData={onAudioLoad}
          onLoadStart={onAudioLoadStart}
        />
        {isAudioLoading && isLoading  && (
          <div className="h-screen flex justify-center items-center">
            <CardLoader />
          </div>
        )}
        {!isAudioLoading && !isLoading  && (
          <>
            <div className="pt-8 your-horizontal-scroll-container appear">
              {initialSlideIndex !== null && (
                <Swiper
                  initialSlide={initialSlideIndex}
                  breakpoints={{
                    // when window width is >= 320px
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    // when window width is >= 640px
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                  }}
                  navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
                  modules={[Navigation]}
                  onSlideChange={handleSlideChange}
                >
                  {menuList &&
                    menuList.map((background, index) => (
                      <SwiperSlide
                        style={{
                          height: "50vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                        key={index + 1}
                      >
                        <figure className=" flex justify-center m-0 bg-black w-full ">
                          <img
                            className="object-contain w-80 h-72"
                            src={`${background.imageFilename}`}
                            loading="lazy"
                            alt={background.name}
                          />
                        </figure>
                        <div className="relative h-7 w-full">
                       
                        {
                          isMutating && 
                            <div className=" absolute z-20 w-14 h-14 -top-2 left-2/4 -translate-x-2/4">
                            <Lottie style={{ }} className="translate-x-0" animationData={LikeIcon} loop={true}   />
                        </div>
                          }
                         
                           
                        
                       {!isMutating && (
                          <div className="relative z-10">
                          <LikeButton
                          className="like-button-m "
                            onToggle={() => toggleFavorite(background.id)}
                            isFavorite={isFavorite(background.favorites)}
                          />
                          </div>
                        )} 

                        </div>
                       
                        <div className="relative text-white font-bold text-xl mt-0 min-h-14">
                          {background.name}
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>

            <div className=" flex justify-center text-white w-full appear mt-4">
              <Swiper
                freeMode={true}
                modules={[FreeMode]}
                spaceBetween={10}
                slidesPerView={4}
              >
                {soundEffectList.map((effect, index) => (
                  <SwiperSlide  key={index}>
                    <Button
                      className={`flex justify-center  items-center flex-col  bg-white/10 h-28 ${
                        isActiveEffect(effect) ? "bg-primary/30" : ""
                      }`}
                     
                      onClick={() => handleSelectSoundEffect(effect)}
                    >
                      <figure className="m-0 ">
                        <img
                          width={65}
                          height={65}
                          src={
                            soundEffectListMap.find(
                              (item) => item.name === effect
                            )?.imageUrl ??
                            "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702508479/audios/icons/1_ntd34p.png"
                          }
                        />
                      </figure>
                      <div>{effect}</div>
                    </Button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {Array.from(activeSoundEffects).map((effect, index) => (
              <audio
                key={index}
                ref={soundEffectRefs.current.get(effect)}
                src={getSoundEffectSource(`${effect}`)}
                autoPlay
                loop
              />
            ))}

            <AudioControlModal
              onOpenChange={onOpenChange}
              isOpen={isOpen}
              audioRef={audioRef}
              soundEffectRefs={activeRefs}
            />

            <TimerModal
              onOpenChange={onOpenChangeTimer}
              isOpen={isOpenTimer}
              onTimerEnd={handleTimerEnd}
            />

            <div className="container-box  w-full mt-16 flex justify-around appear">
              <Button
                isIconOnly
                className="arrow-left arrow bg-transparent text-2xl"
              >
                <TbPlayerSkipBackFilled />
              </Button>
              <Button
                isIconOnly
                size="lg"
                className=" rounded-full text-2xl bg-white/50"
                variant="faded"
                onClick={togglePlay}
              >
                {" "}
                {!isPlaying ? <FaPlay /> : <FaStop />}{" "}
              </Button>

              <Button
                isIconOnly
                className="arrow-right arrow bg-transparent text-2xl"
              >
                <TbPlayerSkipForwardFilled />
              </Button>
            </div>
          </>
        )}
    
      </div>
    </Layout>
  );
};

export default MainPage;
