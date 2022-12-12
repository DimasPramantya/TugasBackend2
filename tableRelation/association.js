const { User, Validation, Role, Payment, PaymentDetail, sequelize } = require('../models/index');

User.belongsTo(Role, {
    foreignKey: {
        allowNULL: false,
    }
});
User.hasMany(Payment, {
    onDelete: "No Action",
    onUpdate: "Cascade"
});
User.hasMany(Validation, {
    onDelete: "Cascade",
    onUpdate: "Cascade"
});
Payment.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    }
});
Payment.hasOne(PaymentDetail, {
    onDelete: "No Action",
    onUpdate: "Cascade"
});
Role.hasMany(User, {
    onDelete: "No Action",
    onUpdate: "Cascade"
})
PaymentDetail.belongsTo(Payment, {
    foreignKey: {
        allowNull: false,
    }
});
Validation.belongsTo(User, {
    onDelete: "Cascade",
    onUpdate: "Cascade"
})
sequelize.sync({alter:true});



