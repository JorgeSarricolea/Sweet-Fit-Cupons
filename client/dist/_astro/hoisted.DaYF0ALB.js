import{A as i}from"./config.rsRQa_My.js";import"./Button.astro_astro_type_script_index_0_lang.gmm97IQw.js";import"./PasswordInput.astro_astro_type_script_index_0_lang.uOyacqeA.js";document.getElementById("resetPassword-form").addEventListener("submit",async function(t){t.preventDefault();const n=document.getElementById("newPassword"),s=document.getElementById("confirmPassword"),r=n.value,e=s.value;if(!r||!e){alert("Por favor, complete todos los campos");return}try{const o=await fetch(`${i}/api/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPassword:r,confirmPassword:e})});if(o.ok)alert("contraseña cambiada con exito"),window.location.href="/login";else{const a=await o.json();throw new Error(a.error||"Error desconocido")}}catch(o){console.error("Error:",o),alert("Hubo un error al iniciar sesión")}});
