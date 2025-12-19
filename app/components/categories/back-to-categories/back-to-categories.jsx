import React from 'react';
import Icon from '../../Icon';
import { unselectCategory } from '../../../redux/slices/categories/categoriesSlice.js';
import { useDispatch } from 'react-redux';

const BackToCategories = () => {
  const dispatch = useDispatch();

  const onBackClick = () => {
    dispatch(unselectCategory());
  };

  return (
    <button
      onClick={onBackClick}
      className="p-0 m-0 border-0 text-sm hover:bg-transparent hover:text-primary"
    >
      <Icon name="arrow-left" />
      Back
    </button>
  );
};

export default BackToCategories;
