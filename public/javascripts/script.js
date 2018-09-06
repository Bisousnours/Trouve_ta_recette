// Sans cette ligne + l'import de axios.js (2e <script>), this.$http ne fonctionnera pas
Vue.prototype.$http = axios

const app = new Vue({
	el: '#app',
	data: {
		pageActuelle: 'PageTop5',
		contenuActuel: 'ResultatPositif',
		listeRecettes: [
			{titre: '1', type: 'entree', nouveau: 'o', description: 'a', avis:'1', ingredients: [
			{nom: 'lait'},
			{nom: 'oeufs'},
			{nom: 'dinde'}
			], instructions: [
			{texte: 'Instru1'},
			{texte: 'Instru2'},
			{texte: 'Instru3'}
			], auteur: 'administrateur', image: 'https://img-3.journaldesfemmes.fr/7SmUz3I3k2bvjPMKeV1BpOQungQ=/750x/smart/image-icu/10018962_1349466830.jpg'},

			{titre: '2', type: 'dessert', nouveau: 'o', description: 'a', avis:'5', ingredients: [
			{nom: 'eau'},
			{nom: 'oeufs'},
			{nom: 'jambon'}
			], instructions: [
			{texte: 'Instru1'},
			{texte: 'Instru2'},
			{texte: 'Instru3'}
			], auteur: 'administrateur', image: 'https://img-3.journaldesfemmes.fr/7SmUz3I3k2bvjPMKeV1BpOQungQ=/750x/smart/image-icu/10018962_1349466830.jpg'},

			{titre: '3', type: 'dessert', nouveau: 'n', description: 'a', avis:'4', ingredients: [
			{nom: 'eau'},
			{nom: 'oeufs'},
			{nom: 'dinde'}
			], instructions: [
			{texte: 'Instru1'},
			{texte: 'Instru2'},
			{texte: 'Instru3'}
			], auteur: 'administrateur', image: 'https://img-3.journaldesfemmes.fr/7SmUz3I3k2bvjPMKeV1BpOQungQ=/750x/smart/image-icu/10018962_1349466830.jpg'},

			{titre: '4', type: 'plat', nouveau: 'n', description: 'a', avis:'3', ingredients: [
			{nom: 'lait'},
			{nom: 'oeufs'},
			{nom: 'jambon'}
			], instructions: [
			{texte: 'Instru1'},
			{texte: 'Instru2'},
			{texte: 'Instru3'}
			], auteur: 'administrateur', image: 'https://img-3.journaldesfemmes.fr/7SmUz3I3k2bvjPMKeV1BpOQungQ=/750x/smart/image-icu/10018962_1349466830.jpg'}
		],
		listeCourses: [
			{nom: 'Lait'},
			{nom: 'Oeufs'},
			{nom: 'Jambon'}
		],
		listeFavoris: [
			{titre: '1'},
			{titre: '2'},
			{titre: '3'}
		],
		filtreType: '',
		filtreIngredient: '',
		filtreAvis: '5',
		filtreNouveau: '',
		recetteAAfficher: [{titre: '', description: '', avis:'', ingredients: [], instructions: [], auteur: '', image: null}],
		myList:[],
		name: '',
    /*Pour page connexion*/
		est_connecte: false,
    input_identifiant: undefined,
		identifiant:true,
		input_mdp: undefined,
		mdp:true,
		input_confirmation_mdp: undefined,
		confirmation_mdp:'true',
    password:'',
		mot_de_passe: 'password',
		mesClients:[],
		listeClients: [
        {nom_utilisateur: ''},
        {mot_de_passe: ''},
    ]
	},
	created () {
	    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
	    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
	    this.$http.get('/list')
	      .then(list => {
	        console.log('affichage de ma liste', list)
	        this.myList = list.data
	      })
	      .catch(err => {
	        console.log('error', err)
	      })
	},
	methods: {
    affichageFiltre (){
			if (this.filtreType !== ''){
				return this.listeRecettes.filter(recette => 
					recette.type === this.filtreType)
			} else if (this.filtreAvis !== ''){
				return this.listeRecettes.filter(recette => 
					recette.avis === this.filtreAvis)
			} else if (this.filtreNouveau !== ''){
				return this.listeRecettes.filter(recette => 
					recette.nouveau === 'o')
			} else if (this.filtreIngredient !== '') {
				return this.listeRecettes.filter(recette => {
					for(var i in Object.keys(recette.ingredients)){
						if (recette.ingredients[i].nom===this.filtreIngredient){
							return true
						}
					}
				})
			}
		},
		chgmtPageEtFiltre (page, filtreType, filtreAvis, filtreNouveau) {
				var trouve = 0
				this.pageActuelle = page
				this.filtreType = filtreType
				this.filtreAvis = filtreAvis
				this.filtreNouveau = filtreNouveau
				if (this.filtreType!=='' || this.filtreAvis!=='' || this.filtreNouveau!==''){
					this.filtreIngredient = ''
					this.contenuActuel = 'ResultatPositif'
				}else if (this.filtreIngredient !== ''){
					this.filtreIngredient = this.filtreIngredient.toLowerCase()
					return this.listeRecettes.filter(recette => {
						if(trouve === 0){
							this.contenuActuel = 'ResultatNegatif'
						}else{
							this.contenuActuel = 'ResultatPositif'
						}
						for(var i in Object.keys(recette.ingredients)){
							if (recette.ingredients[i].nom===this.filtreIngredient){
								trouve = 1
								return true
							}
						}
					})
				}
				
		},
    affichageRecette(page, recette){
			this.pageActuelle = page
			this.recetteAAfficher.titre = recette.titre
			this.recetteAAfficher.description = recette.description
			this.recetteAAfficher.avis = recette.avis
			this.recetteAAfficher.ingredients = recette.ingredients
			this.recetteAAfficher.instructions = recette.instructions
			this.recetteAAfficher.auteur = recette.auteur
			this.recetteAAfficher.image = recette.image
		},
		affichageRecetteAleatoire(page){
			this.pageActuelle = page
			var tailleListeRecettes = 0
			for(var i in this.listeRecettes){
				tailleListeRecettes++
			}
			const index = Math.floor(Math.random() * tailleListeRecettes);
			this.recetteAAfficher.titre = this.listeRecettes[index].titre
			this.recetteAAfficher.description = this.listeRecettes[index].description
			this.recetteAAfficher.avis = this.listeRecettes[index].avis
			this.recetteAAfficher.ingredients = this.listeRecettes[index].ingredients
			this.recetteAAfficher.instructions = this.listeRecettes[index].instructions
			this.recetteAAfficher.auteur = this.listeRecettes[index].auteur
			this.recetteAAfficher.image = this.listeRecettes[index].image
		},
    sendNewElement () {
        this.$http.post('/list', {
          name: this.name
        })
        .then(() => {
          this.myList.push({
            name: this.name
          })
        })
    },
    deleteElement(index){
        this.$http.delete('/list/' + index,{	})
        .then(() => {
          this.myList.splice(index, 1)
        })
    },
    modifVisibilite: function(){
    this.mot_de_passe = this.mot_de_passe === 'password' ? 'text' : 'password';
    },
		fonctionConnexion : function() {
			/*Affectation des données du serveur*/
			if(this.input_identifiant !== undefined){
				this.listeClients.nom_utilisateur = this.input_identifiant;
			}
			else{
				this.listeClients.nom_utilisateur = undefined
			}
			if(this.input_mdp !== undefined){
				this.listeClients.mot_de_passe = this.input_mdp;
			}
			else{
				this.listeClients.mot_de_passe = undefined
			}
			/*Envoi et connexion*/
			if(this.listeClients.nom_utilisateur !== undefined && this.listeClients.mot_de_passe !== undefined){
				this.est_connecte = true;
				this.identifiant = true;
				this.mdp = true;
				this.$http.post('/client', {
					listeClients: this.listeClients
				})
				.then(() => {
					this.mesClients.push({
						listeClients: this.listeClients
					})
				})
				console.log('le client est : ' + this.listeClients.nom_utilisateur + ' mdp : ' + this.listeClients.mot_de_passe)
				this.pageActuelle = 'PageTop5'
			}
			/*Pas de connexion*/
			else{
				this.est_connecte = false;
			}
		},
		fonctionInscription : function() {
			/*Affectation des données du serveur*/
			if(this.input_identifiant !== undefined){
				this.listeClients.nom_utilisateur = this.input_identifiant;
			}
			else{
				this.listeClients.nom_utilisateur = undefined
			}
			
			if(this.input_mdp !== undefined && this.input_confirmation_mdp === this.input_mdp){
				this.listeClients.mot_de_passe = this.input_mdp;
			}
			else{
				this.listeClients.mot_de_passe = undefined
			}
			/*Envoi et connexion */
			if(this.listeClients.nom_utilisateur !== undefined && this.listeClients.mot_de_passe !== undefined){
				this.est_connecte = true;
				this.identifiant = true;
				this.mdp = true;
				this.$http.post('/client', {
					listeClients: this.listeClients
				})
				.then(() => {
					this.mesClients.push({
						listeClients: this.listeClients
					})
				})
				console.log('le client est : ' + this.listeClients.nom_utilisateur + ' mdp : ' + this.listeClients.mot_de_passe)
				this.pageActuelle = 'PageTop5'
			}
			/*Pas de connexion*/
			else{
				this.est_connecte = false;
			}
		},
		fonctionDeconnection : function() {
			if(this.est_connecte == true){
				this.est_connecte = false;
				this.listeClients.nom_utilisateur = undefined;
				this.listeClients.mot_de_passe = undefined;
				this.input_identifiant = undefined;
				this.input_mdp = undefined;
				this.input_confirmation_mdp = undefined;
				this.pageActuelle = 'PageDeconnection'
			}
		}
	}
})


