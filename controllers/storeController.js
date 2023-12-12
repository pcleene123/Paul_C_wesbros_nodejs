const mongoose = require('mongoose');
const storeModel = mongoose.model('store');

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });

};


exports.createStore = async (req, res) => {
    const store = await (new storeModel(req.body)).save();
    req.flash('success', `Successfully Created ${store.name} . Please leave a review`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // 1. query the db for a list of all stores
    const stores = await storeModel.find();
    res.render('stores', {title: 'Stores', stores});

};

exports.editStore = async (req, res) => {
    // 1. find these stores given the idd
    const store = await storeModel.findOne({ _id: req.params.id });
    // 2. confirm that they are the owner of the store
    //todo
    // 3. render out the edit form so the users can update these stores
    res.render('editStore', {title: `Edit ${store.name}`, store });
};


exports.updateStore = async (req, res) => {
    // find and update the store
    const store = await storeModel.findOneAndUpdate({ _id: req.params.id }, req.body, 
        {
        new: true, // return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store --> </a>`);
    res.redirect(`/stores/${store._id}/edit`);
    // redirect them to the store and tell them it worked

};