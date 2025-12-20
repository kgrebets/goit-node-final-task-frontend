import React, { useEffect } from 'react';
import TestimonialsSlider from '../testimonials-slider';
import Icon from '../../Icon/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestimonials } from '../../../redux/slices/testimonials/testimonialsSlice.js';
import { fetchTestimonials } from '../../../redux/slices/testimonials/testimonialsOps.js';

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, []);

  if (!testimonials?.length) {
    return null;
  }

  return (
    <section className="container max-w-4xl">
      <p className="text-sm font-medium text-center mb-4">
        What our clients say
      </p>
      <h2 className="text-2.75xl text-center">Testimonials</h2>
      <Icon
        name="quote"
        className="text-tertiary w-auto md:h-14 md:pl-10"
        size={42}
      />
      <TestimonialsSlider testimonials={testimonials} />
    </section>
  );
};

export default Testimonials;
