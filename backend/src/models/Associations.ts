import CategoryModel from "./CategoryModel.js";
import ServiceModel from "./ServiceModel.js";
import ServiceProviderModel from "./ServiceProviderModel.js";
import AddressModel from "./AddressModel.js";
import ContractServiceModel from "./ContractServiceModel.js";
import ContractorModel from "./ContractorModel.js";
import GaleryModel from "./GaleryModel.js";
import OpeningHoursModel from "./OpeningHoursModel.js";
import ProviderModel from "./ProviderModel.js";
import ReviewModel from "./ReviweModel.js";

ServiceModel.belongsTo(CategoryModel, {
    foreignKey: "CategoryId",
    as: "category"
});

CategoryModel.hasMany(ServiceModel, {
    foreignKey: "CategoryId",
    as: "services"
});

ServiceProviderModel.belongsTo(ProviderModel, {
    foreignKey: "providerId",
    as: "provider"
});

ProviderModel.hasMany(ServiceProviderModel, {
    foreignKey: "providerId",
    as: "serviceProviders"
});

ServiceProviderModel.belongsTo(ServiceModel, {
    foreignKey: "serviceId",
    as: "service"
});

ServiceModel.hasMany(ServiceProviderModel, {
    foreignKey: "serviceId",
    as: "serviceProviders"
});

ProviderModel.belongsTo(AddressModel, {
    foreignKey: "addressId",
    as: "address"
});

AddressModel.hasMany(ProviderModel, {
    foreignKey: "addressId",
    as: "providers"
});

OpeningHoursModel.belongsTo(ProviderModel, {
    foreignKey: "providerId",
    as: "provider"
});

ProviderModel.hasMany(OpeningHoursModel, {
    foreignKey: "providerId",
    as: "openingHours"
});

GaleryModel.belongsTo(ProviderModel, {
    foreignKey: "providerId",
    as: "provider"
})

ProviderModel.hasOne(GaleryModel, {
    foreignKey: "providerId",
    as: "galery"
})

ContractServiceModel.belongsTo(ProviderModel, {
    foreignKey: "providerId",
    as: "provider"
});

ProviderModel.hasMany(ContractServiceModel, {
    foreignKey: "providerId",
    as: "contracts"
});

ContractServiceModel.belongsTo(ServiceProviderModel, {
    foreignKey: "providerServiceId",
    as: "serviceProvider"
});

ServiceProviderModel.hasMany(ContractServiceModel, {
    foreignKey: "providerServiceId",
    as: "contracts"
});

ContractServiceModel.belongsTo(ContractorModel, {
    foreignKey: "customerId",
    as: "contractor"
})

ContractorModel.hasMany(ContractServiceModel, {
    foreignKey: "customerId",
    as: "contracts"
})

ContractorModel.belongsTo(AddressModel, {
    foreignKey: "addressId",
    as: "address"
});

AddressModel.hasMany(ContractorModel, {
    foreignKey: "addressId",
    as: "contractors"
});

ReviewModel.belongsTo(ContractServiceModel, {
    foreignKey: "ContractId",
    as: "contract"
});
ContractServiceModel.hasMany(ReviewModel, {
    foreignKey: "ContractId",
    as: "reviews"
});

ReviewModel.belongsTo(ServiceProviderModel, {
    foreignKey: "ServiceProviderReviewId",
    as: "serviceProviderReview"
});

ServiceProviderModel.hasMany(ReviewModel, {
    foreignKey: "ServiceProviderReviewId",
    as: "serviceProviderReviews"
});

ReviewModel.belongsTo(ContractorModel, {
    foreignKey: "ClientReviewId",
    as: "clientReview"
});

ContractorModel.hasMany(ReviewModel, {
    foreignKey: "ClientReviewId",
    as: "clientReviews"
});