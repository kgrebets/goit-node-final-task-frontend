import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

const TestimonialsSlider = ({ testimonials }) => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 10000,
        }}
        className="mt-4 md:mt-9 text-center text-lg"
        pagination={{
          enabled: true,
          clickable: true,
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div>
              <p>{testimonial.text}</p>
              <p className="font-extrabold uppercase mt-16 md:mt-20 leading-6">
                {testimonial.user.username}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TestimonialsSlider;
