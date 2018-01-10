module.exports = (achema) => {
    achema.index({
        email: 1
    }, {
        unique: true,
        sparse: true
    });

    achema.index({
        'sociaNetwork.name': 1,
        'socialNetwork.id': 1
    }, {
        unique: true,
        sparse: true
    });
};

