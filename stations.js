/* créer une web radio qui comprend :
	- une liste déroulante des radios
	- des boutons "précédents" et "suivant"
	Il est possible de sélectionner une station via la liste déroulante ou via les boutons
*/

let liste = [
	{
		nom: "FIP",
		flux: "http://direct.fipradio.fr/live/fip-lofi.mp3"
	},
	{
		nom: "NRJ France",
		flux: "http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3?origine=fluxradios"
	},
	{
		nom: "Nostalgie",
		flux: "http://cdn.nrjaudio.fm/audio1/fr/30601/mp3_128.mp3?origine=fluxradios"
	}
];

let index = 0;
let monAudio = document.getElementById("monAudio");
let titrecourant = document.getElementById("titrecourant");
//liste déroulante
let listelecture = document.getElementById("listelecture");
//boutons
let btprecedent = document.getElementById("btprecedent");
let btsuivant = document.getElementById("btsuivant");
//liste des options
let listeOption;


//initialisation
for (let i = 0; i < liste.length; i++) {
	let x = document.createElement("option");
	x.innerHTML = liste[i].nom;
	x.value = liste[i].flux;
	listelecture.appendChild(x);
}
//récupère les options
listeOption = listelecture.querySelectorAll("option");
changeIndex(index);

//Gestion des click sur boutons
btprecedent.addEventListener("click", precedent);
btsuivant.addEventListener("click", suivant);
listelecture.addEventListener("change",changement);

function changement() {
	index=listelecture.selectedIndex;
	changeIndex(index);
}

function precedent() {
	//retire le +
	listeOption[index].selected = false;
	index--;
	if (index < 0)
		index = liste.length - 1;

	changeIndex(index);
}

function suivant() {
	listeOption[index].selected = false;
	index++;
	if (index >= liste.length)
		index = 0;

	changeIndex(index);
}

function changeIndex(idx) {
	//ajoute un +
	listeOption[idx].selected = true;
	//maj le titre courant
	titrecourant.innerHTML = liste[idx].nom;
	//change le source du lecteur audio
	monAudio.src = liste[idx].flux;
	monAudio.play();
}



