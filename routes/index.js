var express = require('express');
var router = express.Router();


/* BDD de la liste des recettes */
const list = [
  { name: 'elem1' }, 
  { name: 'elem2' }
]

router.get('/list', (req, res) => {
  res.json(list)
})

router.post('/list', (req, res) => {
  list.push({
    name: req.body.name
  })
  res.send('OK')
})

router.delete('/list/:id', (req, res) => {
  var index = -1
  for(var i in list){
    if (i===req.params.id) {
      index = i
    }
  }
  list.splice(index, 1)
  res.send('OK')
})

/* BDD des identifiants des clients*/
const bddUtilisateurs = [
  { nom_utilisateur: 'admin' , mot_de_passe: 'admin', liste_courses: [{nom: 'Lait'},{nom: 'Oeufs'},{nom: 'Jambon'}], favoris: [{titre: 'Moussaka'},{titre: 'Pâte à crêpe'}]}, 
  { nom_utilisateur: 'user1' , mot_de_passe: 'user1', liste_courses: [{nom: 'tomates'},{nom: 'herbes de provence'},{nom: 'moutarde'}], favoris: [{titre: 'Tarte à la tomate'},{titre: 'Flan au carottes'}]}
]

router.get('/bddUtilisateurs', (req, res) => {
  res.json(bddUtilisateurs)
})

router.post('/bddUtilisateurs', (req, res) => {
  bddUtilisateurs.push({
    nom_utilisateur: req.body.nom_utilisateur,
    mot_de_passe: req.body.mot_de_passe
  })
  res.send('OK')
})


