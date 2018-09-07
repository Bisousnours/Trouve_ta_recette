// Sans cette ligne + l'import de axios.js (2e <script>), this.$http ne fonctionnera pas
Vue.prototype.$http = axios

const app = new Vue({
	el: '#app',
	data: {
		pageActuelle: 'PageTop5',
		contenuActuel: 'ResultatPositif',
		listeRecettes: [{}],
		filtreType: '',
		filtreIngredient: '',
		filtreAvis: '5',
		filtreNouveau: '',
		recetteAAfficher: [{titre: '', description: '', avis:'', ingredients: [], instructions: [], auteur: '', image: null}],
    propositionTitre: '',
    propositionType: '',
    propositionDescription: 'Bon appétit !',
    propositionImage: null,
    propositionIngredient: '',
    propositionListeIngredients: [],
    propositionInstructions: '',
    propositionNouveau:'',
    propositionAvis:'',
    propositionAuteur:'',
    modificationIndex:'',
    modif: false,
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
		listeUtilisateurs: [{}],
    favorisUtilisateur:[],
    coursesUtilisateur:[]
	},
	created () {
	    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
	    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
	    this.$http.get('/bddRecettes')
	      .then(bddRecettes => {
	        console.log('affichage de ma liste', bddRecettes)
	        this.listeRecettes = bddRecettes.data
	      })
	      .catch(err => {
	        console.log('error', err)
	      })
        
      this.$http.get('/bddUtilisateurs')
	    .then(bddUtilisateurs => {
	    	console.log('affichage de ma liste', bddUtilisateurs)
	    	this.listeUtilisateurs = bddUtilisateurs.data
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
					recette.nouveau === 'oui')
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
        this.reinitialisationModif()
				if (this.filtreType!=='' || this.filtreAvis!=='' || this.filtreNouveau!==''){
					this.filtreIngredient = ''
					this.contenuActuel = 'ResultatPositif'
				}else if (this.filtreIngredient !== ''){
					this.filtreIngredient = this.filtreIngredient.toLowerCase()
					return this.listeRecettes.filter(recette => {
            for(var i in Object.keys(recette.ingredients)){
							if (recette.ingredients[i].nom===this.filtreIngredient){
								trouve = 1
                this.contenuActuel = 'ResultatPositif'
								return true
							}
						}
						if(trouve === 0){
							this.contenuActuel = 'ResultatNegatif'
						}else{
							this.contenuActuel = 'ResultatPositif'
						}
					})
				}
		},
    reinitialisationModif(){
      if(this.modif===true){
            this.modif=false
          }
      this.propositionTitre=''
      this.propositionType=''
      this.propositionDescription='Bon appétit !'
      this.propositionListeIngredients=[]
      this.propositionInstructions=''
      this.propositionImage=''
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
			var tailleListeRecettes = 0
			for(var i in this.listeRecettes){
				tailleListeRecettes++
			}
			const index = Math.floor(Math.random() * tailleListeRecettes);
      this.affichageRecette(page, this.listeRecettes[index])
		},
    ajouterNouvelIngredient(){
      this.propositionListeIngredients.push({
        nom: this.propositionIngredient
      })
      this.propositionIngredient = ''
    },
    ajouterNouvelleRecette(){
      this.$http.post('/bddRecettes', {
          titre: this.propositionTitre,
          type: this.propositionType,
          nouveau: 'oui',
          description: this.propositionDescription, 
          avis:'1', 
          ingredients: this.propositionListeIngredients,
          instructions: this.propositionInstructions, 
          auteur: this.input_identifiant,
          image: this.propositionImage 
        
        })
        .then(() => {
          this.listeRecettes.push({
            titre: this.propositionTitre,
            type: this.propositionType,
            nouveau: 'oui', 
            description: this.propositionDescription, 
            avis:'1', 
            ingredients: this.propositionListeIngredients,
            instructions: this.propositionInstructions, 
            auteur: this.input_identifiant,
            image: this.propositionImage 
          })
        })
      .then(() => {
        this.propositionTitre=''
        this.propositionType=''
        this.propositionDescription='Bon appétit !'
        this.propositionListeIngredients=[]
        this.propositionInstructions=''
        this.propositionImage=''
        this.chgmtPageEtFiltre('PageTop5', '', '5', '')
      }) 
    },
    supprimerRecette(index){
      this.$http.delete('/bddRecettes/' + index,{	})
        .then(() => {
          this.listeRecettes.splice(index, 1)
        })
    },
    affichageModificationRecette(index,recette){
      this.modif=true
      this.pageActuelle='PageProposition'
      this.propositionTitre=recette.titre
      this.propositionType=recette.type
      this.propositionNouveau=recette.nouveau
      this.propositionAvis=recette.avis
      this.propositionAuteur=recette.auteur
      this.propositionDescription=recette.description
      this.propositionListeIngredients=recette.ingredients
      this.propositionInstructions=recette.instructions
      this.propositionImage=recette.image
      this.modificationIndex=index
    },
    modifierRecette(){
      
     this.$http.put('/bddRecettes/' +this.modificationIndex,{	
        titre: this.propositionTitre,
        type: this.propositionType,
        nouveau: this.propositionNouveau, 
        description: this.propositionDescription, 
        avis:this.propositionAvis, 
        ingredients: this.propositionListeIngredients,
        instructions: this.propositionInstructions, 
        auteur: this.propositionAuteur, 
        image: this.propositionImage 
      })
        .then(() => {
          this.listeRecettes[this.modificationIndex].titre= this.propositionTitre,
          this.listeRecettes[this.modificationIndex].type= this.propositionType,
          this.listeRecettes[this.modificationIndex].nouveau= this.propositionNouveau, 
          this.listeRecettes[this.modificationIndex].description= this.propositionDescription, 
          this.listeRecettes[this.modificationIndex].avis= this.propositionAvis, 
          this.listeRecettes[this.modificationIndex].ingredients= this.propositionListeIngredients,
          this.listeRecettes[this.modificationIndex].instructions= this.propositionInstructions, 
          this.listeRecettes[this.modificationIndex].auteur= this.propositionAuteur, 
          this.listeRecettes[this.modificationIndex].image= this.propositionImage 
        })
          .then(() => {
            this.chgmtPageEtFiltre('PageTop5', '', '5', '')
          })
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
    modifVisibilite(){
    this.mot_de_passe = this.mot_de_passe === 'password' ? 'text' : 'password';
    },
		fonctionConnexion() {   
		  	if(this.input_identifiant !== undefined && this.input_mdp !== undefined){
		  		for(var user in this.listeUtilisateurs){
		  			if(this.input_identifiant === this.listeUtilisateurs[user].nom_utilisateur){
                this.identifiant = true;
                if(this.input_mdp === this.listeUtilisateurs[user].mot_de_passe){
                    this.mdp = true;
                    this.est_connecte = true;
                    this.favorisUtilisateur = this.listeUtilisateurs[user].favoris;
                    this.coursesUtilisateur = this.listeUtilisateurs[user].liste_courses;
                    this.chgmtPageEtFiltre('PageTop5', '', '5', '')
                    return true
                }
                else{
                  this.mdp = false;
                  console.log('mdp non valide')
                }
		  			}
		  			else {
		  				this.identifiant = false;
		  			}
		  		}
		  	}
			/*Pas de connexion*/
			else if (this.input_identifiant === undefined){
				this.est_connecte = false;
				this.identifiant = false;
			}
			else if (this.input_mdp === undefined){
				this.est_connecte = false;
				this.mdp = false;
			}
		
    },
		fonctionInscription(){
      if(this.input_identifiant !== undefined && this.input_mdp !== undefined){
		  		console.log('nom et mdp = entrés')
		  		for(var user in this.listeUtilisateurs){
            console.log(this.listeUtilisateurs[user].nom_utilisateur)
		  			if(this.input_identifiant === this.listeUtilisateurs[user].nom_utilisateur){
                this.identifiant = false;
                console.log(this.identifiant + 'existe déjà')
                this.est_connecte = false;
		  			}
		  			else {
              this.listeUtilisateurs.push({
                nom_utilisateur: this.input_identifiant,
                mot_de_passe: this.input_mdp
              })
              this.input_identifiant = '';
              this.input_mdp = '';
              this.identifiant = true;
              this.mdp = true;
              this.est_connecte = true;
		  			}
		  		}
		  	}
			/*Pas de connexion*/
			else if (this.input_identifiant === undefined){
				this.est_connecte = false; 
				this.identifiant = false;
				console.log('rien d\'inscrit')
			}
			else if (this.input_mdp === undefined){
				this.est_connecte = false;
				this.mdp = false;
				console.log('rien d\'inscrit')
			}
		

      
			/*Affectation des données du serveur*/
			/*if(this.input_identifiant !== undefined){
				this.listeUtilisateurs.nom_utilisateur = this.input_identifiant;
			}
			else{
				this.listeUtilisateurs.nom_utilisateur = undefined
			}
			
			if(this.input_mdp !== undefined && this.input_confirmation_mdp === this.input_mdp){
				this.listeUtilisateurs.mot_de_passe = this.input_mdp;
			}
			else{
				this.listeUtilisateurs.mot_de_passe = undefined
			}
			
			if(this.listeUtilisateurs.nom_utilisateur !== undefined && this.listeClients.mot_de_passe !== undefined){
				this.est_connecte = true;
				this.identifiant = true;
				this.mdp = true;
				this.$http.post('/client', {
					listeUtilisateurs: this.listeUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateursvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
				})listeUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateursvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
				.then(() => {
					this.mesClients.push({
						listeUtilisateurs: this.listeUtilisateurs
					})
				})
				console.log('le client est : ' + this.listeUtilisateursisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateurslisteUtilisateursliste.nom_utilisateur + ' mdp : ' + this.listeClients.mot_de_passe)
				this.chgmtPageEtFiltre('PageTop5', '', '5', '')
			}
			Pas de connexion
			else{
				this.est_connecte = false;
			}*/
		},
		fonctionDeconnection() {
      	if(this.est_connecte == true){
				this.est_connecte = false;
				this.input_identifiant = undefined;
				this.input_mdp = undefined;
				this.input_confirmation_mdp = undefined;
				this.chgmtPageEtFiltre('PageTop5', '', '5', '')
			}

		}
	}
})


