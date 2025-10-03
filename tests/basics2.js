/*const flag=true;
if(!flag){

    console.log("Condition Statisfied");
}
else{
console.log(flag);
   console.log("Condition not Staisfied");
}


let d=0;
while(d<10){
    
    console.log(d);
    d++;
}

//console.log(d);  */


let marks=Array(6);
var mark=new Array(20,45,60,78,80,90,100)

var mark=[20,45,60,78,80,90,100];
console.log(mark.indexOf(78));
console.log(mark[2])
mark[3]=105;
console.log(mark.length);
console.log(mark);

mark.push(110);   //---push add the element at the end
console.log(mark);   
mark.pop();//---pop remove the last element
console.log(mark);
mark.unshift(5); //---unshift add the element at the start          
console.log(mark);

const mark3={

    name:"John",
    age:22,
    isAdult:true,
    marks:[20,45,60,78,80,90,100]       ,
    greet:function(){
        console.log("Hello Everyone",this.name);
    }
}

mark3.greet();
console.log(mark3.name);


let value1="Evening";
if(1===1){
    let value1="Morning";
  // console.log(value1);
}
console.log(value1);

let count=0;
let day="tuesday is funday day day"
let index=day.indexOf("day")
//console.log(index);
while(index!==-1){

    count++;
    index=day.indexOf("day",index+1);
    console.log(index);
}
console.log("count of day"+ count);

