
const prevBtns=document.querySelectorAll(".btn-prev");
//const nextBtns=document.querySelectorAll(".btn-next");
const nextBtns=document.getElementById("btn");
const nextBtns2=document.getElementById("btn2");
const nextBtns3=document.getElementById("btn3");

//const prevBtns=document.getElementById("btnp");
//const prevBtns=document.getElementById("btn2p");
//const prevBtns=document.getElementById("btn3p");

const progress=document.querySelectorAll("progress");
const progressSteps=document.querySelectorAll(".progress-step");
const formsteps=document.querySelectorAll(".form-step");

nextBtns.disabled=true;
nextBtns2.disabled=true;
nextBtns3.disabled=true;
let formstep=0;



function validateForm3() {
    let p = document.myForm.phone.value;

    var ddl = document.getElementById("phone");
    var selectedValue = ddl.options[ddl.selectedIndex].value;

    if (selectedValue == "select"|| p==null || p=="" ) {
        nextBtns3.disabled=true;

        return false;
      
    }
      else{
        nextBtns3.disabled = false;
      }
      return true;
}
function EnableDisableTextBox() {
    var chkYes = document.getElementById("chkYes");
    var txtPassportNumber = document.getElementById("txtPassportNumber");
    txtPassportNumber.disabled = chkYes.checked ? false : true;
    if (!txtPassportNumber.disabled) {
        txtPassportNumber.focus();
    }
}
function validateform2() {
    
   
    
    let y = document.myForm.fatherName.value;
   
  if ((document.querySelectorAll('input[name="Gender"]:checked').length == 0) ||y==null || y=="" ) {
       
        
        nextBtns2.disabled=true;

        return false;
      
    }   
      else{
          nextBtns2.disabled = false;
          return true;
        }
     
        
    }
function validateform(){  
    var name=document.myForm.firstName.value;  
    var lastName=document.myForm.lastName.value;  
    var Adresss=document.myForm.adress.value;  

    if (name==null || name=="" || lastName=="" || lastName==null || Adresss=="" || Adresss==null ){  
     nextBtns.disabled=true;

      
   return false;
    
    }
    else{
        nextBtns.disabled = false;

    }

     
    }  

    nextBtns.addEventListener("click",()=>{
        
            formstep++;
            updateFormSteps();
            updateProgress();
    
        });

    nextBtns2.addEventListener("click",()=>{
        
        formstep++;
        updateFormSteps();
        updateProgress();

    });
    nextBtns3.addEventListener("click",()=>{
        
        formstep++;
        updateFormSteps();
        updateProgress();

    });
 /*   prevBtns.addEventListener("click",()=>{
        
        formstep--;
        updateFormSteps();
        updateProgress();

    });

    prevBtns2.addEventListener("click",()=>{
    
    formstep--;
    updateFormSteps();
    updateProgress();

});
prevBtns3.addEventListener("click",()=>{
    
    formstep--;
    updateFormSteps();
    updateProgress();

});
*/prevBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        formstep--;
        updateFormSteps();
        updateProgress();

    });
});
function updateFormSteps(){
    formsteps.forEach(formst =>{
        formst.classList.contains("form-step-active") &&
        formst.classList.remove("form-step-active");
    });
    formsteps[formstep].classList.add("form-step-active");
}
function updateProgress(){
    progressSteps.forEach((ps,idx)=>{
        if(idx < formstep  ){
            ps.classList.add("progress-complete");
        }
        else{
            ps.classList.remove("progress-complete");

        }
        if(idx == formstep ){
            ps.classList.add("progress-step-active");
        }
        else{
            ps.classList.remove("progress-step-active");

        }

    });

}

