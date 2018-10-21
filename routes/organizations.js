var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET list of organizations. */
router.get('/', function(req, res, next) {
    models.Organization.all().then(function(results) {
        res.render('organizations/index', { 
            title: 'Organizations',
            organizations: results
        });
    });
});

/* GET a form to create a new article */
router.get('/new', function(req, res, next) {
    res.render('organizations/new', { title: 'New Organization'});
});

router.get('/:id/edit', function(req, res, next) {
    models.Organization.findById(req.params.id).then(function(organization) {
        res.render('organizations/edit', {
            title: 'Edit Organization',
            organization: organization
        });
    });
});

/* GET a specific organization */
router.get('/:id', function(req, res, next) {
    models.Organization.findById(req.params.id).then(function(organization) {
        res.render('organizations/show', {
            title: 'Show Organization',
            organization: organization
        });
    });
});
/* POST to create a new organization */
router.post('/', function(req, res, next) {
    models.Organization.create({
      name: req.body.name,
      description: req.body.description
    }).then(function(organization) {
      res.redirect(`/organizations/${organization.id}`)
    });
  });
  
  /* PATCH update an existing organization */
router.patch('/:id', function(req, res, next) {
    models.Organization.findById(req.params.id).then(function(organization) {
        organization.update({
            name: req.body.name,
            description: req.body.description
        }).then(function() {
            res.redirect(`/organizations/${organization.id}`);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    models.Organization.findById(req.params.id).then(function(organization) {
        organization.destroy().then(function() {
            res.redirect('/organizations');
        });
    });
});

module.exports = router;
