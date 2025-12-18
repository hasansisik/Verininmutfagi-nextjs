import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "@/config";

const CourseSidebar = ({ allCourses, setCourses }: any) => {
   const [categories, setCategories] = useState<any[]>([]);
   const [showMoreCategory, setShowMoreCategory] = useState(false);

   const [categorySelected, setCategorySelected] = useState('');
   const [priceTypeSelected, setPriceTypeSelected] = useState('');
   const [skillSelected, setSkillSelected] = useState('');
   const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

   const skillLevels = ['Başlangıç', 'Orta', 'İleri'];
   const priceTypes = ['Ücretsiz'];

   useEffect(() => {
      fetchCategories();
   }, []);

   const fetchCategories = async () => {
      try {
         const response = await axios.get(`${server}/categories`);
         if (response.data.success) {
            setCategories(response.data.categories);
         }
      } catch (error) {
         console.error("Kategoriler yüklenirken hata:", error);
      }
   };

   // Logic to handle all filters
   const applyFilters = (filters: any) => {
      let filtered = [...allCourses];

      if (filters.category) {
         filtered = filtered.filter(course => course.category?._id === filters.category || course.category?.name === filters.category);
      }

      if (filters.priceType === 'Ücretsiz') {
         filtered = filtered.filter(course => course.price === 0 || course.price_type === 'Ücretsiz');
      }

      if (filters.skill) {
         filtered = filtered.filter(course => course.skill_level === filters.skill);
      }

      if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
         filtered = filtered.filter(course => {
            const price = course.price || 0;
            return price >= filters.minPrice && price <= filters.maxPrice;
         });
      }

      setCourses(filtered);
   };

   const handleCategory = (id: string, name: string) => {
      const newCategory = categorySelected === id ? '' : id;
      setCategorySelected(newCategory);
      applyFilters({ category: newCategory, priceType: priceTypeSelected, skill: skillSelected, minPrice: priceRange.min, maxPrice: priceRange.max });
   };

   const handlePriceType = (type: string) => {
      const newType = priceTypeSelected === type ? '' : type;
      setPriceTypeSelected(newType);
      applyFilters({ category: categorySelected, priceType: newType, skill: skillSelected, minPrice: priceRange.min, maxPrice: priceRange.max });
   };

   const handleSkill = (skill: string) => {
      const newSkill = skillSelected === skill ? '' : skill;
      setSkillSelected(newSkill);
      applyFilters({ category: categorySelected, priceType: priceTypeSelected, skill: newSkill, minPrice: priceRange.min, maxPrice: priceRange.max });
   };

   const handlePriceRange = (e: any) => {
      const { name, value } = e.target;
      const newRange = { ...priceRange, [name]: Number(value) };
      setPriceRange(newRange);
      applyFilters({ category: categorySelected, priceType: priceTypeSelected, skill: skillSelected, minPrice: newRange.min, maxPrice: newRange.max });
   };

   const categoriesToShow = showMoreCategory ? categories : categories.slice(0, 8);

   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="courses__sidebar">
            {/* Category Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Kategoriler</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {categoriesToShow.map((cat: any) => (
                        <li key={cat._id}>
                           <div onClick={() => handleCategory(cat._id, cat.name)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={cat._id === categorySelected} readOnly id={`cat_${cat._id}`} />
                              <label className="form-check-label" htmlFor={`cat_${cat._id}`}>{cat.name}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  {categories.length > 8 && (
                     <div className="show-more">
                        <a className={`show-more-btn ${showMoreCategory ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreCategory(!showMoreCategory)}>
                           {showMoreCategory ? "Daha Az Göster -" : "Daha Fazla Göster +"}
                        </a>
                     </div>
                  )}
               </div>
            </div>

            {/* Price Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Ücret Durumu</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {priceTypes.map((type: string) => (
                        <li key={type}>
                           <div onClick={() => handlePriceType(type)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={type === priceTypeSelected} readOnly id={`price_${type}`} />
                              <label className="form-check-label" htmlFor={`price_${type}`}>{type}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Price Range */}
            <div className="courses-widget">
               <h4 className="widget-title">Fiyat Aralığı</h4>
               <div className="courses-price-range">
                  <div className="d-flex align-items-center gap-2 mb-15">
                     <input
                        type="number"
                        name="min"
                        value={priceRange.min}
                        onChange={handlePriceRange}
                        placeholder="Min"
                        style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                     />
                     <span>-</span>
                     <input
                        type="number"
                        name="max"
                        value={priceRange.max}
                        onChange={handlePriceRange}
                        placeholder="Max"
                        style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                     />
                     <span>₺</span>
                  </div>
                  <input
                     type="range"
                     className="form-range"
                     min="0"
                     max="5000"
                     step="10"
                     value={priceRange.max}
                     onChange={(e) => handlePriceRange({ target: { name: 'max', value: e.target.value } })}
                  />
                  <div className="d-flex justify-content-between mt-10">
                     <span style={{ fontSize: '13px', color: '#6B7280' }}>Max: {priceRange.max}₺</span>
                  </div>
               </div>
            </div>

            {/* Skill Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Seviye</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {skillLevels.map((skill: string) => (
                        <li key={skill}>
                           <div onClick={() => handleSkill(skill)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={skill === skillSelected} readOnly id={`skill_${skill}`} />
                              <label className="form-check-label" htmlFor={`skill_${skill}`}>{skill}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </aside>
      </div>
   );
}

export default CourseSidebar;
