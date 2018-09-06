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
	console.log('coté serveur : ' + req.params.id)
	/*var index=list.findIndex(index => list.index === req.params.id)*/

})

/* BDD des identifiants des clients*/
const client = [
  { nom_utilisateur: 'admin' , mot_de_passe: 'admin'}, 
  { nom_utilisateur: 'user1' , mot_de_passe: 'user1'}
]

router.post('/client', (req, res) => {
  res.json(client)
})

router.post('/client', (req, res) => {
  list.push({
    nom_utilisateur: req.body.nom_utilisateur,
    mot_de_passe: req.body.mot_de_passe
  })
  res.send('OK')
})

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trouve ta recette !' });
});
*/

/*A garder !! */
module.exports = router;
