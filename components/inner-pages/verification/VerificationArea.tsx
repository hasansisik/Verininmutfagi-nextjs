"use client"
import { useState } from "react"
import Link from "next/link"
import BtnArrow from "@/svg/BtnArrow"

const VerificationArea = () => {
   const [code, setCode] = useState(["", "", "", ""])

   const handleChange = (index: number, value: string) => {
      if (value.length <= 1) {
         const newCode = [...code]
         newCode[index] = value
         setCode(newCode)
         
         // Otomatik olarak sonraki input'a geç
         if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
         }
      }
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Doğrulama kodu:", code.join(""))
   }

   return (
      <section className="singUp-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="singUp-wrap" style={{ background: "#ffffff" }}>
                     <h2 className="title">E-posta Doğrulama</h2>
                     <p>E-posta adresinize gönderilen 4 haneli doğrulama kodunu girin.</p>
                     <form onSubmit={handleSubmit} className="account__form">
                        <div className="verification-code-inputs" style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
                           {code.map((digit, index) => (
                              <input
                                 key={index}
                                 id={`code-${index}`}
                                 type="text"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) => handleChange(index, e.target.value)}
                                 style={{
                                    width: "50px",
                                    height: "50px",
                                    textAlign: "center",
                                    fontSize: "24px",
                                    borderRadius: "20px",
                                    border: "1px solid #e5e7eb"
                                 }}
                              />
                           ))}
                        </div>
                        <button type="submit" className="btn btn-two arrow-btn">Doğrula<BtnArrow /></button>
                     </form>
                     <div className="account__switch" style={{ marginTop: "20px" }}>
                        <p>Kod gelmedi mi? <Link href="/dogrulama">Tekrar Gönder</Link></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default VerificationArea

