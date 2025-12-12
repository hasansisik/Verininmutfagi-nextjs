import ContactForm from "@/forms/ContactForm"

const ContactArea = () => {
   return (
      <section className="contact-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="contact-form-wrap" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
                     <h4 className="title">Bize Mesaj Gönderin</h4>
                     <p>E-posta adresiniz yayınlanmayacaktır. Zorunlu alanlar * ile işaretlenmiştir.</p>
                     <ContactForm />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ContactArea
