var Debts = require('./debtsSchema.js');

var getDebts = function(req, res){

    Debts.find()
        .exec(function(err, debts){
            res.send(debts);
            if(err){
                res.send("this didn't work");
            }
        });
};

var postDebts = function(req, res){
    var newDebt = new Debts(
        {
            name: req.body.name,
            balance: req.body.balance,
            payment: req.body.payment,
            percentage: req.body.percentage,
            paidIn: req.body.paidIn,
            payOffDate: req.body.payOffDate,
            months: req.body.months
        }
    );
    newDebt.save(function(err){
        res.send({success: true}, newDebt);
    })
};

var findById = function (req, res) {
    Debts.findById(req.params.id, function (err, debt) {
        if (!err) {
            res.jsonp(debt);
        } else {
            console.log(err);
        }
    });
}

var deleteDebts = function (req, res){
    return Debts.findById(req.params.id, function (err, contact) {
        return contact.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

module.exports = {
    get: getDebts,
    findById: findById,
    post: postDebts,
    delete: deleteDebts
};
