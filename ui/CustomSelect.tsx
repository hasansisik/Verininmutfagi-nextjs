"use client"
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import category_data from "@/data/inner-data/CategoryData";

const animatedComponents = makeAnimated();

// CategoryData'dan options oluştur
const options = category_data.map(category => ({
   value: category.slug,
   label: category.name
}));

const CustomSelect = ({ value, onChange }: any) => {
   return (
      <form onSubmit={(e) => e.preventDefault()} className="tgmenu__search-form">
         <div className="input-grp">
            <input type="text" placeholder="Kurs Ara..." />
            <button type="submit"><i className="flaticon-search"></i></button>
         </div>
      </form>
   );
};

export default CustomSelect;
