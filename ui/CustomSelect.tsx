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

import { useRouter } from 'next/navigation';

const CustomSelect = () => {
   const [search, setSearch] = React.useState("");
   const router = useRouter();

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (search.trim()) {
         router.push(`/kurslar?search=${encodeURIComponent(search.trim())}`);
         setSearch("");
      }
   };

   return (
      <form onSubmit={handleSearch} className="tgmenu__search-form">
         <div className="input-grp">
            <input
               type="text"
               placeholder="Eğitim Ara..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit"><i className="flaticon-search"></i></button>
         </div>
      </form>
   );
};

export default CustomSelect;
