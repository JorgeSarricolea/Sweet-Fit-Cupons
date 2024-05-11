import{A as s}from"./config.rsRQa_My.js";import"./Button.astro_astro_type_script_index_0_lang.gmm97IQw.js";async function c(e){try{const o=await fetch(`${s}/api/auth/verify-token`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})});return o.ok?await o.json():{isValid:!1,roleId:null,roleName:null}}catch(o){return console.error("Error:",o),{isValid:!1,roleId:null,roleName:null}}}const a=localStorage.getItem("token");a?c(a).then(async e=>{if(!e.isValid)localStorage.removeItem("token"),window.location.href="/login";else{const{roleId:o,roleName:t}=e;console.log("User's roleId:",o),console.log("User's roleName:",t),t!="Admin"&&(window.location.href="/unauthorized")}}):window.location.href="/login";async function i(){try{const e=await fetch(`${s}/api/coupons`);if(!e.ok)throw new Error("Failed to get coupons");return await e.json()}catch(e){return console.error(e),[]}}const l=async e=>{try{const o=await i();if(o.length===0)throw new Error("No hay cupones disponibles");const t=o[0].code,n=new Date().toISOString(),r=await fetch(`${s}/api/users-coupons/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({userCouponCode:t,applicationDate:n})});if(!r.ok)throw new Error("Failed to assign coupon to user");return await r.json()}catch(o){throw o}},u=async e=>{try{const o=`${s}/api/users-coupons/${e}`,t=await fetch(o,{method:"DELETE"});if(!t.ok)throw new Error(`Failed to delete user-coupon association. Status: ${t.status}. URL: ${o}`);d(e)}catch(o){console.error("Error deleting user-coupon association:",o)}};function d(e){const o=document.getElementById(e);o?o.remove():console.error("Row with ID",e,"not found")}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelectorAll(".delete-user-coupon-btn"),o=document.querySelectorAll(".update-user-coupon-btn");e.forEach(t=>{t.addEventListener("click",async function(){const n=t.getAttribute("data-userCouponId");if(n)try{await u(n)}catch(r){console.log("Failed to delete user-coupon association:",r)}else console.log("Failed to delete: userCouponId is undefined")})}),o.forEach(t=>{t.addEventListener("click",async function(){const n=t.getAttribute("data-params");if(n)try{await l(n),location.reload()}catch(r){console.log("Failed to send coupon:",r)}else console.log("Failed to send: userCouponId is undefined")})})});
