//Selection des éléments
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");//Récupère les éléments par l'ID
const list = document.getElementById("list");
const input = document.getElementById("input");
//Noms de class
const CHECK="fa-check-circle";//cercle checked
const UNCHECK="fa-circle-thin";//cercle vide
const LINE_THROUGH="lineThrough";//Texte barré
//Variables
let LIST,id;

//Récupére les élémets du localstorage
let data = localStorage.getItem("TODO");

//vérifier que ce n'est pas vide
if(data){
    LIST = JSON.parse(data);
    id=LIST.length;//récupère l'id courant
    loadList(LIST);//charge la list de l'interface
}else{
    //si la data est vide
    LIST=[];
    id=0;
}
//charge les items de l'interface user
function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name,item.id,item.done,item.trash);
    });
}
//Affichage de la date
const options={weekday:"long",day:"numeric", month:"long", year:"numeric"}//Découpe la date en jour de la semaine, jour,mois,année
const today=new Date();//retourne la date du jour
dateElement.innerHTML=today.toLocaleDateString("fr-FR", options)//ajoute à l'élément ID="date" de l'HTML
//Fonction ajout à la TODO
function addToDo(toDo,id,done,trash){
if(trash){return;}

    const DONE = done?CHECK:UNCHECK;
    const LINE = done?LINE_THROUGH:"";
    //Code HTML ajouer à chaque insert | ${...} appel de la variable du JS dans le code html
    const text=`<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="de fa fa-trash-o" job="delete"  id="${id}"></i>
                </li>
                `;
    const position="beforeend";//Precise la poistion de l'insert: beforeend (avant la fin), 
                                                                //afterend (arès la fin), 
                                                                //beforebegin(avant le début), 
                                                                //afterbegin(après le début)

    list.insertAdjacentHTML(position,text);
};
//Ajout avec la touche ENTER
document.addEventListener("keyup",function(event){ //Quand il capte un evenement appuie touche
            if(event.keyCode==13){//On tape sur ENTRER
                const toDo=input.value;
                input.value="";
                if(toDo){// ça s'ajoute
                    addToDo(toDo, id, false, false);
                    LIST.push(
                        {
                            name: toDo,
                            id : id,
                            done: false,
                            trash:false
                        });
                    //On stock les éléments du localstorage
                    localStorage.setItem("TODO",JSON.stringify(LIST));
                    id++;
                }
                
            }
});
//coche décoche
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done? false:true;
}  
//suppression des todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}
//Recherche de l'éléments dynamique
list.addEventListener("click",function(event){
    const element=event.target;//retourne l'élément clické
    const elementJob = element.attributes.job.value;//complete or delete

    if(elementJob=="complete"){
        completeToDo(element);
    }else if(elementJob=="delete"){
            removeToDo(element);
        }
        //Ajoute les éléments du localstorage
        localStorage.setItem("TODO",JSON.stringify(LIST));
    }
)