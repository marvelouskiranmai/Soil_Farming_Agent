const signUpButton=document.getElementById('signupbut');
// const signUp=document.getElementById('signupbutton');
const signInForm=document.getElementById('Signin');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
});
// signUp.addEventListener('click',function(){
//     signInForm.style.display="block";
//     signUpForm.style.display="none";
// });

