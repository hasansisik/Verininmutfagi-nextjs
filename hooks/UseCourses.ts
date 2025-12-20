import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/config";

const UseCourses = () => {
   const [courses, setCourses] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchCourses();
   }, []);

   const fetchCourses = async () => {
      try {
         const response = await axios.get(`${server}/courses?isActive=true`);
         if (response.data.success) {
            setCourses(response.data.courses);
         }
      } catch (error) {
         console.error("Kurslar yüklenirken hata:", error);
      } finally {
         setLoading(false);
      }
   };

   return {
      courses,
      setCourses,
      loading
   }
}

export default UseCourses