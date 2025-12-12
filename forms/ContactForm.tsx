'use client'
import { handleContactFormAction } from '@/app/(logged-out)/actions/sendContactEmail'
import BtnArrow from '@/svg/BtnArrow'
import React, { useActionState } from 'react'

export default function ContactForm() {

   const [state, formAction] = useActionState(handleContactFormAction, { success: false })

   return (
      <form action={formAction} id="contact-form" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
         <div className="row">
            <div className="col-md-6">
               <div className="form-grp">
                  <input name="user_name" type="text" placeholder="Ad Soyad *" required />
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <input name="user_email" type="email" placeholder="E-posta *" required />
               </div>
            </div>
         </div>
         <div className="form-grp">
            <textarea name="message" placeholder="Mesajınız *" required></textarea>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Gönder <BtnArrow /></button>
         {state.success && <p className="text-success mt-2">✅ Mesajınız başarıyla gönderildi!</p>}
         {state.error && <p className="text-danger mt-2">❌ Hata: {state.error}</p>}
      </form>
   )
}