const bddRecettes = [
      {titre: 'Moussaka', type: 'Plat', nouveau: 'non', description: 'La vrai moussaka grecque !', avis:'1', ingredients: [
      {nom: 'aubergines'},
      {nom: 'pommes de terre'},
      {nom: 'tomates'},
      {nom: 'oignons'},
      {nom: 'boeuf haché'},
      {nom: 'huile'},
      {nom: 'beurre'}
      ], instructions: 'Préparation de la sauce tomate.\nEmincer les oignons et les faire blondir dans une petite casserole.\nAjouter les tomates coupées en gros dés et 2 bonnes cuillères à soupe d huile d olive, la cannelle, le miel, saler et poivrer. Laisser réduire le tout 25 minutes (ou plus, jusqu à arriver à la préparation de la viande) à feu moyen.\nOn doit obtenir une sauce, que l on peut homogénéiser avec du coulis de tomate tout prêt.\nPréparation des aubergines.\nDécouper les aubergines en rondelles (sans les peler), saler généreusement, et les laisser dégorger le temps de l étape suivante.\nConseil pour faire dégorger les aubergines : dans un plat, alterner une couche de tranches d aubergine salées et une couche de papier absorbant ou les laisser dans une passoire.\nPréparation des pommes de terre. \nEplucher et découper les pommes de terres en fines rondelles.\nDisposer les rondelles de pommes de terre au fond d un plat à gratin assez haut, huilé.\nArroser les pommes de terres d un peu (3 cuillères à soupe) du jus rendu par les tomates qui mijotent.\nPasser le plat de pommes de terre sous le grill 5 à 15 min selon votre four, pour qu elles dorent.\nMaintenant qu elles ont dégorgé, passer les rondelles d aubergine à la poêle à feu fort pour les faire griller un peu de chaque côté, réserver.\nPréparation de la viande. \nDans un faitout, faire revenir la viande hachée au beurre à feu assez fort, saler, poivrer et retirer l eau rendue par la viande.\nAjouter la sauce tomate-oignons et baisser le feu (très doux).\nSortir le plat de pommes de terres du four et le préchauffer le four à 200°C (thermostat 6-7).\nPréparation de la béchamel. \nDans une petite casserole sur feu doux, faire blondir les 20 g de beurre, ajouter la farine et mélanger pour obtenir un appareil homogène.\nIncorporer petit à petit le lait en n arrêtant jamais de remuer, ça peut prendre 10 bonnes minutes, on doit obtenir une sauce assez épaisse.\nSaler, poivrer et râper un peu de noix de muscade (c est fort, il faut en mettre peu).\nMontage de la moussaka.\nPar dessus la couche de pommes de terre, étaler la moitié de la viande hachée avec la tomate, puis la moitié des aubergines, puis l autre moitié de viande, puis l autre moitié des aubergines, un filet d huile d olive et terminer par la béchamel.\nEnfourner le tout dans le four à 200°C (thermostat 6-7) et laisser cuire 1h (la béchamel doit croustiller et être dorée).'
     , auteur: 'administrateur', 
     image: 'https://image.afcdn.com/recipe/20180503/79002_w420h344c1cx1944cy1296.jpg'},

      {titre: 'Flan au carottes', type: 'Entrée', nouveau: 'oui', description: 'Très facile à faire', avis:'5', ingredients: [
      {nom: 'carottes'},
      {nom: 'oeufs'},
      {nom: 'beurre'},
      {nom: 'crème'},
      {nom: 'herbes de provence'}
      ], instructions: 'Faire revenir les carottes coupées en lamelles dans un peu de beurre, puis les recouvrir de bouillon cube.\nBien laisser évaporer.\nMixer les carottes et ajouter tout le reste.\nVerser dans un moule beurré et cuire au bain-marie à four moyen pendant 35 minutes (vérifier la cuisson avec la pointe dun couteau).'
       , auteur: 'administrateur', 
       image: 'https://image.afcdn.com/recipe/20130328/24942_w420h344c1cx1000cy1342.jpg'},

      {titre: 'Tarte à la tomate', type: 'Plat', nouveau: 'non', description: 'Plat de dernière minute', avis:'4', ingredients: [
      {nom: 'pate brisée'},
      {nom: 'tomates'},
      {nom: 'herbes de provence'},
      {nom: 'moutarde'},
      {nom: 'huile'}
      ], instructions: 'Précuire la pâte (percée avec une fourchette) 5 min à 450 degrés farenheit (230°C).\nPendant ce temps, couper les tomates en rondelles de 3 mm d épaisseur.\nSortir la pâte précuite du four. badigeonner le fond de moutarde de Dijon.\nDisposer les tranches de tomates. faire plusieurs épaisseurs.\nSaupoudrer d herbes de Provence + 2 pincées de sel.\nEnfourner pour 20 min à 450 farenheit puis couvrir avec papier d aluminium pour 20 min supplémentaires. \nAprès ces 20 min, enlever le papier aluminium et laisser cuire encore 5 min porte du four ouverte. \nDélicieux avec une salade verte.'
       , auteur: 'administrateur', 
       image: 'https://image.afcdn.com/recipe/20180208/77440_w420h344c1cx1824cy2736cxt0cyt0cxb3648cyb5472.jpg'},

      {titre: 'Pâte à crêpe', type: 'Dessert', nouveau: 'non', description: 'Délicieux !', avis:'3', ingredients: [
      {nom: 'farine'},
      {nom: 'oeufs'},
      {nom: 'beurre'},
      {nom: 'sucre'},
      {nom: 'sucre vanillé'},
      {nom: 'lait'},
      {nom: 'huile'}
      ], instructions: 'Mélanger le tout pendant 1 minute puis tamiser avant de cuire.'
       , auteur: 'administrateur', 
       image: 'https://image.afcdn.com/recipe/20171019/73354_w420h344c1cx2808cy1872cxt0cyt0cxb5616cyb3744.jpg'}
    
]

router.get('/bddRecettes', (req, res) => {
  res.json(bddRecettes)
})

router.post('/bddRecettes', (req, res) => {
  bddRecettes.push({
    titre: req.body.titre,
    type: req.body.type,
    nouveau: 'o', 
    description: req.body.description, 
    avis:'1', 
    ingredients: req.body.ingredients,
    instructions: req.body.instructions, 
    auteur: req.body.auteur,
    image: req.body.image 
  })
  res.send('OK')
})

router.delete('/bddRecettes/:id', (req, res) => {
  var index = -1
  for(var i in bddRecettes){
    if (i===req.params.id) {
      index = i
    }
  }
  if (index!== -1)  {
    bddRecettes.splice(index, 1)
  }
  res.send('OK')
})

router.put('/bddRecettes/:id', (req, res) => {
  var index = -1
  for(var i in bddRecettes){
    if (i===req.params.id) {
      index = i
    }
  }
  if (index !== -1){
    bddRecettes[index].titre= req.body.titre,
    bddRecettes[index].type= req.body.type,
    bddRecettes[index].nouveau= req.body.nouveau, 
    bddRecettes[index].description= req.body.description, 
    bddRecettes[index].avis= req.body.avis, 
    bddRecettes[index].ingredients= req.body.ingredients,
    bddRecettes[index].instructions= req.body.instructions, 
    bddRecettes[index].auteur= req.body.auteur,
    bddRecettes[index].image= req.body.image 
  }
  res.send('OK')
})

/*A garder !! */
module.exports = router;
