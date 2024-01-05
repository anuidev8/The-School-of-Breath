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
import { menuList } from "../SleepMusic";
import { FaPlay, FaStop} from "react-icons/fa";
import { TbPlayerSkipForwardFilled ,TbPlayerSkipBackFilled} from "react-icons/tb";

import { AiOutlineControl} from "react-icons/ai";
import { MdOutlineTimer} from "react-icons/md";
import { Button, NavbarItem, useDisclosure } from "@nextui-org/react";
import { Layout } from "./layout/Layout";
const soundEffectListMap = [
  {
    name: "Rain",
    imageUrl:
      "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702508479/audios/icons/1_ntd34p.png",
    src: "https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702247988/audios/rain_oj61ra.mp3",
  },
  {
    name: "Crickets",
    imageUrl:
      "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702509247/audios/icons/8_cslz5j.png",
    src: "https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702248061/audios/crickets_kk9pv5.mp3",
  },
  {
    name: "Fire",
    imageUrl:
      "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702509295/audios/icons/4_kolblb.png",
    src: "https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702660090/audios/sounds/campfireinthegarden_ydrgyj.mp3",
  },
  {
    name: "bellAudio",
    imageUrl:
      "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702539357/audios/icons/7_rgwsr8.png",
    src: "https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702660121/audios/sounds/best-hypnotic-wind-chimes-long-nice-loop_eplorz.mp3",
  },
  {
    name: "thunderAudio",
    imageUrl:
      "https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702539337/audios/icons/3_a1etkv.png",
    src: "https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702540826/audios/icons/thunder-25689_r1bdzg.mp3",
  },
];

const MainPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  /* const [resetSignal, setResetSignal] = useState(false); */
  const history = useNavigate();
  //const soundEffectAudioRef = useRef<HTMLAudioElement>(null);
  const {
    selectedBackground,
    selectBackground,
    activeSoundEffects,
    hasInteracted,
    setActiveSoundEffects,
    handleUserInteraction,
  } = useBackground();

  const soundEffectRefs = useRef(new Map());

  const soundEffectList = useMemo(() => {
    return soundEffectListMap.map((item) => item.name);
  }, []); // Add more as needed
  const [isPlaying, setIsPlaying] = useState<boolean>();




   useEffect(() => {
    // Initialize soundEffectRefs
    soundEffectList.forEach((effect) => {
      soundEffectRefs.current.set(effect, createRef());
    });
  }, []); 

     useEffect(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.src = getAudioSource(selectedBackground);
      audioRef.current.load();
      setIsPlaying(true);
    }
  }, [selectedBackground, hasInteracted]); 

  const onAudioLoad = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  };
  const getAudioSource = (background: string) => {
    const findAudioName =
      menuList.find((item) => item.name === background)?.audio ?? "";

    return findAudioName;
  };

  const backgrounds = useMemo(() => {
    return menuList.map((item) => item.name);
  }, []); // Add more backgrounds as needed

  const handleSlideChange = (swiper: SwiperClass) => {
    const newBackground = backgrounds[swiper.activeIndex];
    if (activeSoundEffects) {
      Array.from(activeSoundEffects).map((item) => {
        if (soundEffectRefs.current.get(item).current) {
          soundEffectRefs.current.get(item).current.play();
        }
      });
    }
    selectBackground(newBackground);
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

    const index = backgrounds.findIndex(
      (bg) => bg === localStorage.getItem("selectedBackground")
    );

    // Update the initial slide index
    if (index !== -1) {
      setInitialSlideIndex(index);
    }
  }, [selectedBackground, backgrounds]);

 



  const onNavigate = () => {
    history("/menu");
  };
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpenTimer, onOpen:onOpenTimer, onOpenChange:onOpenChangeTimer} = useDisclosure();

  return (
    <Layout
    onBack={onNavigate }
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
        <div style={{ position: "relative" }} className="">
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
              {menuList.map((background, index) => (
                <SwiperSlide
                  style={{
                    height: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index + 1}
                >
                  <figure className="absolute top-28 flex justify-center m-0 bg-black">
                    <img src={background.image} alt={background.name} />
                  </figure>
                  <div
                    className="relative text-white font-bold text-xl mt-0"
                   
                  >
                    {background.name}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <audio ref={audioRef} onLoadedData={onAudioLoad} />
       
        </div>

        <div
        className="absolute top-2/4 flex justify-center text-white w-full"
        >
          <Swiper
            freeMode={true}
            modules={[FreeMode]}
            spaceBetween={0}
            slidesPerView={4}

          >
            {soundEffectList.map((effect, index) => (
              <SwiperSlide>
                <Button
                  className={`flex justify-center  items-center flex-col  bg-white/10 h-28 ${
                    isActiveEffect(effect) ? "bg-primary/30" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectSoundEffect(effect)}
                >
                  <figure className="m-0 ">
                    <img
                      width={65}
                      height={65}
                      src={
                        soundEffectListMap.find((item) => item.name === effect)
                          ?.imageUrl ??
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

        {/*  <button className="control play" onClick={togglePlay}>
      {" "}
      {!isPlaying ? (
       
       <FaPlay />
      ) : (
        <FaStop />
      )}{" "}
    </button> */}
    <div style={{
      bottom:'12rem'
    }} className="container-box absolute  w-full z-50">
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
        <Button isIconOnly className="arrow-left arrow bg-transparent text-2xl">
          <TbPlayerSkipBackFilled />
        </Button>
        <Button isIconOnly className="arrow-right arrow bg-transparent text-2xl">
          <TbPlayerSkipForwardFilled />
        </Button>
    </div>
       
      </div>
    </Layout>
  );
};

export default MainPage;
