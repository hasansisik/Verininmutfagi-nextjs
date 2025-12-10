"use client"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"

const LoginForm = () => {

   return (
      <form onSubmit={(e) => e.preventDefault()} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="email" />
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="password" />
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/registration">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Sign In<BtnArrow /></button>
      </form>
   )
}

export default LoginForm
