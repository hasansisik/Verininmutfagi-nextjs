"use client"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

const InstructorHistoryContent = () => {
   const dispatch = useAppDispatch();
   const { user, loading } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   const orders = user?.orders || [];

   const getStatusClass = (status: string) => {
      switch (status) {
         case 'completed':
            return 'pass';
         case 'pending':
            return 'pending';
         case 'cancelled':
         case 'refunded':
            return 'fail';
         default:
            return '';
      }
   };

   const getStatusText = (status: string) => {
      switch (status) {
         case 'completed':
            return 'Tamamlandı';
         case 'pending':
            return 'Beklemede';
         case 'cancelled':
            return 'İptal Edildi';
         case 'refunded':
            return 'İade Edildi';
         default:
            return status;
      }
   };

   const formatDate = (dateString: string) => {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });
   };

   if (loading) {
      return (
         <div className="col-lg-9">
            <div className="dashboard__content-wrap">
               <div className="dashboard__content-title">
                  <h4 className="title">Sipariş Geçmişi</h4>
               </div>
               <div className="row">
                  <div className="col-12">
                     <p className="text-center py-5">Yükleniyor...</p>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (orders.length === 0) {
      return (
         <div className="col-lg-9">
            <div className="dashboard__content-wrap">
               <div className="dashboard__content-title">
                  <h4 className="title">Sipariş Geçmişi</h4>
               </div>
               <div className="row">
                  <div className="col-12">
                     <p className="text-center py-5">Henüz siparişiniz bulunmamaktadır.</p>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Sipariş Geçmişi</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="dashboard__review-table">
                     <table className="table table-borderless">
                        <thead>
                           <tr>
                              <th>Sipariş ID</th>
                              <th>Kurs Sayısı</th>
                              <th>Tarih</th>
                              <th>Toplam Tutar</th>
                              <th>Durum</th>
                           </tr>
                        </thead>
                        <tbody>
                           {orders.map((order: any) => (
                              <tr key={order._id}>
                                 <td>
                                    <p>{order.orderNumber || order._id?.slice(-8)}</p>
                                 </td>
                                 <td>
                                    <p>{order.courses?.length || 0} Kurs</p>
                                 </td>
                                 <td>
                                    <p>{formatDate(order.createdAt)}</p>
                                 </td>
                                 <td>
                                    <p>₺{order.totalAmount?.toFixed(2) || '0.00'}</p>
                                 </td>
                                 <td>
                                    <span className={`dashboard__quiz-result ${getStatusClass(order.status)}`}>
                                       {getStatusText(order.status)}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorHistoryContent
