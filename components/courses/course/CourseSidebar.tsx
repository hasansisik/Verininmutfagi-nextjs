import { selectCourses } from "@/redux/features/courseSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const CourseSidebar = ({ setCourses }: any) => {

   const [showMoreCategory, setShowMoreCategory] = useState(false);
   const [showMoreInstructor, setShowMoreInstructor] = useState(false);

   const [categorySelected, setCategorySelected] = useState('');
   const [priceSelected, setPriceSelected] = useState('');
   const [skillSelected, setSkillSelected] = useState('');
   const [instructorSelected, setInstructorSelected] = useState('');

   const categoryFilter = useSelector(selectCourses).map(course => course.category);
   const priceFilter = useSelector(selectCourses).map(course => course.price_type);
   const skillFilter = useSelector(selectCourses).map(course => course.skill_level);
   const instructorFilter = useSelector(selectCourses).map(course => course.instructors);

   const allCategory = ['Tüm Kategoriler', ...new Set(categoryFilter)];
   const allPrice = ['Tüm Fiyatlar', ...new Set(priceFilter)];
   const allSkill = ['Tüm Seviyeler', ...new Set(skillFilter)];
   const allInstructor = ['Tüm Eğitmenler', ...new Set(instructorFilter)];

   const allCourses = useSelector(selectCourses);

   // Handle category selection
   const handleCategory = (category: string) => {
      setCategorySelected(prevCategory => prevCategory === category ? '' : category);
      filterCourses({ category: category === categorySelected ? '' : category, price: priceSelected, skill: skillSelected, instructor: instructorSelected });
   };

   // Handle price selection
   const handlePrice = (price: string) => {
      setPriceSelected(prevPrice => prevPrice === price ? '' : price);
      filterCourses({ category: categorySelected, price: price === priceSelected ? '' : price, skill: skillSelected, instructor: instructorSelected });
   };

   // Handle skill selection
   const handleSkill = (skill: string) => {
      setSkillSelected(prevSkill => prevSkill === skill ? '' : skill);
      filterCourses({ category: categorySelected, price: priceSelected, skill: skill === skillSelected ? '' : skill, instructor: instructorSelected });
   };

   // Handle Instructor selection
   const handleInstructor = (instructor: string) => {
      setInstructorSelected(instructor);
      filterCourses({ category: categorySelected, price: priceSelected, skill: skillSelected, instructor });
   };

   // Filter courses based on selected criteria
   const filterCourses = ({ category, price, skill, instructor }: any) => {
      let filteredCourses = allCourses;

      if (category && category !== 'Tüm Kategoriler') {
         filteredCourses = filteredCourses.filter(course => course.category === category);
      }

      if (price && price !== 'Tüm Fiyatlar') {
         filteredCourses = filteredCourses.filter(course => course.price_type === price);
      }

      if (skill && skill !== 'Tüm Seviyeler') {
         filteredCourses = filteredCourses.filter(course => course.skill_level === skill);
      }

      if (instructor && instructor !== 'Tüm Eğitmenler') {
         filteredCourses = filteredCourses.filter(course => course.instructors === instructor);
      }

      setCourses(filteredCourses);
   };

   // Determine categories to display based on "Show More" toggle
   const categoriesToShow = showMoreCategory ? allCategory : allCategory.slice(0, 8);
   const instructorToShow = showMoreInstructor ? allInstructor : allInstructor.slice(0, 4);

   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="courses__sidebar">
            <div className="courses-widget">
               <h4 className="widget-title">Kategoriler</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {categoriesToShow.map((category: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleCategory(category)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={category === categorySelected} readOnly id={`cat_${i}`} />
                              <label className="form-check-label" htmlFor={`cat_${i}`} onClick={() => handleCategory(category)}>{category}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreCategory ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreCategory(!showMoreCategory)}>
                        {showMoreCategory ? "Daha Az Göster -" : "Daha Fazla Göster +"}
                     </a>
                  </div>
               </div>
            </div>

            {/* Price Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Fiyat</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {allPrice.map((price: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handlePrice(price)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={price === priceSelected} readOnly id={`price_${i}`} />
                              <label className="form-check-label" htmlFor={`price_${i}`} onClick={() => handlePrice(price)}>{price}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Skill Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Seviye</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {allSkill.map((skill: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleSkill(skill)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={skill === skillSelected} readOnly id={`skill_${i}`} />
                              <label className="form-check-label" htmlFor={`skill_${i}`} onClick={() => handleSkill(skill)}>{skill}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Instructors Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Eğitmenler</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {instructorToShow.map((instructor: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleInstructor(instructor)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={instructor === instructorSelected} readOnly id={`instructor_${i}`} />
                              <label className="form-check-label" htmlFor={`instructor_${i}`} onClick={() => handleInstructor(instructor)}>{instructor}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreInstructor ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreInstructor(!showMoreInstructor)}>
                        {showMoreInstructor ? "Daha Az Göster -" : "Daha Fazla Göster +"}
                     </a>
                  </div>
               </div>
            </div>
         </aside>
      </div>
   );
}

export default CourseSidebar;
