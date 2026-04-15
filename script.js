function login(){
 let u=document.getElementById('user').value;
 let p=document.getElementById('pass').value;

 if(u==='admin' && p==='1234'){
   localStorage.setItem("sesion","activa"); // 🔥 GUARDA SESIÓN
   document.getElementById('login').style.display='none';
   document.getElementById('contenido').style.display='block';
 }else{
   document.getElementById('error').innerText='Datos incorrectos';
 }
}

window.onload = function(){
  if(localStorage.getItem("sesion") === "activa"){
    document.getElementById('login').style.display='none';
    document.getElementById('contenido').style.display='block';
  }
}
function logout(){
  localStorage.removeItem("sesion");
  location.reload();
}