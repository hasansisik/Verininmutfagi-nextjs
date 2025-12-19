
interface OverviewProps {
   overview?: {
      description: string;
      whatYouWillLearn: string;
      learningObjectives: string[];
      conclusion: string;
   };
}

const Overview = ({ overview }: OverviewProps) => {
   if (!overview) {
      return (
         <div className="courses__overview-wrap">
            <p>Kurs bilgileri yükleniyor...</p>
         </div>
      );
   }

   return (
      <div className="courses__overview-wrap">
         <h3 className="title">Kurs Açıklaması</h3>
         <p>{overview.description}</p>
         <h3 className="title">Bu kursta neler öğreneceksiniz?</h3>
         <p>{overview.whatYouWillLearn}</p>
         <ul className="about__info-list list-wrap">
            {overview.learningObjectives?.map((objective, index) => (
               <li key={index} className="about__info-list-item">
                  <i className="flaticon-angle-right"></i>
                  <p className="content">{objective}</p>
               </li>
            ))}
         </ul>
         <p className="last-info">{overview.conclusion}</p>
         <style jsx global>{`
            .about__info-list-item i {
               color: #fff !important;
               background: #2f57ef !important;
               border-color: #2f57ef !important;
            }
         `}</style>
      </div>
   )
}

export default Overview
