import { FC } from "react";
import { useCategories } from "../../hooks/useCategories";
import { Button } from "@nextui-org/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';



export interface CategoryType {
  name: string;
  slug: string;
  _id: string;
}

export const CategorySelector: FC<{
  onSelectCategory: (category: string) => void;
  categorySelected:string
}> = ({ onSelectCategory,categorySelected }) => {
  const { data: categories, isLoading, error } = useCategories();

  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;
  if (categories?.length === 0) return <div>No categories available.</div>;

  return (
    <div className="mt-6">
      <Swiper
      className="h-24 "
      freeMode={true}
      modules={[FreeMode]}
      spaceBetween={0}
      slidesPerView={4}
       
      >
        
        <SwiperSlide className="">
          <Button className={`${categorySelected === '' || categorySelected === " " ? 'bg-primary': 'bg-warning/90'}`} onClick={() => onSelectCategory(" ")}>All</Button>
        </SwiperSlide>
  
        {categories?.map((category) => (
          <SwiperSlide className="" key={category.name}>
            <Button
            className={`${categorySelected === category._id ? 'bg-primary': 'bg-warning/90'}`}
              key={category.name}
              onClick={() => onSelectCategory(category._id)}
            >
              {category.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
